import React from "react";
import styles from "./styles.module.scss";

const Navbar: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <h1 className={styles.title}>Chat</h1>
      </div>
    </div>
  );
};

export default Navbar;
