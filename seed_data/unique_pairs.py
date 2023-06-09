import json
import random

# Load existing reviews from the JSON file
with open('reviews.json') as file:
    reviews = json.load(file)

# Create a set to keep track of existing combinations of product_id and user_id
existing_combinations = set()

# Loop through the reviews and modify any conflicting combinations
for review in reviews:
    product_id = review["product_id"]
    user_id = review["user_id"]

    # Check if the combination already exists in the set
    while (product_id, user_id) in existing_combinations:
        product_id = random.randint(201, 225)  # Change the product_id to a random value

    # Update the product_id in the review
    review["product_id"] = product_id

    # Add the modified combination to the set
    existing_combinations.add((product_id, user_id))

# Save the updated reviews list back to the JSON file
with open('reviews.json', 'w') as file:
    json.dump(reviews, file, indent=4)

print("Reviews modified successfully.")
