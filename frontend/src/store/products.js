const SET_PRODUCT = "session/SET_PRODUCT";
const CREATE_PRODUCT = "session/CREATE_PRODUCT";
const REMOVE_PRODUCT = "session/REMOVE_PRODUCT";
const SET_CURRENT_PRODUCT = "session/SET_CURRENT_PRODUCT";
const CREATE_PRODUCT_IMAGES = "session/CREATE_PRODUCT_IMAGES"



const createProduct = (product) => ({
  type: CREATE_PRODUCT,
  payload: product,
});

export const setCurrentProduct = (product) => ({
  type: SET_CURRENT_PRODUCT,
  payload: product,
});

const createProductImages = (productImages) => ({
  type: CREATE_PRODUCT_IMAGES,
  payload: productImages
})

const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});

const removeProduct = () => ({
  type: REMOVE_PRODUCT,
});

export const createProductThunk =
  (name, description, quantity, price, category, subcategory, storefrontId) =>
    async (dispatch) => {
      const response = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          quantity,
          price,
          category,
          subcategory,
          storefrontId
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(createProduct(data));
        return null;
      } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    };

export const createProductImagesThunk =
  (image1, image2, image3, image4, image5, image6, productId) =>
    async (dispatch) => {
      const response = await fetch(`/api/products/${productId}/images/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image1,
          image2,
          image3,
          image4,
          image5,
          image6,
          productId
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`🖥 ~ file: products.js:88 ~ data:`, data)
        dispatch(createProductImages(data));
        return null;
      } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    };

export const editProductThunk =
  (description, bannerImage) =>
    async (dispatch) => {
      const response = await fetch(`/api/products/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          bannerImage
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setProduct(data));
        return null;
      } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    };

// Delete a user thunk
export const deleteProduct = () => async (dispatch) => {
  const response = await fetch(`/api/products/delete`, {
    method: 'DELETE'
  });


  if (response.ok) {
    dispatch(removeProduct());
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};

export const getStorefrontProductsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/products/storefront`);
  if (response.ok) {
    const product = await response.json();
    dispatch(setProduct(product));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};

const initialState = { storefrontProducts: null, currentProduct: null };

export default function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case CREATE_PRODUCT:
      newState = { ...state, storefrontProducts: { ...state.storefrontProducts }, currentProduct: null }
      newState.storefrontProducts[action.payload.product.id] = action.payload.product
      newState.currentProduct = action.payload.product
      return newState;
    case CREATE_PRODUCT_IMAGES:
      console.log(`🖥 ~ file: products.js:172 ~ reducer ~ action.payload.:`, action.payload.productImages)
      newState = { ...state, storefrontProducts: { ...state.storefrontProducts }, currentProduct: {...state.currentProduct} }
      newState.storefrontProducts[action.payload.productImages.product_id].images = action.payload.productImages
      console.log(`🖥 ~ file: products.js:173 ~ reducer ~ action.payload.productImages.product_id:`, action.payload.productImages.product_id)
      newState.currentProduct.images = action.payload.productImages
      return newState;
    case SET_CURRENT_PRODUCT:
      newState = { ...state, currentProduct: null }
      if(action.payload && action.payload.product){
        newState.currentProduct = action.payload.product
      }
      return newState;
    case SET_PRODUCT:
      newState = { ...state, storefrontProducts: { ...state.storefrontProducts } }
      newState.storefrontProducts[action.payload.product.id] = action.payload.product
      return newState;
    case REMOVE_PRODUCT:
      return { ...state, storefrontProducts: null };
    default:
      return state;
  }
}
