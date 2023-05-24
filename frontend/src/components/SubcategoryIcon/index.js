import { useDispatch, useSelector } from "react-redux";
import "./SubcategoryIcon.css"
import { useEffect, useState } from "react";
import { useFilter } from "../../context/Filter";

export function SubcomponentIcon({
    type, // Must be one of: (tops,bottoms,footwear,seating,storage,walls,spaces,desk)
    setProducts, // State setter to be run on click
    userStorefront, // Defaults to false, dictates whether or not user specific storefronts will be rendered or just general products
}) {

    const publicUrl = process.env.PUBLIC_URL;
    const product = useSelector(state => state.products[type]);
    const userProduct = useSelector(state => state.products[`storefront${type.slice(0,1).toUpperCase() + type.slice(1)}`]);
    const { setSelectedFilter } = useFilter();

    // useEffect(()=>{
    //     if(userStorefront){
    //     }
    // },[userProduct])

    if(!type) return null;

    const handleClick= () => {
        console.log(`🖥 ~ file: index.js:29 ~ handleClick ~ userProduct:`, userProduct)
        console.log(`🖥 ~ file: index.js:30 ~ handleClick ~ product:`, product)
        console.log(`🖥 ~ file: index.js:30 ~ handleClick ~ formatted type:`, `storefront${type.slice(0,1) + type.slice(1)}`)

        setSelectedFilter(type);
        setProducts(userStorefront ? userProduct : product)
    }

    return (
        <div className="subcategory-wrapper" onClick={handleClick}>
            <img src={publicUrl + `/filter-icons/${type}.png`} />
            <span>{type.slice(0, 1).toUpperCase() + type.slice(1)}</span>
        </div>
    )
}
