const SET_PRODUCT = "products/SET_PRODUCT";
const SET_PRODUCTS = "products/SET_PRODUCTS";
const SET_STOREFRONT_PRODUCTS = "products/SET_STOREFRONT_PRODUCTS";
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT";
const SET_PRODUCT_IMAGES = "products/SET_PRODUCT_IMAGES"
const RESET_PRODUCTS = "products/RESET_PRODUCTS";

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

const removeProduct = (product) => ({
  type: REMOVE_PRODUCT,
  payload: product
});

export const resetProducts = () => ({
  type: RESET_PRODUCTS
})

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
  (formData) =>
    async (dispatch) => {
      const productId = formData.get('productId');
      const response = await fetch(`/api/products/${productId}/images/create`, {
        method: "POST",
        body: formData,
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
  (formData) =>
    async (dispatch) => {
      const productId = formData.get('productId');
      const response = await fetch(`/api/products/${productId}/images/edit`, {
        method: "PUT",
        body: formData,
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

export const deleteProduct = (id, subcategory) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}/delete`, {
    method: 'DELETE'
  });


  if (response.ok) {
    dispatch(removeProduct({
      productId: id,
      subcategory
    }));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};

export const getAllProductsThunk = (page = 1, perPage = 18) => async (dispatch) => {

  const response = await fetch(`/api/products/?page=${page}&per_page=${perPage}`);


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
  storefrontProducts: {},
  tops: {},
  bottoms: {},
  footwear: {},
  seating: {},
  surfaces: {},
  storage: {},
  walls: {},
  spaces: {},
  desk: {},
  storefrontTops: {},
  storefrontBottoms: {},
  storefrontFootwear: {},
  storefrontSeating: {},
  storefrontSurfaces: {},
  storefrontStorage: {},
  storefrontWalls: {},
  storefrontSpaces: {},
  storefrontDesk: {},
};

function formatStorefrontCategoryNameForReducer(categoryName) {
  return `storefront${categoryName.slice(0, 1).toUpperCase() + categoryName.slice(1)}`
}

export default function reducer(state = initialState, action) {
  let newState = {
    ...state,
    storefrontProducts: { ...state.storefrontProducts },
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
    storefrontTops: { ...state.storefrontTops },
    storefrontBottoms: { ...state.storefrontBottoms },
    storefrontFootwear: { ...state.storefrontFootwear },
    storefrontSeating: { ...state.storefrontSeating },
    storefrontSurfaces: { ...state.storefrontSurfaces },
    storefrontStorage: { ...state.storefrontStorage },
    storefrontWalls: { ...state.storefrontWalls },
    storefrontSpaces: { ...state.storefrontSpaces },
    storefrontDesk: { ...state.storefrontDesk },
  }
  switch (action.type) {
    case SET_PRODUCT:
      newState.storefrontProducts[action.payload.product.id] = action.payload.product
      newState.allProducts[action.payload.product.id] = action.payload.product
      newState[action.payload.product.subcategory][action.payload.product.id] = action.payload.product // ex. newstate[footwear][1]
      newState[formatStorefrontCategoryNameForReducer(action.payload.product.subcategory)][action.payload.product.id] = action.payload.product // ex. newState[storefrontFootwear][1] = action.payload.product

      return newState;

    case SET_PRODUCTS:
      action.payload.products.forEach(product => {
        newState.allProducts[product.id] = product
        newState[product.subcategory][product.id] = product
      })

      newState.totalPages = action.payload.total_pages

      return newState;

    case SET_STOREFRONT_PRODUCTS:
      action.payload.products.forEach(product => {
        newState.storefrontProducts[product.id] = product
        newState[formatStorefrontCategoryNameForReducer(product.subcategory)][product.id] = product
      })

      return newState;

    case SET_PRODUCT_IMAGES:
      return newState;

    case REMOVE_PRODUCT:
      delete newState.storefrontProducts[action.payload.productId]
      delete newState.allProducts[action.payload.productId]
      delete newState[action.payload.subcategory][action.payload.productId]
      delete newState[formatStorefrontCategoryNameForReducer(action.payload.subcategory)][action.payload.productId]

      return newState;

    case RESET_PRODUCTS:
      newState = {
        allProducts: {},
        storefrontProducts: {},
        tops: {},
        bottoms: {},
        footwear: {},
        seating: {},
        surfaces: {},
        storage: {},
        walls: {},
        spaces: {},
        desk: {},
        storefrontTops: {},
        storefrontBottoms: {},
        storefrontFootwear: {},
        storefrontSeating: {},
        storefrontSurfaces: {},
        storefrontStorage: {},
        storefrontWalls: {},
        storefrontSpaces: {},
        storefrontDesk: {},
      }
      return newState;
    default:
      return state;
  }
}
