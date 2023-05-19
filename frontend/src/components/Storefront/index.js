import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {getStorefrontProductsThunk }from "../../store/products"
import ProductCard from "../ProductCard";
import "./Storefront.css"

export default function Storefront() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.session)
    const { userStorefront } = useSelector((state) => state.storefronts)
    const { storefrontProducts } = useSelector((state) => state.products)
    // const [bannerImage, setBannerImage] =useState("")

    // useEffect(()=>{

    // },[userStorefront])

    useEffect(()=>{
        dispatch(getStorefrontProductsThunk(userStorefront.id))
    }, [userStorefront])

    if(!storefrontProducts) return null
    return (
        <div className="storefront-wrapper">
            <div className="storefront-banner-wrapper">
                <img className="storefront-user-image" src={user.profile_image} />
                <img className="storefront-banner-image" src={userStorefront.banner_image} />
            </div>
            <div className="storefront-details-wrapper">
                <span>Store description:</span>
                <div className="storefront-description-wrapper">
                    {userStorefront.description}
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
