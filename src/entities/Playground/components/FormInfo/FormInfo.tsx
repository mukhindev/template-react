import { HTMLAttributes } from "react";
import { useForm } from "~/shared/ui/Form";

export default function FormInfo(props: HTMLAttributes<HTMLDivElement>) {
  const form = useForm();

  return (
    <div data-component="FormInfo" {...props}>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}
