// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
// const SET_USERS = "session/SET_USERS";


// const setUsers = (users) => ({
//   type: SET_USERS,
//   payload: users,
// });


const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});



export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
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

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (formData) =>
    async (dispatch) => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
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
export const editUser =
  (formData) =>
    async (dispatch) => {
      const response = await fetch(`/api/auth/edit`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
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
export const deleteUser = () => async (dispatch) => {
  const response = await fetch(`/api/auth/delete`, {
      method: 'DELETE'
  });


  if (response.ok) {
      dispatch(removeUser());
      return null;
  } else {
      const errorResponse = await response.json();
      return errorResponse.errors;
  }
};


const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload.user };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
