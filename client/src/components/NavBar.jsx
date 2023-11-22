import React, { Link } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const currentPath = useLocation().pathname;

    return (
        <nav className="navbar header-bg p-2">
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                    <Link to="/" className={currentPath === '/' ? 'nav-link active' : 'nav-link'}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/AddProduct" className={currentPath === '/about' ? 'nav-link active' : 'nav-link'}>
                        Add Product
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/Products" className={currentPath === '/contact' ? 'nav-link active' : 'nav-link'}>
                        View Products
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;