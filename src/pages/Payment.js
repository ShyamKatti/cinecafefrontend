import React, {useEffect, useState} from 'react';
import '../css/payment.scss';
import {postData} from "../common/ApiUtils";
import foodAppConstant from '../common/urls';
import {useHistory} from "react-router-dom";


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export function PaymentGateway({finalAmount, phoneNumber}) {
    const [rzOrderId, setRazorOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setRazorOrderId(null);
        setIsLoading(true);
        if (finalAmount > 0) {
            postData(foodAppConstant.services.RAZORPAY_ORDER, {
                amount: (finalAmount * 100).toString(),
                currency: 'INR',
                receipt: 'Temp receipt',
                payment_capture: 1
            }).then((response) => {
                const data = response.data[0];
                setRazorOrderId(data.id);
                setIsLoading(false);
            }).catch((response) => {
                console.warn(response);
            });
        }
    }, [finalAmount]);

    const handleVistaUpdates = (response) => {
        if (response.razorpay_payment_id) {
            history.push("/orderstatus", {
                rzPaymentId: response.razorpay_payment_id,
                phoneNumber: phoneNumber,
                transId: localStorage.getItem("vistaTransId")
            });
        } else {
            console.warn("Something went wrong, please try again");
            localStorage.clear();
            history.push("/");
        }
    }

    async function loadRazorPay() {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('Razorpay did not load');
        }

        const options = {
            key: 'rzp_test_ITacyB3nw8PBvM',
            currency: 'INR',
            amount: (finalAmount * 100).toString(),
            order_id: {rzOrderId},
            name: 'Pay',
            description: 'We thank you for your order!',
            image: "https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/bmx_logo.png",
            handler: handleVistaUpdates,
            prefill: {
                "contact": phoneNumber
            }
        };
        const paymentObj = new window.Razorpay(options);
        paymentObj.open();

    }
    return (
        <div className="payment-gateway-section">
            <button type="button" className="pay-btn" onClick={loadRazorPay} disabled={isLoading}>
              { !isLoading && (<span>Pay<span className="total-amount-value">{finalAmount}</span></span>) }
              { isLoading && <span className="rzLoadingState">Loading...</span> }
            </button>
        </div>
    )
};