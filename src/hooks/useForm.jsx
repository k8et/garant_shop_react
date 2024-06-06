import { useCallback, useState } from "react";

const useForm = ({ onSubmit, data = {} }) => {
  const initialForm = data;
  const [form, setForm] = useState(initialForm);

  const handlerChange = useCallback(
      (event) => {
        if (event && event.target) {
          const { name, value } = event.target;
          setForm(state => ({ ...state, [name]: value }));
        }
      },
      []
  );

  const handlerSubmit = event => {
    event.preventDefault();
    onSubmit?.(form);
    setForm(initialForm);
  };

  return {
    form,
    setForm,
    handlerChange,
    handlerSubmit,
  };
};

export default useForm;
