// components/ClickDetector.js
import { useEffect } from "react";

const ClickDetector = ({ onGlobalClick }) => {
  useEffect(() => {
    const handleGlobalClick = (event) => {
      onGlobalClick(event);
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [onGlobalClick]);

  return null;
};

export default ClickDetector;
