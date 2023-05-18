import { Link, Page, Text } from "@geist-ui/core";
import { HeartFill } from "@geist-ui/icons";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <Page.Footer>
      <Text className={styles.footerText}>
        Made with{" "}
        <HeartFill size="16" className={styles.heart} color="#f5a623" />{" "}
        by&nbsp;{" "}
        <Link href="https://codermark.dev/" target="_blank" underline>
          me
        </Link>
        .
      </Text>
    </Page.Footer>
  );
};

export default Footer;
