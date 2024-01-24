import { createContext, useContext } from "react";

export type FormContextParams<T> = {
  /** Данные формы (входящие в форму + изменения в форме) */
  data: Partial<T>;
  /** Внутренние данные формы (изменения в форме) */
  internalData: Partial<T>;
  /** Внешние данные формы (входящие в форму через пропс data) */
  externalData: Partial<T>;
  /** Есть любое изменение в форме */
  isAnyChanged: boolean;
  /** Процесс отправки активен */
  isSubmitInProgress: boolean;
  /** Форма заблокирована */
  disabled: boolean;
  /** Сброс формы */
  reset: () => void;
  /** Отправка формы */
  submit: () => void;
  /** Изменение данные в форме */
  change: (data: Partial<T>) => void;
  /** Узнать изменено ли поле */
  isPropertyChanged: (property: keyof T) => boolean;
};

export const FormContext = createContext({});

export const useForm = <T extends Record<string, unknown>>() => {
  return useContext(FormContext) as FormContextParams<T>;
};
