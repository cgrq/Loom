import React, { useEffect, useState } from "react";
import "./ProductImages.css";

export default function ProductImages({
    imageUrls,
    selectedImage,
    setSelectedImage,
    componentType = "read",
    onAddButtonImageClick,
    onRemoveButtonImageClick,
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
        if (selectedImage instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSource(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        } else if (!selectedImage) {
            setImageSource(
                imageUrls[0]
                    ? imageUrls[0]
                    : imageUrls[1]
                        ? imageUrls[1]
                        : imageUrls[2]
                            ? imageUrls[2]
                            : imageUrls[3]
                                ? imageUrls[3]
                                : imageUrls[4]
                                    ? imageUrls[4]
                                    : imageUrls[5]
            );
        }
        else {
            setImageSource(selectedImage);
        }
    }, [selectedImage]);

    const addImageButton = () => {
        if (buttonFeedArr.length >= 6) return

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
            <div className="product-image-button-container">
                {buttonFeedArr.map((imageUrl, index) => (
                    <ImageButton
                        key={index}
                        index={index}
                        imageUrl={imageUrl}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        componentType={componentType}
                        imageNumber={`image${index + 1}`}
                        onRemoveButtonImageClick={onRemoveButtonImageClick}
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
    index,
    imageUrl,
    selectedImage,
    setSelectedImage,
    componentType,
    imageNumber,
    onRemoveButtonImageClick,
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

    const removeImageButton = () => {
        onRemoveButtonImageClick(index + 1)
        // setButtonFeedArr([...buttonFeedArr, placeholderImage])
        setSelectedImage(`image1`)
        // setAddingImageButton(true)
    }

    return (
        <div className="product-image-button-wrapper">
            <img
                className={`product-image-button ${selectedImage === imageUrl ? "product-image-button-selected" : ""
                    }`}
                src={imageSource}
                alt="Product"
                onClick={() => setSelectedImage(imageNumber)}
            />
            {
                componentType !== "read" && (
                    <div className={`product-image-remove-image-button-wrapper`} >
                        <div
                            onClick={removeImageButton}
                            className="product-image-remove-image-button"
                        >
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
