const SET_ORDER = "orders/SET_ORDER";
const SET_ORDERS = "orders/SET_ORDERS";
const SET_CART_ITEM = "orders/:orderId/cartItems/SET_CART_ITEM";
const SET_CART_ITEMS = "orders/:orderId/cartItems/SET_CART_ITEMS";
const REMOVE_CART_ITEM = "orders/:orderId/cartItems/REMOVE_CART_ITEM";
const RESET_CART_ITEMS = "orders/:orderId/cartItems/RESET_CART_ITEMS";
const REMOVE_ORDER = "orders/REMOVE_ORDER";
const RESET_ORDERS = "orders/RESET_ORDERS";


const setOrder = (order) => ({
    type: SET_ORDER,
    payload: order,
});

const setCartItem = (cartItem) => ({
    type: SET_CART_ITEM,
    payload: cartItem,
});

const setCartItems = (cartItems) => ({
    type: SET_CART_ITEMS,
    payload: cartItems,
});

const removeCartItem = (cartItemId) => ({
    type: REMOVE_CART_ITEM,
    payload: cartItemId
});

export const resetCartItems = () => ({
    type: RESET_CART_ITEMS
})

const setOrders = (orders) => ({
    type: SET_ORDERS,
    payload: orders,
});

const removeOrder = (orderId) => ({
    type: REMOVE_ORDER,
    payload: orderId
});

export const resetOrders = () => ({
    type: RESET_ORDERS
})

export const createOrderThunk =
    () =>
        async (dispatch) => {

            const response = await fetch("/api/orders/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: "in progress"
                }),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setOrder(data));
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

export const createCartItemThunk =
    (quantity, productId, orderId) =>
        async (dispatch) => {
            if (!orderId) {
                const order = await fetch("/api/orders/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: "in progress"
                    }),
                });

                if (order.ok) {
                    const data = await order.json();
                    dispatch(setOrder(data));
                    orderId = data.order.id;

                } else if (order.status < 500) {
                    const data = await order.json();

                    if (data.errors) {
                        return data.errors;
                    }
                } else {
                    return ["An error occurred. Please try again."];
                }
            }

            const response = await fetch("/api/cart-items/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity,
                    productId,
                    orderId
                }),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setCartItem(data));
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

export const editOrderThunk =
    (id, rating, message, productId, userId) =>
        async (dispatch) => {

            const response = await fetch(`/api/orders/${id}/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating,
                    message,
                    productId,
                    userId
                }),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setOrder(data));
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

export const editCartItemThunk =
    (itemId, quantity) =>
        async (dispatch) => {

            console.log(`🖥 ~ file: orders.js:173 ~ itemId:`, itemId)
            const response = await fetch(`/api/cart-items/${itemId}/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity,
                    orderId:1,
                    productId:1,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`🖥 ~ file: orders.js:186 ~ data:`, data)
                dispatch(setCartItem(data));
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

export const deleteOrder = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/delete`, {
        method: 'DELETE'
    });


    if (response.ok) {
        dispatch(removeOrder({ orderId }));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

export const getAllOrdersThunk = () => async (dispatch) => {
    const response = await fetch(`/api/orders/`);
    if (response.ok) {
        const orders = await response.json();
        dispatch(setOrders(orders));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

export const getCurrentOrder = () => async (dispatch) => {
    const response = await fetch(`/api/orders/current`);
    if (response.ok) {
        const orders = await response.json();
        dispatch(setOrder(orders));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

export const deleteCartItem = (cartItemId) => async (dispatch) => {
    const response = await fetch(`/api/cart-items/${cartItemId}/delete`, {
        method: 'DELETE'
    });


    if (response.ok) {
        dispatch(removeCartItem({ cartItemId }));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

export const getAllCartItemsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/cart-items/`);
    if (response.ok) {
        const cartItems = await response.json();
        dispatch(setCartItems(cartItems));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

export const getCartItemByOrderId = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/cart-items`);
    if (response.ok) {
        const cartItems = await response.json();
        dispatch(setCartItems(cartItems));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

const initialState = {
    currentOrder: {},
    cart: {}
};

export default function reducer(state = initialState, action) {
    let newState = {
        ...state,
        currentOrder: { ...state.currentOrder },
        cart: { ...state.cart }
    }
    switch (action.type) {
        case SET_ORDER:
            newState.currentOrder = action.payload.order

            return newState;

        case SET_CART_ITEM:
            console.log(`🖥 ~ file: orders.js:297 ~ reducer ~ action.payload.cartItem.id:`, action.payload.cartItem)
            newState.cart[action.payload.cartItem.id] = action.payload.cartItem

            return newState;

        case SET_CART_ITEMS:
            action.payload.cartItems.forEach(cartItem => {

                newState.cart[cartItem.id] = cartItem
            })

            return newState

        case REMOVE_CART_ITEM:
            delete newState.cart[action.payload.cartItemId]

            return newState;
        case REMOVE_ORDER:
            delete newState.currentOrder

            return newState;

        case RESET_CART_ITEMS:
            newState.cart = {}

            return newState;

        case RESET_ORDERS:
            newState.currentOrder = {}
            return newState;

        default:
            return state;
    }
}
