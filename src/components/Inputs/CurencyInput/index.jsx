import React from "react";
import { useCallback } from "react";

const ChoseInput = ({ form, handlerChange, options, name ,label}) => {
  const handleOptionChange = useCallback(
    (value) => {
      handlerChange({ name, value });
    },
    [handlerChange, name]
  );

  return (
    <div>
      <label className={"flex flex-col"}>
        {label && <span className="text-[#ABABB0] text-[13px]">{label}</span>}
        <div className="flex  items-end gap-1">
          {options.map((option, index) => (
            <div
              key={index}
              className={`border h-[30px] border-black/5 w-full text-[14px] whitespace-nowrap flex items-center justify-center rounded-[7px] cursor-pointer ${
                form[name] === option.props.value ? "border-orange" : ""
              }`}
              onClick={() => handleOptionChange(option.props.value)}
            >
              {option}
            </div>
          ))}
        </div>
      </label>
    </div>
  );
};


export default ChoseInput;
