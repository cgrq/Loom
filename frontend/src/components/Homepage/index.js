import { useEffect, useState, useRef } from "react";
import ProductCardFeed from "../ProductCardFeed";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk, getStorefrontProductsThunk } from "../../store/products";
import "./Homepage.css"
import CardFeedFilter from "../CardFeedFilter";
import { getAllReviewsThunk } from "../../store/reviews";

export default function Homepage() {
    const dispatch = useDispatch();
    const feedWrapperRef = useRef(null);
    const { allProducts } = useSelector(state => state.products);
    const [products, setProducts] = useState("");
    const [productType, setProductType] = useState("");
    const { userStorefront } = useSelector(state => state.storefronts)
    const { tops } = useSelector(state => state.products);
    const { bottoms } = useSelector(state => state.products);
    const { footwear } = useSelector(state => state.products);
    const { seating } = useSelector(state => state.products);
    const { surfaces } = useSelector(state => state.products);
    const { storage } = useSelector(state => state.products);
    const { walls } = useSelector(state => state.products);
    const { spaces } = useSelector(state => state.products);
    const { desk } = useSelector(state => state.products);
    const [perPage, setPerPage] = useState(18);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    let page = 1;

    useEffect(() => {
        dispatch(getAllProductsThunk(page, perPage));
        dispatch(getAllReviewsThunk());
    }, []);

    const loadMoreData = async () => {
        if (page < 10) {
            setIsLoadingMore(true);
            page++

            const response = await dispatch(getAllProductsThunk(page, perPage));

            if (!response) {
                setIsLoadingMore(false);
            }
        }
    };

    useEffect(() => {
        const feedWrapper = feedWrapperRef.current;
        console.log("load")

        if (feedWrapper) {
            console.log("feed wrapper")
            feedWrapper.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (feedWrapper) {
                feedWrapper.removeEventListener("scroll", handleScroll);
            }
        };
    }, [isLoaded]);


    const handleScroll = () => {
        console.log("scrolling")
        const feedWrapper = feedWrapperRef.current;

        if (!feedWrapper) {
            return;
        }

        const { scrollTop, scrollHeight, clientHeight } = feedWrapper;

        console.log("scroll height - scroll top",scrollHeight - scrollTop)

        console.log("client height - 100", clientHeight + 100)

        if (scrollHeight - scrollTop <= clientHeight + 100 && !isLoadingMore) {
            loadMoreData();
        }
    };


    useEffect(() => {
        if (!isLoaded && Object.values(allProducts).length > 0) {
            setIsLoaded(true)
        }
        setProducts(allProducts)
    }, [allProducts])

    useEffect(() => {
        if (productType === "tops") {
            setProducts(tops)
        }
    }, [tops])

    useEffect(() => {
        if (productType === "bottoms") {
            setProducts(bottoms)
        }
    }, [bottoms])

    useEffect(() => {
        if (productType === "footwear") {
            setProducts(footwear)
        }
    }, [footwear])

    useEffect(() => {
        if (productType === "seating") {
            setProducts(seating)
        }
    }, [seating])

    useEffect(() => {
        if (productType === "surfaces") {
            setProducts(surfaces)
        }
    }, [surfaces])

    useEffect(() => {
        if (productType === "storage") {
            setProducts(storage)
        }
    }, [storage])

    useEffect(() => {
        if (productType === "walls") {
            setProducts(walls)
        }
    }, [walls])

    useEffect(() => {
        if (productType === "spaces") {
            setProducts(spaces)
        }
    }, [spaces])

    useEffect(() => {
        if (productType === "desk") {
            setProducts(desk)
        }
    }, [desk])



    useEffect(() => {
        if (userStorefront) {
            dispatch(getStorefrontProductsThunk(userStorefront.id))
        }
    }, [userStorefront])

    if (!Object.values(products).length) return null

    return (
        <div>
            <div className="homepage-filter-wrapper">
                <CardFeedFilter
                    products={products}
                    setProducts={setProducts}
                    setProductType={setProductType}
                />
            </div>
            <div className="homepage-feed-wrapper" ref={feedWrapperRef}>
                <ProductCardFeed
                    products={products}
                />
            </div>
        </div>
    )
}
