import React, {useState} from 'react';
import {useFinalItemAmount} from '../common/usePriceDetails';
import '../css/orderdetails.scss';
import {PaymentGateway} from './Payment';

const order_dump = [
    {
        itemId: '1',
        itemName: 'Paneer Chilly Wrap',
        itemQuantity: 1,
        itemPrice: 19925
    },
    {
        itemId: '2',
        itemName: 'Chicken Samosa',
        itemQuantity: 4,
        itemPrice: 4900,
    },
    {
        itemId: '3',
        itemName: 'Popcorn',
        itemQuantity: 2,
        itemPrice: 9900
    }
];

function handleSubtract(event, setQuantity) {
    event.preventDefault();
    setQuantity((prevState) => {
        if (prevState > 0) {
            return prevState - 1;
        } else {
            return 0;
        }
    });
};

function handleAdd(event, setQuantity) {
    event.preventDefault();
    setQuantity((prevState) => prevState + 1);
};


function OrderItem({singleOrderItem, setTotalFinalPrice}) {
    const [quantity, setQuantity] = useState(singleOrderItem.itemQuantity);
    const price = singleOrderItem.itemPrice;
    const totalPrice = useFinalItemAmount(quantity, price, setTotalFinalPrice);

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
                       min="0" max="10" value={quantity} className="input-quantity-field"/>
                <button id={'add-quantity-' + singleOrderItem.itemId}
                        className="glyphicon glyphicon-plus add-button"
                        onClick={(event) => {handleAdd(
                            event,
                            setQuantity
                        )}}>
                </button>
            </div>
            <div className="order-total-price">{totalPrice}</div>
        </div>
    )
}

function OrderItems() {

    const [totalFinalPrice, setTotalFinalPrice] = useState(0);

    return (
        <div className="order-details">
            <div className="order-items">
                {
                    order_dump.map((item) => {
                        return <OrderItem
                            singleOrderItem={item}
                            setTotalFinalPrice={setTotalFinalPrice}
                            key={'key-' + item.itemId}
                        />
                    })
                }
            </div>
            <div className="order-total-section">
                <OrderTotal totalFinalPrice={totalFinalPrice} />
            </div>
        </div>
    );
};

function OrderTotal({totalFinalPrice}) {
    return (
        <PaymentGateway finalAmount={totalFinalPrice} />
    )
}

export default function OrderDetails() {

    return (
        <div className="order-details-section">
            <div className="order-details-section-header">
                <div className="section-title">Order Details</div>
                <div className="section-subtitle">Finalize the cart before payment</div>
            </div>
            <OrderItems />
        </div>
    )
}