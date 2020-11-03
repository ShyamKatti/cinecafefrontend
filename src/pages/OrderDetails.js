import React, { useState, useEffect } from 'react';
import { useFinalItemAmount } from '../common/usePriceDetails';
import '../css/orderdetails.scss';
import { PaymentGateway } from './Payment';
import foodAppConstants from '../common/urls';
import {postData} from "../common/ApiUtils";

function handleSubtract(event, setQuantity) {
    event.preventDefault();
    setQuantity((prevState) => {
        if (prevState > 0) {
            return prevState - 1;
        } else {
            return 0;
        }
    });
}

function handleAdd(event, setQuantity) {
    event.preventDefault();
    setQuantity((prevState) => prevState + 1);
}


function OrderItem({ singleOrderItem, setTotalFinalPrice }) {
    const [quantity, setQuantity] = useState(singleOrderItem.itemQuantity);
    const price = singleOrderItem.itemPrice;
    const totalPrice = useFinalItemAmount(quantity, price, setTotalFinalPrice, singleOrderItem);

    return (
        <div className="order-item">
            <div className="order-item-name">
                {singleOrderItem.itemName}
            </div>
            <div className="order-edit-quantity">
                <button id={'subtract-quantity-' + singleOrderItem.itemId}
                    className="glyphicon glyphicon-minus subtract-button"
                    onClick={(event) => handleSubtract(
                        event,
                        setQuantity
                    )}>
                </button>
                <input id={'input-quantity-' + singleOrderItem.itemId} type="number"
                    min="0" max="10" value={quantity} className="input-quantity-field" readOnly/>
                <button id={'add-quantity-' + singleOrderItem.itemId}
                    className="glyphicon glyphicon-plus add-button"
                    onClick={(event) => {
                        handleAdd(
                            event,
                            setQuantity, singleOrderItem
                        )
                    }}>
                </button>
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
              console.log("Adding item id: " + item.itemId + ", quantity: " + item.itemQuantity);
              allPromises.push(
                postData(foodAppConstants.services.ADD_ITEM, {
                  transId: localStorage.getItem("vistaTransId"),
                  itemId: item.itemId,
                  itemQuantity: item.itemQuantity
                })
              )
          });

          Promise.all(allPromises).then((response) => {
              setAreItemsAddedToBE(true);
          }).catch((err) => {
              console.log(err);
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

export default function OrderDetails({seatDelivery, phoneNumber}) {

    return (
        <div className="order-details-section">
            <div className="order-details-section-header">
                <div className="section-title">Order Details</div>
                <div className="section-subtitle">Finalize the cart before payment</div>
            </div>
            <OrderItems phoneNumber={phoneNumber} />
        </div>
    )
}