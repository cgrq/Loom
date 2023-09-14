'use client'
import { useEffect, useState } from "react"
import "./CartListItemComponent.css"
import { useRouter } from "next/router"
import Link from "next/link"
import { deleteCartItem, editCartItemThunk } from "../../store/orders"
import { useDispatch } from "react-redux"
import Image from 'next/image';

export default function CartListItemComponent({ item }) {

    const [quantity, setQuantity] = useState()
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(()=>{
        if(item){
            setQuantity(item.quantity)
        }
    },[item])

    useEffect(()=>{
        dispatch(editCartItemThunk(item.id, quantity))
    }, [quantity])

    const handleChangeInQuantity = (e) => {
        setQuantity(e.target.value)
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
            <Link href={`/products/${item.product.name}`} passHref>
                <a>
                    <Image
                        className="cart-list-item-image"
                        src={item.product.productImages.image1}
                        alt={item.product.name}
                    />
                </a>
            </Link>
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