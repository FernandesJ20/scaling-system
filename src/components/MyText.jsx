import styles from "./MyText.module.css";

export function MyText({ title, children }) {
  // Desestruturação de props
  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{children}</p>
      </div>
    </div> // uso de classes e filhos para inserção de texto, title = classe e children = filho
  );
}