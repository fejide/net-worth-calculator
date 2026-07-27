import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/net-worth">Net Worth</Link> |{" "}
      <Link to="/budget">Budget</Link>
    </nav>
  );
}

export default Navbar;