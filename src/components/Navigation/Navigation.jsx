import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import css from './Navigation.module.css';
import { NavLink } from "react-router-rx";


const Navigation = () => {
    const {isLoggedIn} = useSelector(selectIsLoggedIn);
  return (
   <nav>
    <NavLink className={css.link} to="/"></NavLink>
    Home
    {isLoggedIn && (
        <NavLink className={css.link} to="/contacts">
            Contacts
        </NavLink>
    )}
   </nav>
  )
}

export default Navigation