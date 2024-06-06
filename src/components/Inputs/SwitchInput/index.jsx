import React from "react";

const SwitchInput = ({ value, onChange, name }) => {
  const toggleSwitch = () => {
    onChange({ name, value: !value });
  };

  return (
    <div className="flex ">
      <div
        style={{
          background: value ? "#C8D1DA" : "#FF7E32",
          color: "#fff",
          padding: "2px",
          borderRadius: "10px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "20px",
          position: "relative",
          cursor: "pointer"
        }}
        onClick={toggleSwitch}
      >
        <div
          style={{
            position: "absolute",
            top: "3px",
            left: value ? "4.5px" : "calc(100% - 10px - 7.5px)",
            width: "14px",
            height: "14px",
            background: "#f0f0f0" ,
            borderRadius: "50%",
            transition: "left 0.3s"
          }}
        />
      </div>
    </div>
  );
};



export default SwitchInput;
