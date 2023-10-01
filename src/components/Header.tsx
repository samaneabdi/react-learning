
import { Link } from "react-router-dom";
import HeaderBadge from "./HraderBadge";

const Header = () =>{
    return (
        <header className="App-header">
        <div>
          <li>
            <Link to="/Cats"> Cats</Link>
          </li>
          <li>
            <Link to="/Todos"> Todos</Link>
          </li>
          <li>
            <Link to="/Products"> Products</Link>
          </li>
        </div>
      <HeaderBadge/>
      </header>
    )
}
export default Header;