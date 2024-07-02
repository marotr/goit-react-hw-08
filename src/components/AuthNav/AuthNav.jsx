import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const AuthNav = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.nav}>
      {!isLoggedIn && (
        <>
          <NavLink className={css.link} to="/register">
            Register
          </NavLink>
          <NavLink className={css.link} to="/login">
            Log In
          </NavLink>
        </>
      )}
    </div>
  );
};

export default AuthNav;
