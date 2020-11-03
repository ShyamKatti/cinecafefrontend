import React, { useState } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import OTPAuthenticator from "./OTPAuthentication";
import OrderDetails from "./OrderDetails";
import MenuItems from "./MenuItems";
import Landing from './Landing';
import {ProtectedRoute} from "../common/ProtectedRoute";


export default function Content() {
    const [seatDelivery, setSeatDelivery] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(null);

    return (
        <div className="checkout-content">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={(props) => <Landing {...props}
                                                                      setSeatDelivery={setSeatDelivery} /> } />
                    <Route exact path="/food" component={MenuItems} />
                    <Route exact path='/auth'
                           render={(props) => <OTPAuthenticator {...props}
                                                    phoneNumber={phoneNumber}
                                                    setPhoneNumber={setPhoneNumber} />} />
                    <ProtectedRoute exact path='/checkout/cart'
                           render={(props) => <OrderDetails {...props}
                                                            seatDelivery={seatDelivery}
                                                            phoneNumber={phoneNumber}/> } />
                </Switch>
            </BrowserRouter>
        </div>
    )
};