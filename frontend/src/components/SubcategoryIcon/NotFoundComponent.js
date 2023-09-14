'use client'
import { useDispatch, useSelector } from "react-redux";
import "./SubcategoryIcon.css";
import { useEffect, useState } from "react";
import { useFilter } from "../../context/Filter";
import Image from 'next/image';

export function SubcomponentIcon({
    type, // Must be one of: (tops,bottoms,footwear,seating,storage,walls,spaces,desk)
    setProducts, // State setter to be run on click
    userStorefront, // Defaults to false, dictates whether or not user specific storefronts will be rendered or just general products
}) {

    const publicUrl = process.env.PUBLIC_URL;
    const { allProducts, storefrontProducts } = useSelector(state => state.products)
    const product = useSelector(state => state.products[type]);
    const userProduct = useSelector(state => state.products[`storefront${type.slice(0, 1).toUpperCase() + type.slice(1)}`]);
    const { selectedFilter, setSelectedFilter } = useFilter();

    if (!type) return null;

    const handleClick = () => {
        if (selectedFilter === type) {
            setSelectedFilter("all");
            setProducts(userStorefront ? storefrontProducts : allProducts)
        } else {
            setSelectedFilter(type);
            setProducts(userStorefront ? userProduct : product);
        }
    }

    return (
        <div className="subcategory-wrapper" onClick={handleClick}>
            <div className={`subcategory-image-wrapper ${selectedFilter === type && "subcategory-image-wrapper-selected"}`}>
                <Image src={publicUrl + `/filter-icons/${type}.svg`} alt={type} />
            </div>
            <span>{type.slice(0, 1).toUpperCase() + type.slice(1)}</span>
        </div>
    )
}

export default NotFoundComponent;