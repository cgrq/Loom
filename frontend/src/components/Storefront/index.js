import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";

import { getStorefrontProductsThunk } from "../../store/products"
import ProductCard from "../ProductCard";
import "./Storefront.css"
import { getStorefrontByName } from "../../store/storefronts";
import ProductCardFeed from "../ProductCardFeed";

export default function Storefront() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector((state) => state.session)
    const { storefrontName } = useParams();
    const { currentStorefront } = useSelector((state) => state.storefronts)
    const { storefrontProducts } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getStorefrontByName(storefrontName))
    }, [storefrontName])

    useEffect(() => {
        if (currentStorefront && currentStorefront.id) {
            dispatch(getStorefrontProductsThunk(currentStorefront.id))
        }
    }, [currentStorefront])

    if (!user || !storefrontProducts || !currentStorefront || !currentStorefront.user) return null
    return (
        <div className="storefront-wrapper">
            <div className="storefront-banner-wrapper">
                <div className="storefront-banner-image-wrapper">
                    <div className="storefront-banner-image-fade-left" />
                    <div className="storefront-banner-image-fade-right" />
                    <img className="storefront-banner-image" src={currentStorefront.banner_image} />

                </div>
            </div>
            <div className="storefront-details-wrapper">
                <img className="storefront-user-image" src={currentStorefront.user.profile_image} />
                <div className="storefront-description-wrapper">
                    <span className="storefront-description-label">Description:</span>
                    {currentStorefront.description}
                </div>
            </div>
            <div className="storefront-create-a-product-container">
                <NavLink to={`${user.username}/new-product`}>
                    <div className="storefront-create-a-product-button-wrapper">
                        + Create a new product
                    </div>
                </NavLink>
            </div>
            {/* Render products here */}
            <ProductCardFeed
                products={storefrontProducts}
            />
        </div>
    )
}
