import { useDispatch, useSelector } from "react-redux";
import "./CardFeedFilter.css"
import { SubcomponentIcon } from "../SubcategoryIcon";
import { useEffect, useState } from "react";

export default function CardFeedFilter({
    setProducts, // Used to set products in parent to dictate what cards are being rendered
    userStorefront = false, // Defaults to false, dictates whether or not user specific storefronts will be rendered or just general products
}) {

    return (
        <div className="card-feed-filter-wrapper">
            <div className="card-feed-filter-category">
                <div className="card-feed-filter-category-title">
                    Clothing
                </div>

                <div className="card-feed-filter-subcategorys-wrapper">
                    <SubcomponentIcon
                        type="tops"
                        setProducts={setProducts}
                        userStorefront={userStorefront}
                    />
                    <SubcomponentIcon
                        type="bottoms"
                        setProducts={setProducts}

                        userStorefront={userStorefront}
                    />
                    <SubcomponentIcon
                        type="footwear"
                        setProducts={setProducts}
                        userStorefront={userStorefront}
                    />
                </div>
            </div>
            <div className="card-feed-filter-category">
                <div className="card-feed-filter-category-title">
                    Furniture
                </div>

                <div className="card-feed-filter-subcategorys-wrapper">
                    <SubcomponentIcon
                        type="seating"
                        setProducts={setProducts}
                        userStorefront={userStorefront}
                    />
                    <SubcomponentIcon
                        type="surfaces"
                        setProducts={setProducts}
                        userStorefront={userStorefront}
                    />
                    <SubcomponentIcon
                        type="storage"
                        setProducts={setProducts}
                        userStorefront={userStorefront}
                    />
                </div>
            </div>
            <div className="card-feed-filter-category">
                <div className="card-feed-filter-category-title">
                    Art
                </div>

                <div className="card-feed-filter-subcategorys-wrapper">
                    <SubcomponentIcon
                        type="walls"
                        setProducts={setProducts}
                        userStorefront={userStorefront}
                    />
                    <SubcomponentIcon
                        type="spaces"
                        setProducts={setProducts}
                        userStorefront={userStorefront}
                    />
                    <SubcomponentIcon
                        type="desk"
                        setProducts={setProducts}
                        userStorefront={userStorefront}
                    />
                </div>
            </div>
        </div>
    )
}
