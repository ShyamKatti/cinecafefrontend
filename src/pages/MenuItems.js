import React, { PureComponent } from 'react';
import ItemCard from '../components/ItemCard/index';
import FilterMenuItems from '../components/FilterMenuItems';
import ToggleSwitch from '../components/ToggleSwitch';
import SearchBox from "../components/SearchBox";
import NavBar from './NavBar';


class MenuItems extends PureComponent {
    constructor() {
        super();
        this.state = {
            menuList: [],
            filteredItems: [],
            totalCount: 0,
            totalAmount: 0,
            isVeg: false,
            isFilteredByCategory: '',
            cartItems: {},
            isLoading: false
        };
        this.onSuccessMenuLoad = this.onSuccessMenuLoad.bind(this);
        this.handleLocalStorageUpdates = this.handleLocalStorageUpdates.bind(this);
    }

    onItemQuantityChange = (menuItemId, quantity, menuItemName, menuItemPrice) => {

        let itemProps = this.state.cartItems;

        if (quantity > 0) {
            itemProps[menuItemId] = {
                itemId: menuItemId,
                itemQuantity: quantity,
                itemName: menuItemName,
                //convert the price to paise 
                itemPrice: menuItemPrice
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
        localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
    };

    onSuccessMenuLoad = (loadResponse) => {
        const fileReader = loadResponse.body.getReader();
        const textDecoder = new TextDecoder('utf-8');
        let menuList = [];

        return fileReader.read().then((fileContent) => {
            const allRows = textDecoder.decode(fileContent.value).split("\n");
            allRows.forEach(function(rowStr, index) {
                if (index > 0) {
                  const rowTokens = rowStr.split(",");
                  if (rowTokens[6].trim() === 'Y') {
                    menuList.push({
                      id: rowTokens[0],
                      title: rowTokens[1],
                      category: rowTokens[2],
                      vegOnly: rowTokens[3] === 'Y',
                      price: rowTokens[4] * 100,
                      labels: rowTokens[5].split("|"),
                      isActive: rowTokens[6] === 'Y'
                    });
                  }
                }
            });
            this.setState({
                menuList: menuList,
                filteredItems: menuList
            });
        });

    };

    handleLocalStorageUpdates = () => {
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

    componentDidUpdate = () => {
        let totalCost = 0;
        Object.values(this.state.cartItems).forEach((item) => {
            totalCost += (item.itemQuantity * item.itemPrice);
        });
        this.setState({
          totalAmount: totalCost / 100
        });
    };

    componentDidMount = () => {
        fetch("./data/menu.csv").then((loadResponse) => {
            this.onSuccessMenuLoad(loadResponse).then(() => {
                this.handleLocalStorageUpdates();
            }).catch((err) => console.warn(err));
        }).catch((err) => {
            console.warn(err);
        });
    };

    //Switch Veg Only ON / OFF
    handleToggle = (e) => {
        let isChecked = e.target.checked;
        this.setState({ checked: isChecked });
        if (isChecked) {
            let filterArr = this.state.menuList.filter(row => row.vegOnly === isChecked);
            this.setState({
                menuList: filterArr,
                filteredItems: filterArr
            })
        }
    };

    //Based on search filter records 
    handleSearchChange = event => {
        const filter = event.target.value ? event.target.value.toLowerCase() : '';
        if (filter.length > 1) {
            const filteredList = this.state.menuList.filter(item => {
                return item.title.toLowerCase().indexOf(filter) > -1 ||
                  item.labels.filter(
                    (label) =>
                      label.toLowerCase().indexOf(filter) > -1).length > 0
            });
            this.setState({
                filteredItems: filteredList
            });
        } else if (filter.length === 0){
            this.setState({
              filteredItems: this.state.menuList
            });
        } else {
            // Do nothing
        }
    };

    handleEventFilter = (category) => {
        if (this.state.isFilteredByCategory.length === 0 || this.state.isFilteredByCategory !== category) {
            let filterArr = this.state.menuList.filter(row => row.category === category);
            this.setState({
                filteredItems: filterArr,
                isFilteredByCategory: category
            })
        } else {
            //reset Filter 
            this.setState({
                filteredItems: this.state.menuList,
                isFilteredByCategory: ''
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