import { useSelector } from "react-redux"
import "./CartList.css"
import CartListItem from "../CartListItem"
import CTAButton from "../CTAButton"

export default function CartItem(){
    const { cart } = useSelector((state)=>state.orders)
    console.log(`🖥 ~ file: index.js:7 ~ CartItem ~ cart:`, cart)
    return (
        <div className="cart-list-wrapper">
            <div>Cart</div>
            {
                cart.map(item => <CartListItem item={item} />)
            }
            <CTAButton buttonText={"Checkout"}/>
        </div>
    )
}
