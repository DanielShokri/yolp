import { useState } from "react";

const useForm = (callback, defualtInputs) => {
  const [inputs, setInputs] = useState(
    defualtInputs && Object.keys(defualtInputs).length !== 0
      ? defualtInputs
      : {}
  );

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};
export default useForm;
