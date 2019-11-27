import React, { useState, useLayoutEffect, useRef } from "react";

const LayoutEffectComponent = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const el = useRef();

  useLayoutEffect(() => {
    setWidth(el.current.clientWidth);
    setHeight(el.current.clientHeight);
  });

  return (
    <div>
      <h1>useLayoutEffect Example</h1>
      <h2>textarea width: {width}px</h2>
      <h2>textarea height: {height}px</h2>
      <textarea
        onClick={() => {
          setWidth(0);
        }}
        ref={el}
      />
    </div>
  );
};

export default LayoutEffectComponent;

// useLayoutEffect is almost the same as useEffect except that it's synchronous to render as opposed to scheduled like useEffect is. If you're migrating from a class component to a hooks-using function component, this can be helpful too because useLayout runs at the same time as componentDidMount and componentDidUpdate whereas useEffect is scheduled after. This should be a temporary fix.

// The only time you should be using useLayoutEffect is to measure DOM nodes for things like animations. In the example, I measure the textarea after every time you click on it (the onClick is to force a re-render.) This means you're running render twice but it's also necessary to be able to capture the correct measurments.