import NavBar from "../../comps/navbar/navbar.comp";
import { SideBar } from "../../comps/sidebar/sidebar";
import { useAuthState } from "../../context/auth";
import styles from "./profile.module.scss";
import {FaUserCircle} from 'react-icons/fa'

export const ProfileView = () => {
  const { me } = useAuthState();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <SideBar />
      <NavBar />
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.profile}>
            <FaUserCircle className={styles.image}/>
            {/* <img src={"/assets/icons/profileIcon.svg"} className={styles.image} alt="profile" /> */}
            <h3>
              {me?.first_name} {me?.last_name}
            </h3>
            <p>{me.email}</p>
          </div>
          <div className={styles.cards}>
          <div>
            <h3>Address</h3>
            <p>{me?.address}</p>
          </div>
          <div>
            <h3>Phone</h3>
            <p>{me?.phone}</p>
          </div>
          <div>
            <h3>Alternate Phone</h3>
            <p>{me?.phone}</p>
          </div>
          <div>
            <h3>Member Type</h3>
            <p>{me?.member_type}</p>
          </div>
          <div onClick={handlePrint}>
            <h3>Print </h3>
            <p>Print your profile page</p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
