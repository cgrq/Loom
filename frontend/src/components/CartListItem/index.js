import "./CartListItem.css"

export default function CartListItem({item}){

    return (
        <div className="cart-list-item-wrapper">
            <img src={item.product.productImages.image1} />
            <div>{item.product.name}</div>
            <div>{item.quantity}</div>
        </div>
    )
}
