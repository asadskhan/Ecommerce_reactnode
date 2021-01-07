import React, {Component} from "react";
import Home from "./components/Home";
import Products from "./components/Products";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Register}/>
                    <Route path="/products" component={Products}/>
                    <Route path="/product/:id" component={ProductDetails}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
