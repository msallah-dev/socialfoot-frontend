import { useContext, useEffect, useState } from "react";
import { StatusContext } from "./AppContext";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";
import type { RootState } from "../main";

const NavBar = () => {
  const status = useContext(StatusContext);
  const [name, setName] = useState<string>('');
  const userData = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    if (userData) setName(userData.name);

  }, [userData])

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <img src="./images/logo.png" alt="icon" />
              <h3>SocialFoot</h3>
            </div>
          </NavLink>
        </div>
        {status ?
          <ul>
            <li className="welcome">
              <NavLink to="/profil">
                <h5> Bienvenue {name} </h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
          :
          <ul>
            <li>
              <NavLink to="/profil">
                <img src="./images/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        }
      </div>
    </nav>
  );
};

export default NavBar;
