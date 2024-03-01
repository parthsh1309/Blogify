import React, { forwardRef } from "react";

function SelectInput({ list = [], label, name,register,value }, ref) {
  console.log(value);
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        ref={ref}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register(name)}
      >
        <option >{value||"Select"}</option>
        {list.map((item) => (
         value!==item && <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}

export default forwardRef(SelectInput);

