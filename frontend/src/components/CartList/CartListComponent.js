'use client'
import { useDispatch, useSelector } from "react-redux"
import "./CartListComponent.css"
import CartListComponentItem from "../CartListComponentItem"
import CTAButton from "../CTAButton"
import { useEffect, useState } from "react"
import { editOrderThunk, getCartItemByOrderId, getCurrentOrder } from "../../store/orders"

export default function CartListComponent() {
    const dispatch = useDispatch()
    const { currentOrder } = useSelector((state) => state.orders)
    const { cart } = useSelector((state) => state.orders)
    const [hasCheckedOut, setHasCheckedOut] = useState(false)

    useEffect(() => {
        dispatch(getCurrentOrder())
    }, [])

    useEffect(() => {
        if (handleCheckout) {
            setTimeout(() => setHasCheckedOut(false), 3000);
        }
    }, [hasCheckedOut])

    useEffect(() => {
        const { id: currentOrderId } = currentOrder || {};
        if (currentOrderId) {
            console.log('Dispatching getCartItemByOrderId with currentOrderId:', currentOrderId);
            dispatch(getCartItemByOrderId(currentOrderId));
        }
    }, [currentOrder?.id]);

    const handleCheckout = () => {
        dispatch(editOrderThunk(currentOrder.id))
        setHasCheckedOut(true)
    }

    return (
        <div className="cart-list-wrapper">
            <div className="cart-list-title">Cart</div>
            {
                Object.values(cart).length > 0
                    ? <>
                        {Object.values(cart).map(item => <CartListComponentItem key={item.id} item={item} />)}
                        <CTAButton
                            buttonText={"Checkout"}
                            onClick={handleCheckout}
                        />
                    </>
                    : hasCheckedOut
                        ? <div className="cart-empty">Your order is on it's way</div>
                        : <div className="cart-empty">No items in cart</div>
            }
        </div>
    )
}
