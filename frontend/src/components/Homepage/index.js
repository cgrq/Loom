import { useEffect, useState, useRef } from "react";
import ProductCardFeed from "../ProductCardFeed";
import { useDispatch, useSelector } from "react-redux";
import { getStorefrontProductsThunk } from "../../store/products";
import "./Homepage.css"
import CardFeedFilter from "../CardFeedFilter";

export default function Homepage() {
    const dispatch = useDispatch();
    const feedWrapperRef = useRef(null);
    const { allProducts, totalPages } = useSelector(state => state.products);
    const [products, setProducts] = useState([]);
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
    const [checkedInitialScreenWidth, setCheckedInitialScreenWidth] = useState(false)

    let page = 1;

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width <= 768) {
                setPerPage(5); // Set lower value for mobile
            } else {
                setPerPage(18); // Set higher value for desktop
            }

            if(!checkedInitialScreenWidth){
                setCheckedInitialScreenWidth(true)
            }
        };

        handleResize(); // Set initial value based on current viewport width

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(()=>{
        if(checkedInitialScreenWidth){
            loadInitialData();
        }

    },[checkedInitialScreenWidth])

    useEffect(() => {
        const feedWrapper = feedWrapperRef.current;


        if (feedWrapper) {
            feedWrapper.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (feedWrapper) {
                feedWrapper.removeEventListener("scroll", handleScroll);
            }
        };
    }, [isLoaded]);

    useEffect(() => {
        if (productType === "tops") {
            setProducts([...tops]);
        } else if (productType === "bottoms") {
            setProducts([...bottoms]);
        } else if (productType === "footwear") {
            setProducts([...footwear]);
        } else if (productType === "seating") {
            setProducts([...seating]);
        } else if (productType === "surfaces") {
            setProducts([...surfaces]);
        } else if (productType === "storage") {
            setProducts([...storage]);
        } else if (productType === "walls") {
            setProducts([...walls]);
        } else if (productType === "spaces") {
            setProducts([...spaces]);
        } else if (productType === "desk") {
            setProducts([...desk]);
        } else {
            setProducts([...Object.values(allProducts)]);
        }
    }, [productType, allProducts, tops, bottoms, footwear, seating, surfaces, storage, walls, spaces, desk]);


    useEffect(() => {
        if (userStorefront) {
            dispatch(getStorefrontProductsThunk(userStorefront.id))
        }
    }, [userStorefront])

    const loadInitialData = async () => {
        // Asynchronously load the thunks to improve initial content render
        const productsModule = await import("../../store/products");
        const reviewsModule = await import("../../store/reviews");
    
        const { getAllProductsThunk } = productsModule;
        const { getAllReviewsThunk } = reviewsModule;
    
        await dispatch(getAllProductsThunk(page, perPage));
        await dispatch(getAllReviewsThunk());

        setIsLoaded(true)
    };

    const loadMoreData = async () => {
        if (page <= totalPages) {
            setIsLoadingMore(true);
            page++;

            const productsModule = await import("../../store/products");
            const { getAllProductsThunk } = productsModule;

            const response = await dispatch(getAllProductsThunk(page, perPage));

            if (!response) {
                setIsLoadingMore(false);
            }
        }
    };

    const handleScroll = () => {
        const feedWrapper = feedWrapperRef.current;

        if (!feedWrapper) {
            return;
        }

        const { scrollTop, scrollHeight, clientHeight } = feedWrapper;

        if (scrollHeight - scrollTop <= clientHeight + 100 && !isLoadingMore) {
            loadMoreData();
        }
    };

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
