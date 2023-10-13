import { PropsWithChildren } from "react";
import Grid, { Cell } from "~/shared/ui/Grid";
import styles from "./App.module.scss";

export default function App() {
  return (
    <div data-component="App" className={styles.App}>
      <GridColumnsDemo />
      <GridColumnsAndRowsDemo />
    </div>
  );
}

function GridColumnsDemo() {
  return (
    <Grid
      columns={8}
      style={{
        height: 128,
        backgroundColor: "#eee",
      }}
    >
      <Cell columns={2}>
        <Box color="seagreen">1</Box>
      </Cell>
      <Cell columns={4}>
        <Box color="tomato">2</Box>
      </Cell>
      <Cell columns={-1}>
        <Box color="yellow">3</Box>
      </Cell>
    </Grid>
  );
}

function GridColumnsAndRowsDemo() {
  return (
    <Grid
      columns={8}
      rows={8}
      style={{
        height: 128,
        backgroundColor: "#eee",
      }}
    >
      <Cell x={1} y={1} columns={4}>
        <Box color="seagreen">1</Box>
      </Cell>
      <Cell x={4} y={2} columns={2} rows={4}>
        <Box color="tomato">2</Box>
      </Cell>
    </Grid>
  );
}

function Box(props: PropsWithChildren<{ color?: string }>) {
  const { color, children } = props;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: color ?? "#ccc",
      }}
    >
      {children}
    </div>
  );
}
