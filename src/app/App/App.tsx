import Playground from "~/entities/Playground";
import FormInfo from "~/entities/FormInfo";
import styles from "./App.module.scss";

export default function App() {
  return (
    <div data-component="App" className={styles.App}>
      <Playground className={styles.AppFormInfo} />
      <FormInfo className={styles.AppPlayground} />
    </div>
  );
}
