import { useEffect, useState } from "react"
import "./CartListItem.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom"
import { deleteCartItem, editCartItemThunk } from "../../store/orders"
import { useDispatch } from "react-redux"

export default function CartListItem({ item }) {

    const [quantity, setQuantity] = useState()
    const dispatch = useDispatch();

    useEffect(()=>{
        if(item){
            setQuantity(item.quantity)
        }
    },[item])

    const handleChangeInQuantity = (e) => {
        setQuantity(e.target.value)
        dispatch(editCartItemThunk(item.id, quantity))
    }

    const handleDelete = (e) => {
        dispatch(deleteCartItem(item.id))
    }

    if(!item) return null;

    return (
        <div key = {item.id}className="cart-list-item-wrapper">
            <select
                className="cart-list-item-quantity"
                value={quantity}
                onChange={handleChangeInQuantity}
            >
                {Array.from({ length: 100 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                        {index + 1}
                    </option>
                ))}
            </select>
            <NavLink to={`/products/${item.product.name}`}>
                <img
                    className="cart-list-item-image"
                    src={item.product.productImages.image1}
                />
            </NavLink>
            <div className="cart-list-item-price">${item.product.price * quantity}</div>

            <div className="cart-list-item-name">{item.product.name}</div>
            <div
                className="cart-list-item-delete"
                onClick={handleDelete}
            >
                x
            </div>
        </div>
    )
}
