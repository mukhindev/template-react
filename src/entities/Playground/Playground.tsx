import { useState } from "react";
import { clsx } from "clsx";
import Form, { SubmitHandler } from "~/shared/ui/Form";
import FormInteger from "~/shared/ui/Form/controls/FormInteger";
import FormReset from "~/shared/ui/Form/controls/FormReset";
import FormSubmit from "~/shared/ui/Form/controls/FormSubmit";
import FormText from "~/shared/ui/Form/controls/FormText";
import Grid, { Cell } from "~/shared/ui/Grid";
import FormInfo from "./components/FormInfo";
import styles from "./Playground.module.scss";

const DATA = {
  firstName: "Sergey",
  age: 37,
};

type DataModel = Partial<typeof DATA>;

interface PlaygroundProps {
  className?: string;
}

export default function Playground(props: PlaygroundProps) {
  const { className } = props;

  const [externalData, setData] = useState<DataModel>(DATA);

  const handleSubmit: SubmitHandler<DataModel> = (data, next) => {
    // Имитация отправки
    setTimeout(() => {
      setData({ ...externalData, ...data });
      next();
    }, 2000);
  };

  return (
    <Form
      data-component="Playground"
      className={clsx(styles.Playground, className)}
      data={externalData}
      onSubmit={handleSubmit}
    >
      <div className={styles.PlaygroundColumns}>
        <Grid columns={2} gap={"var(--spacing-md)"}>
          <Cell className={styles.PlaygroundFormHeader} columns={-1}>
            <FormReset>Сбросить</FormReset>
            <FormSubmit>Сохранить</FormSubmit>
          </Cell>
          <Cell>
            <FormText<DataModel> label="Имя" property="firstName" />
          </Cell>
          <Cell>
            <FormInteger<DataModel> property="age" />
          </Cell>
        </Grid>
        <FormInfo />
      </div>
    </Form>
  );
}
