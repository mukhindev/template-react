import { ChangeEventHandler, HTMLAttributes } from "react";
import { useForm } from "~/shared/ui/Form";

interface FormIntegerProps<T extends Record<string, unknown>> {
  property: keyof T;
  label?: string;
}

export default function FormInteger<T extends Record<string, unknown>>(
  props: FormIntegerProps<T> & HTMLAttributes<HTMLLabelElement>,
) {
  const { property, label, ...labelProps } = props;

  const { data, change, isPropertyChanged } = useForm<T>();
  const value = data[property] as number;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const newValue = +evt.target.value;

    const data: Partial<T> = {};
    Object.assign(data, { [property]: newValue });
    change(data);
  };

  return (
    <label
      {...labelProps}
      data-component={["FormInteger", props["data-component"]]
        .filter((el) => el)
        .join("/")}
    >
      <span>{label}</span>
      <input value={value} onChange={handleChange} />
      {isPropertyChanged(property) ? "Изменён" : "Не изменён"}
    </label>
  );
}
