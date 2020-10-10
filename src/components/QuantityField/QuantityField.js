import React, { useState, useEffect } from 'react';
import './quantityfield.scss';
import usePrevious from '../../common/use-previous';


function QuantityField({onItemQuantityChange, fieldId, maxQuantity=10, minQuantity=0}) {
    const [quantity, setQuantity] = useState(0);
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
            onItemQuantityChange(fieldId, quantity);
        }
    }, [quantity, prevQuantity, onItemQuantityChange, fieldId]);

    return (
        <div className="editable-quantity-field">
            <button id={'subtract-btn-' + fieldId}
                    className="glyphicon glyphicon-minus editable-field-subtract-btn"
                    onClick={onSubtractBtnClick}>
            </button>
            <div className="input-quantity-container">
                {quantity > 0 && <span className="quantity-value">{quantity}</span>}
                {quantity === 0 && <span className="add-value">ADD</span>}
            </div>
            <button id={"add-btn-" + fieldId}
                    className="glyphicon glyphicon-plus editable-field-add-btn"
                    onClick={onAddBtnClick}>
            </button>
        </div>
    )


}

export default QuantityField;