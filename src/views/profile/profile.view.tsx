import NavBar from "../../comps/navbar/navbar.comp";
import { SideBar } from "../../comps/sidebar/sidebar";
import styles from "./profile.module.scss";

export const ProfileView = () => {

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contents}>
          <p>Content here</p>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
