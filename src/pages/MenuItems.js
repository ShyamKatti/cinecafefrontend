import React, { PureComponent } from 'react';
import ItemCard from '../components/ItemCard/index';
import menuList from "../data/menu.json";
import FilterMenuItems from '../components/FilterMenuItems';
import ToggleSwitch from '../components/ToggleSwitch';
import SearchBox from "../components/SearchBox";
import NavBar from './NavBar';


class MenuItems extends PureComponent {
    //Default Values
    state = {
        menuList,
        filteredItems: menuList,
        totalCount: 0,
        totalAmount: 0,
        isVeg: false,
        isFilteredByCategory: false,
        cartItems: {}
    };

    onItemQuantityChange = (menuItemId, quantity, menuItemName, menuItemPrice) => {

        let itemProps = this.state.cartItems;

        if (quantity > 0) {
            itemProps[menuItemId] = {
                itemId: menuItemId,
                itemQuantity: quantity,
                itemName: menuItemName,
                //convert the price to paise 
                itemPrice: (menuItemPrice * 100)
            };
        } else {
            delete itemProps[menuItemId];
        }
        //Total all items on the icon
        let totalItems = Object.keys(this.state.cartItems).map(function (key) {
            return this[key].itemQuantity
        }, this.state.cartItems).reduce(function (previous, current) {
            return previous + current;
        }, 0);

        this.setState({ cartItems: itemProps, totalCount: totalItems });
    };

    componentDidUpdate = () => {
        console.log("componentDidUpdate");
        localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
        let totalCost = 0;
        Object.values(this.state.cartItems).forEach((item) => {
            totalCost += (item.itemQuantity * item.itemPrice);
        });
        this.setState({
          totalAmount: totalCost / 100
        });
    };
    componentDidMount = () => {
        console.log("componentDidMount");
        let localStorageItems = JSON.parse(localStorage.getItem('cartItems'));
        if (localStorageItems === null) { localStorageItems = {}; }
        //Total all items on the icon
        let totalItems = Object.keys(localStorageItems).map(function (key) {
            return this[key].itemQuantity
        }, localStorageItems).reduce(function (previous, current) {
            return previous + current;
        }, 0);

        this.setState({
            cartItems: localStorageItems,
            totalCount: totalItems
        });
    };

    //Switch Veg Only ON / OFF
    handleToggle = (e) => {
        let isChecked = e.target.checked;
        this.setState({ checked: isChecked });
        if (isChecked) {
            let filterArr = menuList.filter(row => row.vegOnly === isChecked);
            this.setState({
                menuList: filterArr,
                filteredItems: filterArr
            })
        } else {
            //if unchecked, remove from filterArr and unfilter the list

            this.setState({
                menuList: menuList,
                filteredItems: menuList
            })
        }
    };

    //Based on search filter records 
    handleSearchChange = event => {
        const filter = event.target.value;
        const filteredList = this.state.filteredItems.filter(item => {
            // merge data together, then see if user input is anywhere inside
            let values = Object.values(item)
                .join("")
                .toLowerCase();

            return values.indexOf(filter.toLowerCase()) !== -1;
        });
        //reset filter 
        if (filter === '') {
            this.setState({
                filteredItems: menuList
            });
        } else {
            this.setState({
                filteredItems: filteredList, menuList: filteredList
            });
        }
    };

    handleEventFilter = (category) => {
        if (!this.state.isFilteredByCategory) {
            let filterArr = menuList.filter(row => row.category === category);
            this.setState({
                menuList: filterArr,
                filteredItems: filterArr,
                isFilteredByCategory: true
            })
        } else {
            //reset Filter 
            this.setState({
                filteredItems: menuList,
                isFilteredByCategory: false
            });
        }
    };

    handleCategories = (items) => {
        //incase of null value in localstoage  replace  it will null value
        const localStorageContent = JSON.parse(localStorage.getItem('cartItems')) || {};
        var groupedItems = items.reduce((r, item) => {
            const {
                category,
                title,
                price, vegOnly, id, description, labels, incrementCount, decrementCount, quantity
            } = item;

            r[category] = [...r[category] || [], {
                title,
                price, vegOnly, id, description, labels, incrementCount, decrementCount, quantity
            }];

            return r;
        }, {});

        return Object.keys(groupedItems).map((key, index) => (
            <div key={index} className="menuCard">
                <h3 className="categoryHeader">{key}</h3>
                {
                    groupedItems[key].map((menuItem) => (
                        <ItemCard
                            id={menuItem.id}
                            key={menuItem.id}
                            title={menuItem.title}
                            price={menuItem.price}
                            description={menuItem.description}
                            labels={menuItem.labels}
                            vegOnly={menuItem.vegOnly}
                            onItemQuantityChange={this.onItemQuantityChange.bind(this)}
                            quantity={menuItem.quantity}
                            localStorageQuantity={menuItem.id in localStorageContent ? localStorageContent[menuItem.id].itemQuantity : 0}
                        />))
                }
            </div>
        ));
    };

    handleContinueBtn = (event) => {
        event.preventDefault();
        this.props.history.push("/auth");
    };

    render() {
        return (
            <div className="menu-container">
                <div className="fixed-sub-container">
                    <NavBar totalCount={this.state.totalCount} showMenu={true}/>
                    <SearchBox handleSearchChange={this.handleSearchChange} />
                    <FilterMenuItems handleEventFilter={this.handleEventFilter}
                        handleResetFilter={this.handleResetFilter} />
                    <ToggleSwitch
                        isChecked={this.state.checked}
                        handleToggle={this.handleToggle} />
                </div>

                {this.state.filteredItems.length > 0 ? (
                    <div className="menu-items-content">
                        {this.handleCategories(this.state.filteredItems)}
                    </div>) : (
                        <div className="menu-items-content">
                            {/* {console.log("FL ", this.state.filteredItems.length)} */}
                             <h3 className="no-result-message mt-5">No matches found!!!</h3>
                        </div>
                    )
                }

                <div className="continue-footer">
                  <div className="left-side-continue">
                    <div className="footer-total-items">
                      {this.state.totalCount}
                      <span className="quantity-unit-text">{this.state.totalCount === 1 ? "item" : "items"}</span>
                    </div>
                    <div className="footer-total-price">{this.state.totalAmount}</div>
                  </div>
                  <div className="right-side-continue">
                    <button className="continue-button" onClick={this.handleContinueBtn}>Continue</button>
                  </div>
                </div>

            </div >
        )
    }
}

export default MenuItems;