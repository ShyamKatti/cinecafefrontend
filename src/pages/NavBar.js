import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import HamburgerMenu from '../components/hamburger-menu/HamburgerMenu';


function NavBar({totalCount, showMenu}) {
    const [totalItemCount] = useState(totalCount);
    const [cartItemsAdded, setCartItemsAdded] = useState(totalItemCount > 0);

    useEffect(() => {
      setCartItemsAdded(totalCount > 0);
    }, [totalCount]);

    return (
        <div className="navigation-container">
            <nav className="Nav">
                <div className="Nav__container">
                  {showMenu ? <HamburgerMenu /> : <label /> }
                    <NavLink to="/" className="Nav__brand_logo">
                        <img src="/assets/images/bmx_logo.png" id="logoIcon" alt="Balaji Logo" />
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;