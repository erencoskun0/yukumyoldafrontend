import React from "react";

interface SwitchToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ isOn, onToggle }) => {
  return (
    <div
      onClick={() => onToggle()}
      className={`w-16 h-8 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
        isOn ? "bg-green-500" : "bg-gray-300"
      }`}>
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-9" : "translate-x-1"
        }`}></div>
    </div>
  );
};

export default SwitchToggle;
