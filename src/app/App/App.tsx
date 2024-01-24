import Playground from "~/entities/Playground";
import styles from "./App.module.scss";

export default function App() {
  return (
    <div data-component="App" className={styles.App}>
      <Playground />
    </div>
  );
}
