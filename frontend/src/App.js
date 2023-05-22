import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation"
import UserAuthForm from "./components/UserAuthForm";
import LoginForm from "./components/LoginForm";
import StorefrontForm from "./components/StorefrontForm";
import Storefront from "./components/Storefront";
import ProductForm from "./components/ProductForm";
import ProductImagesForm from "./components/ProductImagesForm";
import { ProductPage } from "./components/ProductPage";
import Homepage from "./components/Homepage";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.session);
  const { userStorefront } = useSelector((store) => store.storefronts);
  const { currentProduct } = useSelector((store) => store.products)
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingProductImagesForm, setEditingProductImagesForm] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // useEffect(() => {
  // }, [user]);

  return (
    <>
      <div className="app-wrapper">
        <div className="app-navigation-wrapper app-row">
          <Navigation />
        </div>
        <div className="app-body-wrapper app-row">
          <div className="app-body-content-wrapper">
            {isLoaded && (
              <Switch>
                <Route exact path={"/sign-up"}>
                  <UserAuthForm componentType={"create"} />
                </Route>
                <Route exact path={"/login"}>
                  <LoginForm />
                </Route>
                <Route exact path={"/edit-profile"}>
                  <UserAuthForm componentType={"update"} />
                </Route>

                <Route exact path={"/not-found"}>
                  <h1>Sorry the resource you're requesting was not found on our servers</h1>
                </Route>
                <Route exact path={"/create-a-storefront"}>
                  <StorefrontForm />
                </Route>
                <Route exact path={"/:storefrontName/edit"}>
                  {
                    userStorefront
                      ? <StorefrontForm />
                      : <h1>No store found</h1>
                  }
                </Route>
                <Route exact path={"/:storefrontName/new-product"}>
                  {
                    userStorefront
                      ? <ProductForm
                        setEditingProductImagesForm={setEditingProductImagesForm}
                      />
                      : <h1>No store found</h1>
                  }
                </Route>
                <Route exact path={"/:storefrontName/:productName/edit/images"}>
                  {
                    userStorefront
                      ? <ProductImagesForm
                      />

                      : <h1>No store found</h1>
                  }
                </Route>


                <Route exact path={"/:storefrontName/:productName/edit"}>
                  {
                    userStorefront
                      ? <ProductForm
                        componentType={"update"}
                      />

                      : <h1>No store found</h1>
                  }
                </Route>
                <Route exact path={"/:storefrontName/:productName"}>
                  <ProductPage />
                </Route>
                <Route exact path={"/:storefrontName"}>
                  <Storefront />
                </Route>
                <Route exact path={"/"}>
                  {/* <Homepage /> */}
                  <Homepage />
                </Route>
              </Switch>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
