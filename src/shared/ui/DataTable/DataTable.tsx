import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";
import { ColumnDef } from "./types";
import styles from "./DataTable.module.scss";
import { clsx } from "clsx";

interface DataTableProps<T> extends HTMLAttributes<HTMLDivElement> {
  /** Определение колонок таблицы */
  defs: ColumnDef<T>[];
  /** Массив данных для вывода. Каждый элемент — строка */
  data: T[];
}

/** Генерация таблицы из данных */
export default forwardRef(function DataTable<T>(
  props: DataTableProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { data = [], defs = [], className, ...divProps } = props;

  if (!data || !defs) {
    return null;
  }

  return (
    <div
      {...divProps}
      data-component={["DataTable", props["data-component"]]
        .filter((el) => el)
        .join("/")}
      className={clsx(styles.DataTable, className)}
      ref={ref}
    >
      <table className={styles.DataTableTable}>
        <thead>
          <tr>
            {defs.map((def, defIndex) => {
              return <DataTableHeadCell key={defIndex} def={def} />;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, dataIndex) => {
            return (
              <tr key={dataIndex}>
                {defs.map((def, defIndex) => {
                  return (
                    <DataTableBodyCell
                      key={defIndex}
                      def={def}
                      index={dataIndex}
                      item={item}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

interface DataTableHeadCellProps<T>
  extends HTMLAttributes<HTMLTableCellElement> {
  /** Определение колонки (свойства колонки) */
  def: ColumnDef<T>;
}
function DataTableHeadCell<T>(props: DataTableHeadCellProps<T>) {
  const { def, className } = props;

  return (
    <td
      {...def.headCellProps}
      data-component="DataTableHeadCell"
      className={clsx(styles.DataTableHeadCell, className)}
    >
      {def.title ?? def.valueKey}
    </td>
  );
}

interface DataTableBodyCellProps<T>
  extends HTMLAttributes<HTMLTableCellElement> {
  /** Определение колонки (свойства колонки) */
  def: ColumnDef<T>;
  /** Данные строки таблицы */
  item: T;
  index: number;
}

function DataTableBodyCell<T>(props: DataTableBodyCellProps<T>) {
  const { def, item, index, className } = props;

  const withWrapper = (element: ReactNode) => {
    return (
      <td
        {...def.bodyCellProps}
        data-component="DataTableBodyCell"
        className={clsx(styles.DataTableBodyCell, className)}
      >
        {element}
      </td>
    );
  };

  if (def.render) {
    return withWrapper(def.render(props.item, index));
  }

  const value = def.valueKey && getValueFromObject(item, def.valueKey);

  if (
    value === undefined ||
    value === null ||
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return withWrapper(value);
  }
}

function getValueFromObject(obj: unknown, key: string): unknown {
  if (obj === null || obj === undefined) {
    return undefined;
  }

  if (!key.includes(".")) {
    return obj[key as keyof typeof obj];
  }

  const paths = key.split(".");

  return paths.reduce((acc, key) => acc?.[key as keyof typeof acc], obj);
}
