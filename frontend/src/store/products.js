const SET_PRODUCT = "session/SET_PRODUCT";
const REMOVE_PRODUCT = "session/REMOVE_PRODUCT";


const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});

const removeProduct = () => ({
  type: REMOVE_PRODUCT,
});

export const createProductThunk =
  (name, description, quantity, price, category, subcategory,storefrontId) =>
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

const initialState = { storefrontProducts: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      const newState = { ...state, storefrontProducts: { ...state.storefrontProducts } }
      newState.storefrontProducts[action.payload.product.id] = action.payload.product
      return newState
    case REMOVE_PRODUCT:
      return { ...state, storefrontProducts: null };
    default:
      return state;
  }
}
