import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { stack as Menu } from 'react-burger-menu';


class NavBar extends Component {
    // const [expanded, setExpanded] = useState(false);
    render() {
        return (
            <div className="navigation-container">
                <div className="solid-bar"></div>
                <nav className="Nav">
                    <div className="Nav__container">
                        <NavLink to="/" className="Nav__brand_logo">
                            <img src="/assets/images/bmx_logo.png" id="logoIcon" alt="Balaji Logo" />
                        </NavLink>
                        <NavLink to="/food" className="nav-shopping-cart">
                            <img src="/assets/images/servingdish.png" id="servingDish" alt="Shopping Cart" />
                        </NavLink>
                    </div>
                </nav>
            </div>
        )
    };
}

export default NavBar;