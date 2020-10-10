import React from "react";
import "./style.css";


function FilterMenuItems(props) {

    return (
        <div className="mb-3 filterMenu">
            {/* <p id="filter-text" className="font-weight-bold">Filters: </p> */}
            <input type="image"  className="btn category-btn p-1 ml-1 mr-1" id="pizzaFilter" src="/assets/images/pizza@3x.png " alt="Pizza Filter" onClick={event => { props.handleEventFilter("Pizza", event) }} />
            <input type="image"  className="btn category-btn p-1 ml-1 mr-1" id="dessertFilter" src="/assets/images/cake-pop.png " alt="dessert Filter" onClick={event => { props.handleEventFilter("Dessert", event) }} />
            <input type="image"  className="btn category-btn p-1 ml-1 mr-1" id="sandwichFilter" src="/assets/images/sandwich@3x.png " alt="Sandwich Filter" onClick={event => { props.handleEventFilter("Sandwich", event) }} />
            <input type="image"  className="btn category-btn p-1 ml-1 mr-1" id="wrapsFilter" src="/assets/images/wrap.png " alt="Wraps Filter" onClick={event => { props.handleEventFilter("Wraps", event) }} />
            <input type="image"  className="btn category-btn p-1 ml-1 mr-1" id="pizzaFilter" src="/assets/images/drink.png " alt="Beverage Filter" onClick={event => { props.handleEventFilter("Beverage", event) }} />
         
           
        </div>
    )

}

// export the component so it can be used by other files
export default FilterMenuItems;