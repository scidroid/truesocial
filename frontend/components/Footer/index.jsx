import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p
        className={styles.text}
      >{`©️ ${new Date().getFullYear()} TrueSocial`}</p>
    </footer>
  );
};

export default Footer;
