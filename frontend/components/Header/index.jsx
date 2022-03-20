import DeSoButton from "../DeSoButton";
import styles from "./Header.module.css";
import { getProfile, setProfile, deleteProfile } from "../../utils/profile";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";

const AuthButton = (props) => {
  const [profileData, setProfileData] = useState("loading");

  useEffect(() => {
    const profile = getProfile();
    setProfileData(profile);
  });

  if (profileData === "loading") {
    return <Button {...props}>Loading...</Button>;
  }

  if (profileData === null) {
    return (
      <DeSoButton
        onSuccess={(e) => setProfile(e)}
        onFailure={(e) => console.error(e)}
        {...props}
      >
        Login with DeSo
      </DeSoButton>
    );
  }

  return (
    <Button onClick={() => deleteProfile()} {...props}>
      Log out
    </Button>
  );
};

const Header = () => {
  return (
    <header className={styles.header}>
      <p className={styles.title}>TrueSocial</p>
      <AuthButton size={"lg"} />
    </header>
  );
};

export default Header;
