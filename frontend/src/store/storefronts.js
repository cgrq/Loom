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
// SignupFormModal
// export const editUser =
//   (username, email, password, firstName, lastName, profileImage) =>
//     async (dispatch) => {
//       const response = await fetch(`/api/auth/edit`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           firstName,
//           lastName,
//           profileImage,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         dispatch(setUser(data));
//         return null;
//       } else if (response.status < 500) {
//         const data = await response.json();

//         if (data.errors) {
//           return data.errors;
//         }
//       } else {
//         return ["An error occurred. Please try again."];
//       }
//     };

// // Delete a user thunk
// export const deleteUser = () => async (dispatch) => {
//   const response = await fetch(`/api/auth/delete`, {
//       method: 'DELETE'
//   });


//   if (response.ok) {
//       dispatch(removeUser());
//       return null;
//   } else {
//       const errorResponse = await response.json();
//       return errorResponse.errors;
//   }
// };


const initialState = { userStorefront: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STOREFRONT:
        const newState = {...state, userStorefront: {...state.userStorefront}}
        newState.userStorefront = action.payload.storefront
        return newState
    case REMOVE_STOREFRONT:
      return { ...state, userStorefront: null };
    default:
      return state;
  }
}
