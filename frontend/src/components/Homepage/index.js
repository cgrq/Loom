import { useEffect } from "react";
import ProductCardFeed from "../ProductCardFeed";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../store/products";
import "./Homepage.css"

export default function Homepage() {
    const dispatch = useDispatch();
    const {allProducts} = useSelector(state=> state.products)

    useEffect(()=>{
        dispatch(getAllProductsThunk())
    }, [])


    if (!allProducts) return null

    return (
        <div>
            <div className="homepage-filter-wrapper">

            </div>
            <ProductCardFeed
                products={allProducts}
            />
        </div>
    )
}
