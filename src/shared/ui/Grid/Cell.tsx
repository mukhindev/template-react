import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import { clsx } from "clsx";
import { useGrid } from "./Grid";
import styles from "./Cell.module.scss";

export interface CellProps extends HTMLAttributes<HTMLDivElement> {
  /** Положение по x (вдоль строки) */
  x?: number;
  /** Положение по y (вдоль строки) */
  y?: number;
  /** Число на сколько колонок сетки расширяться. -1 = на всю ширину */
  columns?: number;
  /** Число на сколько строк сетки расширяться. -1 = на всю высоту */
  rows?: number;
}

/** Ячейка сетки */
export default forwardRef(function Cell(
  props: PropsWithChildren<CellProps>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    columns,
    rows,
    x,
    y,
    children,
    className,
    style,
    "data-component": dataComponent,
    ...divProps
  } = props;

  const { columns: gridColumns, rows: gridRows } = useGrid();

  let gridColumn =
    columns !== undefined
      ? columns > -1
        ? `span ${columns <= (gridColumns ?? Infinity) ? columns : gridColumns}`
        : `span ${gridColumns}`
      : `span 1`;

  let gridRow =
    rows !== undefined
      ? rows > -1
        ? `span ${rows <= (gridRows ?? Infinity) ? rows : gridRows}`
        : `span ${gridRows}`
      : `span 1`;

  if (x !== undefined) {
    gridColumn = `${x + 1} / ${gridColumn}`;
  }

  if (y !== undefined) {
    gridRow = `${y + 1} / ${gridRow}`;
  }

  return (
    <div
      data-component={!dataComponent ? "Cell" : `Cell/${dataComponent}`}
      className={clsx(styles.Cell, className)}
      ref={ref}
      style={{
        "--grid-column": gridColumn,
        "--grid-row": gridRow,
        ...style,
      }}
      {...divProps}
    >
      {children}
    </div>
  );
});
