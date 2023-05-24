import { useEffect, useState } from "react";
import ProductCardFeed from "../ProductCardFeed";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk, getStorefrontProductsThunk } from "../../store/products";
import "./Homepage.css"
import CardFeedFilter from "../CardFeedFilter";

export default function Homepage() {
    const dispatch = useDispatch();
    const { allProducts } = useSelector(state=> state.products);
    const [ products, setProducts ] = useState();
    const [ productType, setProductType ] = useState("");
    const { userStorefront } = useSelector(state=>state.storefronts)
    const { tops } = useSelector(state => state.products);
    const { bottoms } = useSelector(state => state.products);
    const { footwear } = useSelector(state => state.products);
    const { seating } = useSelector(state => state.products);
    const { surfaces } = useSelector(state => state.products);
    const { storage } = useSelector(state => state.products);
    const { walls } = useSelector(state => state.products);
    const { spaces } = useSelector(state => state.products);
    const { desk } = useSelector(state => state.products);

    useEffect(()=>{
        dispatch(getAllProductsThunk())
    }, [])

    useEffect(()=>{
        setProducts(allProducts)
    }, [allProducts])



    useEffect(()=>{
        if (productType === "tops"){
            setProducts(tops)
        }
    }, [tops])

    useEffect(()=>{
        if (productType === "bottoms"){
            setProducts(bottoms)
        }
    }, [bottoms])

    useEffect(()=>{
        if (productType === "footwear"){
            setProducts(footwear)
        }
    }, [footwear])

    useEffect(()=>{
        if (productType === "seating"){
            setProducts(seating)
        }
    }, [seating])

    useEffect(()=>{
        if (productType === "surfaces"){
            setProducts(surfaces)
        }
    }, [surfaces])

    useEffect(()=>{
        if (productType === "storage"){
            setProducts(storage)
        }
    }, [storage])

    useEffect(()=>{
        if (productType === "walls"){
            setProducts(walls)
        }
    }, [walls])

    useEffect(()=>{
        if (productType === "spaces"){
            setProducts(spaces)
        }
    }, [spaces])

    useEffect(()=>{
        if (productType === "desk"){
            setProducts(desk)
        }
    }, [desk])



    useEffect(()=>{
        if(userStorefront){
            dispatch(getStorefrontProductsThunk(userStorefront.id))
        }
    }, [userStorefront])

    if (!products) return null

    return (
        <div>
            <div className="homepage-filter-wrapper">
                <CardFeedFilter
                    products={products}
                    setProducts={setProducts}
                    setProductType={setProductType}
                />
            </div>
            <div className="homepage-feed-wrapper">
            <ProductCardFeed
                products={products}
            />

            </div>
        </div>
    )
}
