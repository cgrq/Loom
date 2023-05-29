import React, { useEffect, useState } from "react";
import "./ProductImages.css";

export default function ProductImages({
    imageUrls,
    selectedImage,
    setSelectedImage,
    componentType = "read",
    onAddButtonImageClick,
}) {
    const [imageSource, setImageSource] = useState(null);
    const [buttonFeedArr, setButtonFeedArr] = useState([]);
    const [addingImageButton, setAddingImageButton] = useState(false)

    useEffect(() => {
        setButtonFeedArr(imageUrls)
    }, [imageUrls]);

    useEffect(() => {
        if (addingImageButton) {
            const placeholderImage = `https://loom-shopping.s3.us-west-1.amazonaws.com/product+image+upload+placeholder/image${buttonFeedArr.length}.png`;

            onAddButtonImageClick(() => placeholderImage)
            setAddingImageButton(false)
        }
        console.log("SELECTED IMAGE!!!", selectedImage)
        if (selectedImage instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSource(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        } else {
            setImageSource(selectedImage);
        }
    }, [selectedImage]);

    const addImageButton = () => {
        if(buttonFeedArr.length >= 6) return

        const placeholderImage = `https://loom-shopping.s3.us-west-1.amazonaws.com/product+image+upload+placeholder/image${buttonFeedArr.length + 1}.png`;

        setButtonFeedArr([...buttonFeedArr, placeholderImage])
        setSelectedImage(`image${buttonFeedArr.length + 1}`)
        setAddingImageButton(true)
    }


    return (
        <div className="product-images-wrapper">
            <div>
                <img className="product-display-image" src={imageSource} alt="Product" />
            </div>
            <div className="product-image-button-wrapper">
                {buttonFeedArr.map((imageUrl, index) => (
                    <ImageButton
                        key={index}
                        imageUrl={imageUrl}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        componentType={componentType}
                        imageNumber={`image${index + 1}`}
                    />
                ))}
                {
                    componentType !== "read" &&
                        (<div
                            className="product-image-add-button-wrapper"
                            onClick={addImageButton}
                        >
                            +
                        </div>)
                }
            </div>
        </div>
    );
}

function ImageButton({
    imageUrl,
    selectedImage,
    setSelectedImage,
    componentType,
    imageNumber,
}) {
    const [imageSource, setImageSource] = useState(null);

    useEffect(() => {
        if (imageUrl instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSource(reader.result);
            };
            reader.readAsDataURL(imageUrl);
        } else {
            setImageSource(imageUrl);
        }
    }, [imageUrl]);

    return (
        <img
            className={`product-image-button ${selectedImage === imageUrl ? "product-image-button-selected" : ""
                }`}
            src={imageSource}
            alt="Product"
            onClick={() => setSelectedImage(imageNumber)}
        />
    );
}
