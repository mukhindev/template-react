import { HTMLAttributes } from "react";
import { useForm } from "../../../Form";

export default function FormReset(props: HTMLAttributes<HTMLButtonElement>) {
  const { isAnyChanged } = useForm();
  const { children, ...buttonProps } = props;

  return (
    <button
      type="reset"
      disabled={!isAnyChanged}
      {...buttonProps}
      data-component={["FormReset", props["data-component"]]
        .filter((el) => el)
        .join("/")}
    >
      {children ?? "Сбросить"}
    </button>
  );
}
