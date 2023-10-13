import {
  createContext,
  useContext,
  forwardRef,
  ForwardedRef,
  HTMLAttributes,
} from "react";
import { clsx } from "clsx";
import styles from "./Grid.module.scss";

type GridContextValue = {
  columns?: number;
  rows?: number;
};

const GridContext = createContext<GridContextValue>({
  columns: undefined,
  rows: undefined,
});

export const useGrid = () => useContext(GridContext);

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Кол-во колонок в сетке (x) */
  columns?: number;
  /** Кол-во строк в сетке (y) */
  rows?: number;
  /** Размер промежутков сетки */
  gap?: number | string;
  "data-component"?: string;
}

/** Сетка с колонками (x) и строками (y) */
export default forwardRef(function Grid(
  props: GridProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    columns,
    rows,
    children,
    gap,
    className,
    style,
    "data-component": dataComponent,
    ...divProps
  } = props;

  const templateColumns =
    columns !== undefined ? `repeat(${columns}, 1fr)` : undefined;

  const templateRows = rows !== undefined ? `repeat(${rows}, 1fr)` : undefined;

  return (
    <div
      data-component={!dataComponent ? "Grid" : `Grid/${dataComponent}`}
      className={clsx(styles.Grid, className)}
      ref={ref}
      style={{
        "--template-columns": templateColumns,
        "--template-rows": templateRows,
        "--gap": typeof gap === "number" ? `${gap}px` : gap,
        ...style,
      }}
      {...divProps}
    >
      <GridContext.Provider
        value={{
          columns,
          rows,
        }}
      >
        {children}
      </GridContext.Provider>
    </div>
  );
});
