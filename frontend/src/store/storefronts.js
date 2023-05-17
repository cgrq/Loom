const SET_STOREFRONT = "session/SET_STOREFRONT";
const REMOVE_STOREFRONT = "session/REMOVE_STOREFRONT";


const setStorefront = (storefront) => ({
  type: SET_STOREFRONT,
  payload: storefront,
});

const removeStorefront = () => ({
  type: REMOVE_STOREFRONT,
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
export const deleteStorefront = () => async (dispatch) => {
  const response = await fetch(`/api/storefronts/delete`, {
    method: 'DELETE'
  });


  if (response.ok) {
    dispatch(removeStorefront());
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
    dispatch(setStorefront(storefront));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};

const initialState = { userStorefront: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STOREFRONT:
      const newState = { ...state, userStorefront: { ...state.userStorefront } }
      newState.userStorefront = action.payload.storefront
      return newState
    case REMOVE_STOREFRONT:
      return { ...state, userStorefront: null };
    default:
      return state;
  }
}
