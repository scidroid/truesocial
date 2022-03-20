import { Button } from "@mantine/core";
import { getProfile, setProfile } from "../../utils/profile";
import DeSoButton from "../DeSoButton";
import styles from "./Hero.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

const Hero = () => {
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    const profile = getProfile();
    setProfileData(profile);
  }, []);

  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>The world's most advanced Social Network</h1>
      <p className={styles.subtitle}>Hosted in the blockchain</p>
      {profileData === null ? (
        <DeSoButton
          className={styles.button}
          size={"lg"}
          onSuccess={(e) => setProfile(e)}
          onFailure={(e) => console.error(e)}
        >
          Login with DeSo
        </DeSoButton>
      ) : (
        <Link href="/app" passHref>
          <Button className={styles.button} size={"lg"} component="a">
            Enter to the app
          </Button>
        </Link>
      )}
    </section>
  );
};

export default Hero;
