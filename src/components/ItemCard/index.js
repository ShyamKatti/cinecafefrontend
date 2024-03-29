import React,  {useState, useEffect} from "react";
import "./itemcard.css";
import QuantityField from '../QuantityField/QuantityField';


const ItemCard = (props) => {
  const [imageSrc, setImageSource] = useState(null);
  useEffect(() => {
    if (props.vegOnly) {
      setImageSource('https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/vegicon.png');
    } else {
      setImageSource('https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/non-veg.png');
    }
  }, [props.vegOnly]);
    return (
        <div className="item-card">
            <div className="item-info">
                <span>{(props.vegOnly) ?
                    (<img src={imageSrc} alt="Veg Items" className="non-veg-icon" />)
                    :
                    (<img src={imageSrc} alt="Non-Veg Items" className="non-veg-icon" />)
                }<h5 className="item-label">{props.title}</h5>
                </span>
                <span className="price-label">&#8377;{props.price / 100}</span>
                <p className="item-description">{props.description}</p>
            </div>
            <QuantityField fieldId={props.id} itemName={props.title} itemPrice={props.price}
                           onItemQuantityChange={props.onItemQuantityChange}
                            localStorageQuantity={props.localStorageQuantity}/>
        </div>
    );
};




export default ItemCard; 