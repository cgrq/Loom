'use client'
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import storefronts from "./storefronts"
import products from "./products"
import reviews from "./reviews"
import orders from './orders'

const rootReducer = combineReducers({
  session,
  storefronts,
  products,
  reviews,
  orders
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  useEffect(() => {
    const handleResize = () => {
      // handle window resize logic here
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;