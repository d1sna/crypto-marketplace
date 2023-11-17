import { isNumber } from "lodash";
import { useState } from "react";

const charRegexp = /^[A-Za-z0-9]+$/;
const numberRegexp = /[0-9\.]/;

export default function TailwindInput({
  id,
  label,
  placeholder,
  onChange = () => {},
  isNumbersOnly = false,
  value,
  className,
}) {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`${
          !isValid && "text-red-600"
        } block text-smxl font-medium text-white pt-2 `}
      >
        {label}
      </label>
      <input
        onChange={onChange}
        // onChange={(e) => {
        //   try {
        //     console.log({ e });
        //     // if (!e.target.value) throw new Error("Cant be empty");

        //     const valueNumber = Number(e.target.value);
        //     if (isNumbersOnly && !isNumber(valueNumber)) {
        //       onChange(0);
        //       throw new Error("Only numbers pls");
        //     }

        //     // if (!isNumbersOnly && !charRegexp.test(e.target.value)) {
        //     //   throw new Error("Incorrect value");
        //     // }

        //     onChange(e);
        //     setIsValid(true);
        //     setErrorMessage("");
        //   } catch (error) {
        //     setIsValid(false);
        //     setErrorMessage(error.message);
        //   }
        // }}
        type="text"
        id={id}
        value={value}
        className={`${
          !isValid && "border-b-2 border-red-400"
        } bg-gray-50 border border-gray-300 text-gray-900 text-smxl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2`}
        placeholder={placeholder}
        required
      />
      <div
        className={`${
          !errorMessage && "text-slate-400 opacity-0"
        } text-red-400 text-smxl pt-1 relative`}
      >
        {errorMessage || "Correct value"}
      </div>
    </div>
  );
}
