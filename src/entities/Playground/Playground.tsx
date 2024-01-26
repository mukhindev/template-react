import { clsx } from "clsx";
import styles from "./Playground.module.scss";

interface PlaygroundProps {
  className?: string;
}

export default function Playground(props: PlaygroundProps) {
  const { className } = props;

  return (
    <div
      data-component="Playground"
      className={clsx(styles.Playground, className)}
    >
      Playground
    </div>
  );
}
