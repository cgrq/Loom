import { useDispatch } from "react-redux";
import "./CardFeedFilter.css"
import { SubcomponentIcon } from "../SubcategoryIcon";

export default function CardFeedFilter({
    setProducts, // Used to set products in parent to dictate what cards are being rendered
    userStorefront = false // Defaults to false, dictates whether or not user specific storefronts will be rendered or just general products
}) {
    const dispatch = useDispatch();



    const publicUrl = process.env.PUBLIC_URL;

    return (
        <div className="card-feed-filter-wrapper">
            <div className="card-feed-filter-category">
                <div className="card-feed-filter-category-title">
                    Clothing
                </div>

                <div className="card-feed-filter-subcategorys-wrapper">
                    <SubcomponentIcon
                        type="tops"
                        setProductState={setProducts}
                        userStorefront={userStorefront}
                    />
                    <SubcomponentIcon
                        type="bottoms"
                        setProductState={setProducts}
                        userStorefront={userStorefront}

                    />
                    <SubcomponentIcon
                        type="footwear"
                        setProductState={setProducts}
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
                        setProductState={setProducts}
                        userStorefront={userStorefront}

                    />
                    <SubcomponentIcon
                        type="surfaces"
                        setProductState={setProducts}
                        userStorefront={userStorefront}

                    />
                    <SubcomponentIcon
                        type="storage"
                        setProductState={setProducts}
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
                        setProductState={setProducts}
                        userStorefront={userStorefront}

                    />
                    <SubcomponentIcon
                        type="spaces"
                        setProductState={setProducts}
                        userStorefront={userStorefront}

                    />
                    <SubcomponentIcon
                        type="desk"
                        setProductState={setProducts}
                        userStorefront={userStorefront}

                    />
                </div>
            </div>
        </div>
    )
}
