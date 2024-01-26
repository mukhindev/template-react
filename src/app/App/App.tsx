import { MODE } from "~/shared/constants";
import styles from "./App.module.scss";

export default function App() {
  return (
    <div data-component="App" className={styles.root}>
      Hello World! MODE: {MODE}
    </div>
  );
}
