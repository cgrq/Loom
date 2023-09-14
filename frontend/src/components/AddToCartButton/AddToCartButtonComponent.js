'use client'
import { useDispatch, useSelector } from "react-redux"
import "./AddToCartButtonComponent.css"
import { createCartItemThunk } from "../../store/orders";

export default function AddToCartButtonComponent({productId}){
    const dispatch = useDispatch();

    const { currentOrder } = useSelector((state)=>state.orders)

    const handleClick = async ()=>{
        const orderId = currentOrder ? currentOrder.id : null
        dispatch(createCartItemThunk(1,productId,orderId))
    }

    return (
        <button
            className="add-to-cart-button"
            onClick={handleClick}>
            Add to cart
        </button>
    )
}
