import Avatar from "../avatar/Avatar";
import styles from "./UserCard.module.css";
import { Link } from "react-router-dom";

const UserCard = ({ key, user, onClose }) => {
  return (
    <Link
      onClick={onClose}
      to={`/${user?._id}`}
      key={key}
      className={styles.cardWrapper}
    >
      <div>
        <Avatar
          userId={user?._id}
          width={50}
          name={user?.name}
          imgUrl={user.profile}
        />
      </div>
      <div>
        <h3>{user?.name}</h3>
      </div>
    </Link>
  );
};

export default UserCard;
