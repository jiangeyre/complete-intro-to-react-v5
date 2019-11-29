import React, { useState } from "react";

const StateComponent = () => {
  const [isGreen, setIsGreen] = useState(true);

  return (
    <h1
      onClick={() => setIsGreen(!isGreen)}
      style={{ color: isGreen ? "limegreen" : "crimson" }}
    >
      useState Example
    </h1>
  );
};

export default StateComponent;

// useState allows to make our components stateful. Whereas this previously required using a class component, hooks give us the ability to write it using just functions. It allows us to have more flexible components.

// In this example component, everytime you click on the h1, it will change colors. It is doing this by keeping that bit of state in a hook which is being fed in anew every render so it always has the latest state.
