import React, { useState, useEffect } from 'react';
import './quantityfield.scss';
import usePrevious from '../../common/use-previous';


function QuantityField({
        onItemQuantityChange,
        fieldId,
        itemName,
        itemPrice,
        maxQuantity=10,
        minQuantity=0,
        localStorageQuantity=0
    }) {
    const [quantity, setQuantity] = useState(localStorageQuantity);
    const prevQuantity = usePrevious(quantity);

    const onSubtractBtnClick = (event) => {
        event.preventDefault();

        setQuantity((prevState) => {
            return prevState > minQuantity ? (prevState - 1) : minQuantity;
        });
    };

    const onAddBtnClick = (event) => {
        event.preventDefault();

        setQuantity((prevState) => {
            return prevState < maxQuantity ? (prevState + 1) : maxQuantity;
        });
    };

    useEffect(() => {
        if (prevQuantity !== undefined && prevQuantity !== quantity) {
            onItemQuantityChange(fieldId, quantity, itemName, itemPrice);
        }
    }, [quantity, prevQuantity, onItemQuantityChange, fieldId, itemName, itemPrice]);

    return (
        <div className="editable-quantity-field">
            <button id={'subtract-btn-' + fieldId}
                    className={quantity > 0 ? "glyphicon glyphicon-minus editable-field-subtract-btn" : "quantity-ctrl-nd"}
                    onClick={onSubtractBtnClick}>
            </button>
            <div className="input-quantity-container">
                {quantity > 0 && <span className="quantity-value">{quantity}</span>}
                {quantity === 0 && <div className="add-value" onClick={onAddBtnClick}>ADD</div>}
            </div>
            <button id={"add-btn-" + fieldId}
                    className={quantity > 0 ? "glyphicon glyphicon-plus editable-field-add-btn" : "quantity-ctrl-nd"}
                    onClick={onAddBtnClick}>
            </button>
        </div>
    )


}

export default QuantityField;