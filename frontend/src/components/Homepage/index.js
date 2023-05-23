import { useEffect, useState } from "react";
import ProductCardFeed from "../ProductCardFeed";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../store/products";
import "./Homepage.css"
import CardFeedFilter from "../CardFeedFilter";

export default function Homepage() {
    const dispatch = useDispatch();
    const {allProducts} = useSelector(state=> state.products)
    const [products, setProducts] = useState()

    useEffect(()=>{
        dispatch(getAllProductsThunk())
    }, [])

    useEffect(()=>{
        setProducts(allProducts)
    }, [allProducts])

    if (!products) return null

    return (
        <div>
            <div className="homepage-filter-wrapper">
                <CardFeedFilter products={products} setProducts={setProducts}/>
            </div>
            <div className="homepage-feed-wrapper">
            <ProductCardFeed
                products={products}
            />

            </div>
        </div>
    )
}
