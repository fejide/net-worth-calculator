import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <header className="site-header">
            <nav className="navbar" aria-label="Primary navigation">
                <NavLink to="/" className="brand">
                    Net Worth + Budget Calculator 
                </NavLink>

                <div className="nav-links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/net-worth">Net Worth</NavLink>
                    <NavLink to="/budget">Budget</NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;