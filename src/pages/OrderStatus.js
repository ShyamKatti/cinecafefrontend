import React, {useState, useEffect} from "react";
import {postData} from "../common/ApiUtils";
import foodAppConstant from "../common/urls";
import "../css/orderstatus.scss";



function OrderStatus({location}) {
  const [vistaOrderStatus, setVistaOrderStatus] = useState('ORDER_PLACED');
  const [userOrderMessage, setUserOrderMessage] = useState('');
  const [orderFailed, setOrderFailed] = useState(vistaOrderStatus === 'ORDER_CANCELLED');

  useEffect(() => {
    postData(foodAppConstant.services.PLACE_ORDER, {
      rzPaymentId: location.state.rzPaymentId,
      transId: parseInt(location.state.transId),
      phoneNumber: location.state.phoneNumber
    }).then((response) => {
        if (response.status === 200 && response.data) {
          setVistaOrderStatus('ORDER_CONFIRMED');
        } else {
          setVistaOrderStatus('ORDER_CANCELLED');
        }
    }).catch((err) => {
        console.warn("Something went wrong when finalizing the order");
        setVistaOrderStatus('ORDER_CANCELLED');

    });
  }, [location]);

  useEffect(() => {
    setOrderFailed(vistaOrderStatus === 'ORDER_CANCELLED');
  }, [vistaOrderStatus]);

  useEffect(() => {
    if (vistaOrderStatus === 'ORDER_PLACED') {
      setUserOrderMessage('Payment received');
    } else if (vistaOrderStatus === 'ORDER_CONFIRMED') {
      setUserOrderMessage('Order confirmed');
    } else if (vistaOrderStatus === 'ORDER_CANCELLED') {
      setUserOrderMessage('Order cancelled');
    }
  }, [vistaOrderStatus])

  return (
    <div className="order-status">
      <div className="section-header">
        <div className="bmx-logo">
          <img src="https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/bmx_logo.png"
                             id="logoIcon" alt="Balaji Logo" />
        </div>
        <div className="section-title">
          Order Status
        </div>
      </div>
      <div className="section-body">
        <div className="user-notice-message">
          Please stay on this page while we confirm your order
        </div>
        <div className="vista-order-status">
          Your order status: <span className={!orderFailed ? "order-status-success" : "order-status-failed"}>{userOrderMessage}</span>
          {
            orderFailed && <div className="rz-refund-message">
              We have initiated your refund and are sorry for the inconvenience. Please visit our cafe
              to place your order.
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default OrderStatus;