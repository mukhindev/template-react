import { ColumnDef } from "./types";

interface DataTableProps<T> {
  /** Определение колонок таблицы */
  defs: ColumnDef<T>[];
  /** Массив данных для вывода. Каждый элемент — строка */
  data: T[];
}

/** Генерация таблицы из данных */
export default function DataTable<T>(props: DataTableProps<T>) {
  if (!props.data || !props.defs) {
    return null;
  }

  return (
    <div data-component="DataTable">
      <table>
        <thead>
          <tr>
            {props.defs.map((def, defIndex) => {
              return <DataTableHeadCell key={defIndex} def={def} />;
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, dataIndex) => {
            return (
              <tr key={dataIndex}>
                {props.defs.map((def, defIndex) => {
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
}

interface DataTableHeadCellProps<T> {
  /** Определение колонки (свойства колонки) */
  def: ColumnDef<T>;
}
function DataTableHeadCell<T>(props: DataTableHeadCellProps<T>) {
  const { def } = props;

  return (
    <td data-component="DataTableHeadCell" {...def.headCellProps}>
      {def.title ?? def.valueKey}
    </td>
  );
}

interface DataTableBodyCellProps<T> {
  /** Определение колонки (свойства колонки) */
  def: ColumnDef<T>;
  /** Данные строки таблицы */
  item: T;
  index: number;
}

function DataTableBodyCell<T>(props: DataTableBodyCellProps<T>) {
  const { def, item, index } = props;

  if (def.render) {
    return (
      <td data-component="DataTableBodyCell" {...def.bodyCellProps}>
        {def.render(props.item, index)}
      </td>
    );
  }

  const value = def.valueKey && getValueFromObject(item, def.valueKey);

  if (
    value === undefined ||
    value === null ||
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return (
      <td data-component="DataTableBodyCell" {...def.bodyCellProps}>
        {value}
      </td>
    );
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
