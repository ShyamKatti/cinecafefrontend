import React, {useEffect, useState} from 'react';
import '../css/payment.scss';
import {postData} from "../common/ApiUtils";
import foodAppConstant from '../common/urls';

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

export function PaymentGateway({finalAmount}) {
    const [rzOrderId, setRazorOrderId] = useState(null);

    useEffect(() => {
        setRazorOrderId(null);
        if (finalAmount > 0) {
            postData(foodAppConstant.services.RAZORPAY_ORDER, {
                amount: (finalAmount * 100).toString(),
                currency: 'INR',
                receipt: 'Temp receipt',
                payment_capture: 1
            }).then((response) => {
                const data = response.data[0];
                setRazorOrderId(data.id);
            }).catch((response) => {
                console.log(response);
            });
        }
    }, [finalAmount]);

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
            description: 'Thank you for nothing. Please give us some money',
            image: 'http://localhost:3001/logo.svg',
            handler: function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
            },
            prefill: {
                "contact": '8070126608'
            }
        };
        const paymentObj = new window.Razorpay(options);
        paymentObj.open();

    }
    return (
        <div className="payment-gateway-section">
            <button type="button" className="pay-btn" onClick={loadRazorPay}>Pay
                <span className="total-amount-value">{finalAmount}</span>
            </button>
        </div>
    )
};