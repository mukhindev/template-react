import { ChangeEventHandler, HTMLAttributes } from "react";
import { useForm } from "../../../Form";

interface FormTextProps<T extends Record<string, unknown>> {
  property: keyof T;
  label?: string;
}

export default function FormText<T extends Record<string, unknown>>(
  props: FormTextProps<T> & HTMLAttributes<HTMLLabelElement>,
) {
  const { property, label, ...labelProps } = props;

  const { data, change, isPropertyChanged } = useForm<T>();
  const value = data[property] as string;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const data: Partial<T> = {};
    Object.assign(data, { [property]: evt.target.value });
    change(data);
  };

  return (
    <label
      {...labelProps}
      data-component={["FormText", props["data-component"]]
        .filter((el) => el)
        .join("/")}
    >
      <span>{label}</span>
      <input value={value} onChange={handleChange} />
      {isPropertyChanged(property) ? "Изменён" : "Не изменён"}
    </label>
  );
}
