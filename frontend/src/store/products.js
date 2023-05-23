const SET_PRODUCT = "session/SET_PRODUCT";
const SET_PRODUCTS = "session/SET_PRODUCTS";
const SET_STOREFRONT_PRODUCTS = "session/SET_STOREFRONT_PRODUCTS";
const REMOVE_PRODUCT = "session/REMOVE_PRODUCT";
const SET_PRODUCT_IMAGES = "session/SET_PRODUCT_IMAGES"

const setProductImages = (productImages) => ({
  type: SET_PRODUCT_IMAGES,
  payload: productImages
})

const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

const setStorefrontProducts = (product) => ({
  type: SET_STOREFRONT_PRODUCTS,
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

export const editProductThunk =
  (id, name, description, quantity, price, category, subcategory, storefrontId) =>
    async (dispatch) => {
      const response = await fetch(`/api/products/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
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
        dispatch(setProductImages(data));
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

export const editProductImagesThunk =
  (image1, image2, image3, image4, image5, image6, productId) =>
    async (dispatch) => {
      const response = await fetch(`/api/products/${productId}/images/edit`, {
        method: "PUT",
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
        dispatch(setProductImages(data));
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
export const deleteProduct = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}/delete`, {
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

export const getAllProductsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/products/`);
  if (response.ok) {
    const products = await response.json();
    dispatch(setProducts(products));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};
export const getStorefrontProductsThunk = (storefrontId) => async (dispatch) => {
  const response = await fetch(`/api/products/storefront/${storefrontId}`);
  if (response.ok) {
    const products = await response.json();
    dispatch(setStorefrontProducts(products));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};
export const getProductByName = (productName) => async (dispatch) => {
  const response = await fetch(`/api/products/${productName}`);
  if (response.ok) {
    const product = await response.json();
    dispatch(setProduct(product));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};



const initialState = {
  allProducts: {},
  storefrontProducts: {
    tops: {},
    bottoms: {},
    footwear: {},
    seating: {},
    surfaces: {},
    storage: {},
    walls: {},
    spaces: {},
    desk: {},
  },
  tops: {},
  bottoms: {},
  footwear: {},
  seating: {},
  surfaces: {},
  storage: {},
  walls: {},
  spaces: {},
  desk: {},
};

export default function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case SET_PRODUCT:
      newState = { ...state, storefrontProducts: { ...state.storefrontProducts }, allProducts: { ...state.allProducts } }
      newState.storefrontProducts[action.payload.product.id] = action.payload.product
      newState.allProducts[action.payload.product.id] = action.payload.product
      return newState;
    case SET_PRODUCTS:
      newState = {
        ...state,
        allProducts: { ...state.allProducts },
        tops: { ...state.tops },
        bottoms: { ...state.bottoms },
        footwear: { ...state.footwear },
        seating: { ...state.seating },
        surfaces: { ...state.surfaces },
        storage: { ...state.storage },
        walls: { ...state.walls },
        spaces: { ...state.spaces },
        desk: { ...state.desk },
      }
      action.payload.products.forEach(product => {
        newState.allProducts[product.id] = product
        console.log(`🖥 ~ file: products.js:259 ~ reducer ~ product.subcategory:`, product.subcategory)
        newState[product.subcategory][product.id] = product
      })
      return newState;
    case SET_STOREFRONT_PRODUCTS:
      newState = {
        ...state,
        storefrontProducts: {
          ...state.storefrontProducts,
          tops: { ...state.storefrontProducts.tops },
          bottoms: { ...state.storefrontProducts.bottoms },
          footwear: { ...state.storefrontProducts.footwear },
          seating: { ...state.storefrontProducts.seating },
          surfaces: { ...state.storefrontProducts.surfaces },
          storage: { ...state.storefrontProducts.storage },
          walls: { ...state.storefrontProducts.walls },
          spaces: { ...state.storefrontProducts.spaces },
          desk: { ...state.storefrontProducts.desk },
        },
        allProducts: {
          ...state.allProducts
        }
      }
      action.payload.products.forEach(product => {
        newState.storefrontProducts[product.id] = product
        newState.storefrontProducts[product.subcategory][product.id] = product
        newState.allProducts[product.id] = product
      })
      return newState;
    case SET_PRODUCT_IMAGES:
      newState = { ...state, storefrontProducts: { ...state.storefrontProducts }, allProducts: { ...state.allProducts } }
      newState.storefrontProducts[action.payload.productImages.product_id].productImages = action.payload.productImages
      newState.allProducts[action.payload.productImages.product_id].productImages = action.payload.productImages
      return newState;
    case REMOVE_PRODUCT:
      return { ...state, storefrontProducts: null };
    default:
      return state;
  }
}
