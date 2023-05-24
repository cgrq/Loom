import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getStorefrontProductsThunk } from "../../store/products"
import ProductCard from "../ProductCard";
import "./Storefront.css"
import { getStorefrontByName } from "../../store/storefronts";
import ProductCardFeed from "../ProductCardFeed";
import CardFeedFilter from "../CardFeedFilter";
import { useFilter } from "../../context/Filter";

export default function Storefront() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector((state) => state.session)
    const { storefrontName } = useParams();
    const { currentStorefront } = useSelector((state) => state.storefronts)
    const { storefrontProducts } = useSelector((state) => state.products)
    const { selectedFilter } = useFilter()
    const [ showProfile, setShowProfile ] = useState(false)
    const [ products, setProducts ] = useState()
    const { userStorefront } = useSelector(state=>state.storefronts)
    const tops = useSelector(state => state.products.storefrontTops);
    const bottoms = useSelector(state => state.products.storefrontBottoms);
    const footwear  = useSelector(state => state.products.storefrontFootwear);
    const seating  = useSelector(state => state.products.storefrontSeating);
    const surfaces  = useSelector(state => state.products.storefrontSurfaces);
    const storage = useSelector(state => state.products.storefrontStorage);
    const walls  = useSelector(state => state.products.storefrontWalls);
    const spaces  = useSelector(state => state.products.storefrontSpaces);
    const desk  = useSelector(state => state.products.storefrontDesk);

    useEffect(()=>{
        if(storefrontName){
            dispatch(getStorefrontByName(storefrontName))
        }

    },[])

    useEffect(()=>{
        const storefrontProductsArr = Object.values(storefrontProducts);
        if(storefrontProducts
            && storefrontProductsArr.length > 0
            && storefrontProductsArr[0].storefrontId === userStorefront.id){
            setProducts(storefrontProducts)
        }
    }, [storefrontProducts])

    useEffect(() => {
        if (currentStorefront && currentStorefront.id) {
            dispatch(getStorefrontProductsThunk(currentStorefront.id))
        }
    }, [currentStorefront])


    useEffect(()=>{
        if (selectedFilter === "tops"){
            setProducts(tops)
        }
    }, [tops])

    useEffect(()=>{
        if (selectedFilter === "bottoms"){
            setProducts(bottoms)
        }
    }, [bottoms])

    useEffect(()=>{
        if (selectedFilter === "footwear"){
            setProducts(footwear)
        }
    }, [footwear])

    useEffect(()=>{
        if (selectedFilter === "seating"){
            setProducts(seating)
        }
    }, [seating])

    useEffect(()=>{
        if (selectedFilter === "surfaces"){
            setProducts(surfaces)
        }
    }, [surfaces])

    useEffect(()=>{
        if (selectedFilter === "storage"){
            setProducts(storage)
        }
    }, [storage])

    useEffect(()=>{
        if (selectedFilter === "walls"){
            setProducts(walls)
        }
    }, [walls])

    useEffect(()=>{
        if (selectedFilter === "spaces"){
            setProducts(spaces)
        }
    }, [spaces])

    useEffect(()=>{
        if (selectedFilter === "desk"){
            setProducts(desk)
        }
    }, [desk])




    useEffect(()=>{
    },[products])

    if (!user || !storefrontName || !storefrontProducts || !currentStorefront || !currentStorefront.user) return null
    return (
        <div className="storefront-wrapper">

            <div className={`storefront-banner-wrapper ${showProfile ? "" : "storefront-hide-banner-wrapper"}`}>
                <div className="storefront-banner-image-wrapper">
                    <div className="storefront-banner-image-fade-left" />
                    <div className="storefront-banner-image-fade-right" />
                    <img className="storefront-banner-image" src={currentStorefront.banner_image} />

                </div>
            </div>

            <div className="storefront-details-wrapper">
                <div className="storefront-details-profile-wrapper">
                    <img className="storefront-user-image" src={currentStorefront.user.profile_image} />
                    <div
                        className="storefront-toggle-show-profile-button"
                        onClick={()=> setShowProfile(!showProfile)}
                    >
                        {
                            showProfile
                                ? "Show filters"
                                : "Show owner profile"
                        }
                    </div>
                </div>
                {
                    showProfile
                        ? (
                            <div className="storefront-description-wrapper">
                                <span className="storefront-description-label">Description:</span>
                                {currentStorefront.description}
                            </div>
                        )
                        : <CardFeedFilter
                            products={products}
                            setProducts={setProducts}
                            userStorefront={true}
                          />
                }

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
                products={products}
            />
        </div>
    )
}
