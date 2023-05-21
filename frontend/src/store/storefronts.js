const SET_STOREFRONT = "session/SET_STOREFRONT";
const SET_USER_STOREFRONT = "session/SET_USER_STOREFRONT";
const REMOVE_STOREFRONT = "session/REMOVE_STOREFRONT";


const setStorefront = (storefront) => ({
  type: SET_STOREFRONT,
  payload: storefront,
});

const setUserStorefront = (storefront) => ({
  type: SET_USER_STOREFRONT,
  payload: storefront,
});

const removeStorefront = (storefrontId) => ({
  type: REMOVE_STOREFRONT,
  payload: storefrontId,

});

export const createStorefrontThunk =
  (description, bannerImage) =>
    async (dispatch) => {
      const response = await fetch("api/storefronts/create", {
        method: "POST",
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
        dispatch(setStorefront(data));
        dispatch(setUserStorefront(data));
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

export const editStorefrontThunk =
  (description, bannerImage) =>
    async (dispatch) => {
      const response = await fetch(`/api/storefronts/edit`, {
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
        dispatch(setStorefront(data));
        dispatch(setUserStorefront(data));
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
export const deleteStorefront = (storefrontId) => async (dispatch) => {
  const response = await fetch(`/api/storefronts/delete`, {
    method: 'DELETE'
  });


  if (response.ok) {
    dispatch(removeStorefront(storefrontId));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};

export const getUserStorefrontThunk = () => async (dispatch) => {
  const response = await fetch(`/api/storefronts/user`);
  if (response.ok) {
    const storefront = await response.json();
    console.log("DISPATCHED THUNK")

    dispatch(setUserStorefront(storefront));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};

export const getStorefrontByName = (storefrontName) => async (dispatch) => {
  const response = await fetch(`/api/storefronts/${storefrontName}`);
  if (response.ok) {
    const product = await response.json();
    dispatch(setStorefront(product));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};

const initialState = { currentStorefront:null, userStorefront:null };

export default function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case SET_STOREFRONT:
      newState = { ...state, currentStorefront: { ...state.currentStorefront } }
      newState[action.payload.storefront.id] = action.payload.storefront
      newState.currentStorefront = action.payload.storefront
      return newState
    case SET_USER_STOREFRONT:
      newState = { ...state, userStorefront:null }
      newState.userStorefront = action.payload.storefront
      return newState
    case REMOVE_STOREFRONT:
      const updatedState = { ...state };
      delete updatedState[action.payload.storefrontId];
      return updatedState;
    default:
      return state;
  }
}
