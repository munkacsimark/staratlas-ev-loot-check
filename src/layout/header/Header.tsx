import ThemeToggle from "../../components/theme-toggle/ThemeToggle";
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Title</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
