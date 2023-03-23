import { MODE } from "@/constants";
import styles from "./App.module.scss";

export default function App() {
  return <div className={styles.root}>Hello World! MODE: {MODE}</div>;
}
