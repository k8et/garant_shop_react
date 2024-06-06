import React, { useState, useRef } from "react";

const CustomRangeInput = ({ value, onChange, label }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const newValue = Math.min(
      Math.max(((e.clientX - rect.left) / rect.width) * 4, 0),
      4
    );
    onChange(Math.round(Math.min(newValue, 3)));
  };

  const handleClick = (e) => {
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const newValue = Math.min(
      Math.max(((e.clientX - rect.left) / rect.width) * 4, 0),
      4
    );
    onChange(Math.round(Math.min(newValue, 3)));
  };
  console.log(value, "value");
  return (
    <label className="flex flex-col">
      {label && <span className="text-[#ABABB0] text-[13px]">{label}</span>}
      <div
        ref={sliderRef}
        className="relative w-[332px] border flex items-center p-[16px] rounded-[8px] border-black/5 h-[84px]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
      >
        <div className="relative w-full h-[5px] bg-[#DCDCDE] rounded-[8px] mt-[22px]">
          <div
            className="absolute top-[-5px] w-[15px] h-[15px] bg-orange rounded-full transform -translate-x-1/2"
            style={{ left: value === 5 ? '100%' : `${(value / 4) * 100}%` }}
          ></div>
          <div>
            <label
              className={`absolute top-[-30px] w-[27px] h-[21px] bg-[#FFECE0] rounded-[4px] ${value !== 0 ? "text-orange" : "text-black !bg-orange"} text-[12px] flex items-center justify-center`}>0%</label>
            <div
              className="absolute top-[-5px] w-[3px] left-[25px] h-[15px] bg-orange rounded-full transform -translate-x-1/2"
              style={{ left: `0%` }}
            ></div>
            <label
              className={`absolute top-[10px]  h-[21px] rounded-[4px]  text-[12px] flex items-center justify-center`}>100
              ₽</label>
          </div>
          <div>
            {value > 0 && <div
              className="absolute top-[0px] w-[25%] h-[5px] bg-orange rounded-full "
            ></div>}
            <label
              className={`absolute left-[25px] top-[-30px] w-[32px] h-[21px] bg-[#FFECE0] rounded-[4px] ${value !== 1 ? "text-orange" : "text-black !bg-orange"} text-[12px] flex items-center justify-center`}
              style={{ left: `25%` }}
            >-2%</label>
            <div
              className={`absolute top-[-5px] w-[3px] left-[25px] h-[15px]  ${value > 0 ? "bg-orange" : "bg-[#DCDCDE]"} rounded-full transform -translate-x-1/2`}
              style={{ left: `25%` }}
            ></div>
            <label
              style={{ left: `25%` }}
              className={`absolute top-[10px]  h-[21px] rounded-[4px]  text-[12px] flex items-center justify-center`}>1000
              ₽</label>
          </div>
          <div>
            {value >= 2 && <div
              className="absolute top-[0px] w-[50%] h-[5px] bg-orange rounded-full "
            ></div>}
            <label
              className={`absolute left-[25px] top-[-30px] w-[32px] h-[21px] bg-[#FFECE0] rounded-[4px] ${value !== 2 ? "text-orange" : "text-black !bg-orange"} text-[12px] flex items-center justify-center`}
              style={{ left: `50%` }}
            >-4%</label>
            <div
              className={`absolute top-[-5px] w-[3px] left-[25px] h-[15px]  ${value >= 2 ? "bg-orange" : "bg-[#DCDCDE]"} rounded-full transform -translate-x-1/2`}
              style={{ left: `50%` }}
            ></div>
            <label
              style={{ left: `50%` }}
              className={`absolute top-[10px]  h-[21px] rounded-[4px]  text-[12px] flex items-center justify-center`}>2000
              ₽</label>
          </div>
          <div>
            {value === 3 && <div
              className="absolute top-[0px] w-[75%] h-[5px] bg-orange rounded-full "
            ></div>}
            <label
              className={`absolute left-[25px] top-[-30px] w-[32px] h-[21px] bg-[#FFECE0] rounded-[4px] ${value !== 3 ? "text-orange" : "text-black !bg-orange"} text-[12px] flex items-center justify-center`}
              style={{ left: `75%` }}
            >-6%</label>
            <div
              className={`absolute top-[-5px] w-[3px] left-[25px] h-[15px]  ${value >= 3 ? "bg-orange" : "bg-[#DCDCDE]"} rounded-full transform -translate-x-1/2`}
              style={{ left: `75%` }}
            ></div>
            <label
              style={{ left: `75%` }}
              className={`absolute top-[10px]  h-[21px] rounded-[4px]  text-[12px] flex items-center justify-center`}>6000
              ₽</label>
          </div>
          <div>
            {value === 4 && <div
              className="absolute top-[0px] w-[100%] h-[5px] bg-orange rounded-full "
            ></div>}
          </div>
          <div>
            {value === 5 && <div
              className="absolute top-[0px] w-[100%] h-[5px] bg-orange rounded-full "
            ></div>}
          </div>
        </div>
      </div>
    </label>
  );
};


export default CustomRangeInput;
