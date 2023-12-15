import { FormEvent, HTMLAttributes, PropsWithChildren, useState } from "react";
import { FormContext, FormContextParams } from "./FormContext";
import { clsx } from "clsx";
import styles from "./Form.module.scss";

type NextCallback = (ok?: boolean) => void;
export type SubmitHandler<T> = (data: Partial<T>, next: NextCallback) => void;

interface FormBaseProps<T extends Record<string, unknown>> {
  /** Данные формы */
  data: Partial<T>;
  /** Отправлять все данные формы */
  isAllDataSubmit?: boolean;
  /** Блокировать элементы формы (если они обрабатывают disabled) */
  disabled?: boolean;
  /** Состояние занятости/ожидания */
  inProgress?: boolean;
  /** Событие отправки формы  */
  onSubmit: SubmitHandler<T>;
  /** Событие изменения в форме  */
  onChange?: (data: Partial<T>) => void;
}

/** Компонент формы, работающий с полями через контекст (useForm) */
export default function Form<T extends Record<string, unknown>>(
  props: PropsWithChildren<FormBaseProps<T>> &
    Omit<HTMLAttributes<HTMLFormElement>, "onSubmit" | "onChange">,
) {
  const {
    className,
    children,
    data: externalData,
    isAllDataSubmit = false,
    disabled = false,
    inProgress = false,
    onSubmit,
    onChange,
    ...formProps
  } = props;

  const [internalData, setInternalData] = useState<Partial<T>>({});
  const [isSubmitInProgress, setIsSubmitInProgress] = useState(false);

  /** Сброс формы */
  const handleReset = () => {
    setInternalData({});
  };

  /** Изменение данных формы */
  const handleChange = (changedData: Partial<T>) => {
    const newData = { ...internalData, ...changedData };

    Object.entries(changedData).forEach(([property, value]) => {
      if (value === externalData[property]) {
        delete newData[property];
      }
    });

    setInternalData(newData);
    onChange?.(changedData);
  };

  /** Обработчик успешной отправки */
  const handleSubmitSuccess = () => {
    // При успешной отправки внутренние данные зачищаются
    setInternalData({});
    setIsSubmitInProgress(false);
  };

  /** Обработчик ошибки при отправке */
  const handleSubmitError = () => {
    setIsSubmitInProgress(false);
  };

  /** Обработчик отправки формы */
  const handleSubmit = (evt?: FormEvent) => {
    evt?.preventDefault?.();

    let newData = internalData;

    // C флагом isAllDataSubmit отправлять формы со всеми данными
    if (isAllDataSubmit) {
      newData = { ...externalData, ...internalData };
    }

    onSubmit(newData, (ok = true) => {
      ok ? handleSubmitSuccess() : handleSubmitError();
    });

    setIsSubmitInProgress(true);
  };

  return (
    <form
      {...formProps}
      data-component={["Form", props["data-component"]]
        .filter((el) => el)
        .join("/")}
      className={clsx(styles.Form, className)}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <fieldset
        className={styles.Fieldset}
        disabled={isSubmitInProgress || disabled || inProgress}
      >
        <FormContext.Provider
          value={
            {
              data: { ...externalData, ...internalData },
              internalData,
              externalData,
              reset: handleReset,
              submit: handleSubmit,
              change: handleChange,
              isSubmitInProgress,
              inProgress: isSubmitInProgress || inProgress,
              disabled: isSubmitInProgress || inProgress || disabled,
              isPropertyChanged: (property: keyof T) =>
                !!internalData[property],
              isAnyChanged: Object.values(internalData).length > 0,
            } as FormContextParams<T>
          }
        >
          {children}
        </FormContext.Provider>
      </fieldset>
    </form>
  );
}
