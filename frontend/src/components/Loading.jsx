import React, { useEffect, useState } from "react";

const Loading = () => {
  const [num, setnum] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setnum((prevNum) => prevNum + 1);
    }, 100);
    return () => clearInterval(timer);
  }, []); 

  return (
    <>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Loading...
      </div>
      <div style={{ textAlign: "center", fontSize: "15px" }}>{num}</div>
    </>
  );
};

export default Loading;
