import { useState, useEffect } from "react";

const findInnerWidth = () => {
  const { innerWidth: width } = window;
  return width;
};

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(findInnerWidth());
  useEffect(() => {
    function handleResize() {
      setScreenWidth(findInnerWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenWidth;
};

export default useScreenWidth;
