import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";

import {getStorefrontProductsThunk }from "../../store/products"
import ProductCard from "../ProductCard";
import "./Storefront.css"
import { getStorefrontByName } from "../../store/storefronts";

export default function Storefront() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector((state) => state.session)
    const { storefrontName } = useParams();
    const { currentStorefront } = useSelector((state) => state.storefronts)
    const { storefrontProducts } = useSelector((state) => state.products)

    useEffect(()=>{
        dispatch(getStorefrontByName(storefrontName))
    },[storefrontName ])

    useEffect(()=>{
        if(currentStorefront && currentStorefront.id){
            dispatch(getStorefrontProductsThunk(currentStorefront.id))
        }
    }, [currentStorefront])

    if(!user || !storefrontProducts || !currentStorefront || !currentStorefront.user) return <h1>Resource not found</h1>
    return (
        <div className="storefront-wrapper">
            <div className="storefront-banner-wrapper">
                <img className="storefront-user-image" src={currentStorefront.user.profile_image} />
                <img className="storefront-banner-image" src={currentStorefront.banner_image} />
            </div>
            <div className="storefront-details-wrapper">
                <span>Store description:</span>
                <div className="storefront-description-wrapper">
                    {currentStorefront.description}
                </div>
            </div>
            <NavLink to="/storefront/new-product">
                Create a product
            </NavLink>
            {/* Render products here */}
            <div className="storefront-products-wrapper">
                {
                    Object.values(storefrontProducts).map((product)=>{
                        return <ProductCard key={product.id} product={product}/>
                    })
                }

            </div>
        </div>
    )
}
