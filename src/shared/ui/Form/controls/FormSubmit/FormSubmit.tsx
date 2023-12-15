import { HTMLAttributes } from "react";
import { useForm } from "../../../Form";

export default function FormSubmit(props: HTMLAttributes<HTMLButtonElement>) {
  const { isAnyChanged } = useForm();
  const { children, ...buttonProps } = props;

  return (
    <button
      type="submit"
      disabled={!isAnyChanged}
      {...buttonProps}
      data-component={["FormSubmit", props["data-component"]]
        .filter((el) => el)
        .join("/")}
    >
      {children ?? "Отправить"}
    </button>
  );
}
