import DataTable from "~/shared/ui/DataTable";
import styles from "./App.module.scss";

const orders = [
  { id: "1", user: { firstName: "Sergey", lastName: "Mukhin" }, total: 1000 },
  {
    id: "2",
    user: { firstName: "Ira", lastName: "Pivovarova" },
    total: 888,
  },
];

export default function App() {
  return (
    <div data-component="App" className={styles.App}>
      <DataTable
        defs={[
          {
            title: "ID",
            valueKey: "id",
          },
          {
            title: "Имя",
            valueKey: "user.firstName",
          },
          {
            title: "Всего",
            valueKey: "total",
          },
          {
            title: "Всего + 10",
            render: (item) => <div>{item.total} + 50</div>,
          },
          {
            title: "Всего + 20",
            valueKey: "total",
          },
        ]}
        data={orders}
      />
    </div>
  );
}
