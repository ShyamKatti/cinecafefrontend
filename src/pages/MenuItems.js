import React, { Component } from 'react';
import ItemCard from '../components/ItemCard/index';
import menuList from "../data/menu.json";
import FilterMenuItems from '../components/FilterMenuItems';
import ToggleSwitch from '../components/ToggleSwitch';
import SearchBox from "../components/SearchBox";
import NavBar from './NavBar';

class MenuItems extends Component {
    //Default Values
    state = {
        menuList,
        filteredItems: menuList,
        totalCount: 0,
        isVeg: false,
        isFilteredByCategory: false,
        cartItems: {}
    };

    onItemQuantityChange = (menuItemId, quantity) => {
        let itemProps = this.state.cartItems;
        if (quantity > 0) {
            itemProps[menuItemId] = {
                itemId: menuItemId,
                itemQuantity: quantity
            };
        } else {
            delete itemProps[menuItemId];
        }
        this.setState({cartItems: itemProps});
    };

    componentDidUpdate = () => {
        localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
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
        // console.log("Searching an item", event.target.value, this.state.filteredItems.length);
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
        if(!this.state.isFilteredByCategory ){
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
   
    handleCategories =  (items) =>{

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
                {groupedItems[key].map((menuItem) => (

                <ItemCard
                    id={menuItem.id}
                    key={menuItem.id}
                    title={menuItem.title}
                    price={menuItem.price}
                    description={menuItem.description}
                    labels={menuItem.labels}
                    vegOnly={menuItem.vegOnly}
                    onItemQuantityChange={this.onItemQuantityChange.bind(this)}
                />
              ))}
            </div>
        ));
    };

    render() {
        return (
            <div className="menu-container">
                <div className="fixed-sub-container">
                    <NavBar />
                    <SearchBox handleSearchChange={this.handleSearchChange} />
                    <FilterMenuItems handleEventFilter={this.handleEventFilter}
                                     handleResetFilter={this.handleResetFilter} />
                    <ToggleSwitch
                        isChecked={this.state.checked}
                        handleToggle={this.handleToggle} />
                </div>
                <div className="menu-items-content">
                    {this.handleCategories(this.state.filteredItems)}
                </div>
            </div >
        )
    }
}

export default MenuItems;