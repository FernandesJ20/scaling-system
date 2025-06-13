import styles from "./MyTextList.module.css";
import { MyText } from "./MyText";

export function MyTextList() {
  const texts = [
    { title: "Meu titulo", text: "meu texto" },
    { title: "Meu titulo", text: "meu texto" },
    { title: "Meu titulo", text: "meu texto" },
    { title: "Meu titulo", text: "meu texto" },
  ]; // array de objetos com texto e título

  return (
    <>
      <h1 className={styles.title}>Lista de Textos</h1>
      <div className={styles.container}>
        {texts.map((obj, index) => {
          return (
            <MyText key={index} title={`${obj.title} ${index + 1}`}>
              {`${obj.text} ${index + 1}`}
            </MyText>
          );
        })}
      </div>
    </> // Abrimos {} para podermos programar em JS dentro do JSX
  );
}