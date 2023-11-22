import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const currentPath = useLocation().pathname;

    return (
        <nav className="navbar header-bg p-2">
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                    <Link to="/home" className={currentPath === '/home' ? 'nav-link active' : 'nav-link'}>
                        Add Product
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/products" className={currentPath === '/products' ? 'nav-link active' : 'nav-link'}>
                        View Products
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;