import React from "react";
import "./style.css";


function FilterMenuItems(props) {
    return (
        <div className="mb-3 filterMenu">
            {/* <p id="filter-text" className="font-weight-bold">Filters: </p> */}
            <input type="image"  className="btn category-btn p-1 ml-1 mr-1" id="pizzaFilter"
                   src="https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/pizza-slice.png"
                   alt="Pizza Filter" onClick={event => { props.handleEventFilter("pizza", event) }} />
            <input type="image"  className="btn category-btn p-1 ml-1 mr-1" id="dessertFilter"
                   src="https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/cake-pop.png"
                   alt="dessert Filter" onClick={event => { props.handleEventFilter("desserts", event) }} />
            <input type="image"  className="btn category-btn p-1 ml-1 mr-1" id="sandwichFilter"
                   src="https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/sandwich_1.png"
                   alt="Sandwich Filter" onClick={event => { props.handleEventFilter("sandwiches", event) }} />
            <input type="image"  className="btn category-btn p-1 ml-1 mr-1" id="wrapsFilter"
                   src="https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/wrap.png"
                   alt="Wraps Filter" onClick={event => { props.handleEventFilter("wraps", event) }} />
            <input type="image"  className="btn category-btn p-1 ml-1 mr-1" id="beverageFilter"
                   src="https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/drink.png"
                   alt="Beverage Filter" onClick={event => { props.handleEventFilter("beverages", event) }} />
            <input type="image"  className="btn category-btn p-1 ml-1 mr-1" id="popcornFilter"
                   src="https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/popcorn.png"
                   alt="Popcorn Filter" onClick={event => { props.handleEventFilter("concessions", event) }} />
        </div>
    )

}

// export the component so it can be used by other files
export default FilterMenuItems;