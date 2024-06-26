import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../redux/auth/selectors";
import css from './UserMenu.module.css';
import { logout } from "../../redux/auth/operations";

const UserMenu = () => {
const dispatch = useDispatch();
const {user} = useSelector (selectUser);

return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.name}</p>
      <button type="button" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  );
}

export default UserMenu