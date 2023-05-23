import { useDispatch, useSelector } from "react-redux";
import "./SubcategoryIcon.css"
import { useEffect } from "react";

export function SubcomponentIcon({
    type, // Must be one of: (tops,bottoms,footwear,seating,storage,walls,spaces,desk)
    setProductState, // State setter to be run on click
    userStorefront, // Defaults to false, dictates whether or not user specific storefronts will be rendered or just general products
}) {

    const publicUrl = process.env.PUBLIC_URL;
    const product = useSelector(state => state.products[type])
    const userProduct = useSelector(state => state.products.storefrontProducts[type])

    useEffect(()=>{
        console.log(`🖥 ~ file: index.js:14 ~ userProduct:`, userProduct)
        if(userStorefront){
        }
    },[userProduct])

    if(!type) return null;

    return (
        <div className="subcategory-wrapper" onClick={()=>setProductState(userStorefront ? userProduct : product)}>
            <img src={publicUrl + `/filter-icons/${type}.png`} />
            <span>{type.slice(0, 1).toUpperCase() + type.slice(1)}</span>
        </div>
    )
}
