import React, {useState, useEffect} from "react";
import {postData, getData} from "../common/ApiUtils";
import foodAppConstant from "../common/urls";
import "../css/orderstatus.scss";



function OrderStatus({location}) {
  const [vistaOrderStatus, setVistaOrderStatus] = useState('ORDER_PLACED');
  const [userOrderMessage, setUserOrderMessage] = useState('');
  const [orderFailed, setOrderFailed] = useState(vistaOrderStatus === 'ORDER_CANCELLED');
  let status_code = 0;

  useEffect(() => {
    postData(foodAppConstant.services.PLACE_ORDER, {
      rzPaymentId: location.state.rzPaymentId,
      transId: parseInt(location.state.transId),
      phoneNumber: location.state.phoneNumber
    }).then((response) => {
        status_code = response.status;
        if (response.status === 200) {
          setVistaOrderStatus('ORDER_CONFIRMED');
          getData(foodAppConstant.services.NOTIFY_VENDOR_URL, {
            phone: location.state.phoneNumber
          });
        } else {
          setVistaOrderStatus('ORDER_CANCELLED_1');
        }
        localStorage.clear();
    }).catch((err) => {
        console.warn(err);
        console.warn("Something went wrong when finalizing the order");
        setVistaOrderStatus('ORDER_CONFIRMED');
        getData(foodAppConstant.services.NOTIFY_VENDOR_URL, {
            phone: location.state.phoneNumber
        });
        localStorage.clear();

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
    } else if (vistaOrderStatus === 'ORDER_CANCELLED_1') {
      setUserOrderMessage('Order has been cancelled ' + status_code);
    } else if (vistaOrderStatus === 'ORDER_CANCELLED_2') {
      setUserOrderMessage('Bombed completely');
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