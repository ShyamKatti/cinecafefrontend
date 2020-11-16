import React, { useState } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import OTPAuthenticator from "./OTPAuthentication";
import OrderDetails from "./OrderDetails";
import MenuItems from "./MenuItems";
import Landing from './Landing';
import OrderStatus from './OrderStatus';
import {ProtectedRoute} from "../common/ProtectedRoute";


export default function Content() {
    const [phoneNumber, setPhoneNumber] = useState(null);

    return (
        <div className="checkout-content">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MenuItems} />
                    <Route exact path="/auth"
                           render={(props) => <OTPAuthenticator {...props}
                                                    phoneNumber={phoneNumber}
                                                    setPhoneNumber={setPhoneNumber} />} />
                    <ProtectedRoute exact path="/checkout/cart"
                                    component={OrderDetails} />
                    <ProtectedRoute exact path="/orderstatus" component={OrderStatus} />
                </Switch>
            </BrowserRouter>
        </div>
    )
};