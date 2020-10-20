import React from "react";
import "./itemcard.css";
import QuantityField from '../QuantityField/QuantityField';


const ItemCard = (props) => {
    return (
        <div className="item-card">
            <div className="item-info">
                <span>{(props.vegOnly) ?
                    (<img src="/assets/images/vegicon.png" alt="Veg Items" className="non-veg-icon" />)
                    :
                    (<img src="/assets/images/non-veg.png" alt="Non-Veg Items" className="non-veg-icon" />)
                }<h5 className="item-label">{props.title}</h5>
                </span>
                <span className="price-label">&#8377;{props.price}</span>
                <p className="item-description">{props.description}</p>
            </div>
            <QuantityField fieldId={props.id} itemName={props.title} itemPrice={props.price}
                           onItemQuantityChange={props.onItemQuantityChange}
                            localStorageQuantity={props.localStorageQuantity}/>
        </div>
    );
};




export default ItemCard; 