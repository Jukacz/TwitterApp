import React, { useState } from "react";
import { JoiInputProps } from "../../interfaces/JoiInput.interface";
import Joi from "joi";
const JoiInput: React.FC<
  JoiInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = (props) => {
  const { schema, ...rest } = props;
  const [error, setError] = useState<string>("");
  const validateInput = (text: string) => {
    const isError = schema?.validate(text);
    if (isError?.error) {
      setError(isError.error.message);
      return;
    }
    setError("");
  };
  return (
    <>
      <input
        {...rest}
        onBlur={(e) => {
          validateInput(e.target.value);
        }}
      />
      <p className="error-message">{error}</p>
    </>
  );
};

export default JoiInput;
