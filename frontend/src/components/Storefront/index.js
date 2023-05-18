import { useDispatch, useSelector } from "react-redux";
import "./Storefront.css"
import { useEffect, useState } from "react";

export default function Storefront() {
    const { user } = useSelector((state) => state.session)
    const { userStorefront } = useSelector((state) => state.storefronts)
    // const [bannerImage, setBannerImage] =useState("")

    // useEffect(()=>{

    // },[userStorefront])


    return (
        <div className="storefront-wrapper">
            <div className="storefront-banner-wrapper">
                <img className="storefront-user-image" src={user.profile_image} />
                <img className="storefront-banner-image" src={userStorefront.banner_image} />
            </div>
            <div className="storefront-details-wrapper">
                <span>Store description:</span>
                <div className="storefront-description-wrapper">
                    {userStorefront.description}
                </div>
            </div>
        </div>
    )
}
