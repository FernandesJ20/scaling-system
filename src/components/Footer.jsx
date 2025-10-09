import styles from "./Footer.module.css";
import { Github, Instagram, Phone, BookOpenCheck } from "lucide-react";

export function Footer() {
  
  return (
   <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerText}>
            <h1>IFRN - Campus Macau</h1>
            <h1>Curso Técnico em Informática</h1>
            <h1>Programação para Internet 2025</h1>
          </div>
          <div>
            <p>Julia Fernandes</p>
          </div>
          <div className={styles.icons}>
            <a href="https://github.com/FernandesJ20" target="_blank">
              <Github />
            </a>
            <a href="https://instagram.com/juliaf17_/" target="_blank">
              <Instagram />
            </a>
            <a href="tel:+558498763317" target="_blank">
              <Phone />
            </a>
          </div>
        </div>
      </footer>
  );
}