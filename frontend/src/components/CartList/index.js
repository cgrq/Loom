import { useDispatch, useSelector } from "react-redux"
import "./CartList.css"
import CartListItem from "../CartListItem"
import CTAButton from "../CTAButton"
import { useEffect } from "react"
import { getCartItemByOrderId, getCurrentOrder } from "../../store/orders"

export default function CartList(){
    const dispatch = useDispatch()
    const { currentOrder } = useSelector((state)=>state.orders)
    const { cart } = useSelector((state)=>state.orders)

    useEffect(()=>{
        dispatch(getCurrentOrder())
    }, [])

    useEffect(() => {
        const { id: currentOrderId } = currentOrder || {};
        if(currentOrderId){
            console.log('Dispatching getCartItemByOrderId with currentOrderId:', currentOrderId);
            dispatch(getCartItemByOrderId(currentOrderId));
        }
    }, [currentOrder?.id]);  // Depend on currentOrder.id instead of currentOrder



    return (
        <div className="cart-list-wrapper">
            <div>Cart</div>
            {
                cart
                    ? Object.values(cart).map(item => <CartListItem key={item.id} item={item} />)
                    :<div>No items in cart</div>
            }
            <CTAButton buttonText={"Checkout"}/>
        </div>
    )
}
