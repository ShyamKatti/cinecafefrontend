import React, { useState, useEffect } from 'react';
import { useFinalItemAmount } from '../common/usePriceDetails';
import '../css/orderdetails.scss';
import { PaymentGateway } from './Payment';
import foodAppConstants from '../common/urls';
import {postData} from "../common/ApiUtils";


function OrderItem({ singleOrderItem, setTotalFinalPrice }) {
    const quantity = singleOrderItem.itemQuantity;
    const price = singleOrderItem.itemPrice;
    const totalPrice = useFinalItemAmount(quantity, price, setTotalFinalPrice, singleOrderItem);

    return (
        <div className="order-item">
            <div className="order-item-name">
                {singleOrderItem.itemName}
            </div>
            <div className="order-edit-quantity">
              <label id={'input-quantity-' + singleOrderItem.itemId}
                     className="input-quantity-label">{quantity}</label>
            </div>
            <div className="order-total-price">{totalPrice}</div>
        </div>
    )
}

function OrderItems({phoneNumber}) {
    const [cartItems, setCartItems] = useState({});
    const [totalFinalPrice, setTotalFinalPrice] = useState(0);
    const [areItemsAddedToBE, setAreItemsAddedToBE] = useState(false);

    useEffect(() => {
        let allPromises = [];
        const localStorageItems = localStorage.getItem("cartItems");
        if (localStorageItems !== undefined || localStorageItems !== null) {
          const storageItemsInJSON = JSON.parse(localStorageItems);
          setCartItems(storageItemsInJSON);

          storageItemsInJSON && Object.values(storageItemsInJSON).forEach((item) => {
              allPromises.push(postData(
                foodAppConstants.services.ADD_ITEM,
                {
                    transId: localStorage.getItem("vistaTransId"),
                    itemId: item.itemId,
                    itemQuantity: item.itemQuantity
                })
              );
          });

          Promise.all(allPromises).then(() => {
              setAreItemsAddedToBE(true);
              localStorage.removeItem("cartItems");
          }).catch((err) => {
              console.warn(err);
              setAreItemsAddedToBE(false);
          });
        } else {
          setCartItems({});
          setAreItemsAddedToBE(true);
        }
    }, []);

    return (
      <div>
        <div className={areItemsAddedToBE ? "order-details" : "display-nd"}>
            <div className="order-items">
                {
                    cartItems && Object.keys(cartItems).length > 0 && Object.values(cartItems).map((item) => {
                        return <OrderItem
                            singleOrderItem={item}
                            setTotalFinalPrice={setTotalFinalPrice}
                            key={'key-' + item.itemId}
                        />
                    })
                }
            </div>
            <div className="order-total-section">
                <OrderTotal totalFinalPrice={totalFinalPrice} phoneNumber={phoneNumber} />
            </div>
        </div>
        <div className={!areItemsAddedToBE ? "loading-spinner" : "display-nd"}>
            <div>
                <div className="loading-text">Loading your choices...</div>
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
      </div>
    );
}

function OrderTotal({ totalFinalPrice, phoneNumber }) {

    return (
        <PaymentGateway finalAmount={totalFinalPrice} phoneNumber={phoneNumber} />
    )
}

export default function OrderDetails({location}) {
    return (
        <div className="order-details-section">
            <div className="order-details-section-header">
                <div className="section-title">Order Details</div>
                <div className="section-subtitle">Finalize the cart before payment</div>
            </div>
            <OrderItems phoneNumber={location.state.phoneNumber} />
        </div>
    )
}