import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import OTPAuthenticator from "./OTPAuthentication";
import OrderDetails from "./OrderDetails";
import MenuItems from "./MenuItems";
import Landing from './Landing';


export default function Content() {
    return (
        <div className="checkout-content">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/food" component={MenuItems} />
                    <Route exact path="/" component={Landing} />
                    <Route exact path='/auth' component={ OTPAuthenticator }></Route>
                    <Route exact path='/checkout/cart' component={ OrderDetails }></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
};