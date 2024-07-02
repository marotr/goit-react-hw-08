import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/auth/operations";

import css from './Navigation.module.css';




const Navigation = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); 
    };

    return (
        <nav className={css.nav}>
            <NavLink className={css.link} to="/">Home</NavLink>
            {isLoggedIn ? (
                <>
                    <NavLink className={css.link} to="/contacts">Contacts</NavLink>
                    <button  className={css.logout} onClick={handleLogout}>Log out</button>
                </>
            ) : null}
        </nav>
    );
};

export default Navigation;
