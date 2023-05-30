import json

product_images_file = "product_images.json"
products_file = "products.json"

# Load product_images.json
with open(product_images_file) as f:
    product_images = json.load(f)

# Load products.json
with open(products_file) as f:
    products = json.load(f)

# Sequential number counter for image URL
n = 1

# Replace image1 values based on conditions
for product_image in product_images:
    product_id = product_image["product_id"]
    subcategory = products[product_id - 1]["subcategory"]

    if subcategory == "bottoms":
        image_url = f"https://loom-shopping.s3.us-west-1.amazonaws.com/bottoms/bottoms-{n}.png"
        product_image["image1"] = image_url
        n += 1

# Write modified product_images.json back to file
with open(product_images_file, "w") as f:
    json.dump(product_images, f, indent=4)
