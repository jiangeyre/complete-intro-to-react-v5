import React, {
    useState,
    useRef,
    useImperativeHandle,
    forwardRef
  } from "react";
  
  const ElaborateInput = forwardRef(
    ({ hasError, placeholder, value, update }, ref) => {
      const inputRef = useRef();
      useImperativeHandle(ref, () => {
        return {
          focus() {
            inputRef.current.focus();
          }
        };
      });
      return (
        <input
          ref={inputRef}
          value={value}
          onChange={e => update(e.target.value)}
          placeholder={placeholder}
          style={{
            padding: "5px 15px",
            borderWidth: "3px",
            borderStyle: "solid",
            borderColor: hasError ? "crimson" : "#999",
            borderRadius: "5px",
            margin: "0 10px",
            textAlign: "center"
          }}
        />
      );
    }
  );
  
  const ImperativeHandleComponent = () => {
    const [city, setCity] = useState("Seattle");
    const [state, setState] = useState("WA");
    const [error, setError] = useState("");
    const cityEl = useRef();
    const stateEl = useRef();
  
    function validate() {
      // lol I found it on StackOverflow : https://stackoverflow.com/a/25677072
      if (
        !/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]+$/.test(
          city
        )
      ) {
        setError("city");
        cityEl.current.focus();
        return;
      }
  
      if (!/^[A-Z]{2}$/.test(state)) {
        setError("state");
        stateEl.current.focus();
        return;
      }
  
      setError("");
      alert("valid form!");
    }
  
    return (
      <div>
        <h1>useImperativeHandle Example</h1>
        <ElaborateInput
          hasError={error === "city"}
          placeholder={"City"}
          value={city}
          update={setCity}
          ref={cityEl}
        />
        <ElaborateInput
          hasError={error === "state"}
          placeholder={"State"}
          value={state}
          update={setState}
          ref={stateEl}
        />
        <button onClick={validate}>Validate Form</button>
      </div>
    );
  };
  
  export default ImperativeHandleComponent;
  

// Here's one you will likely never directly use but you may use libraries that use it for you. We're going to use it in conjunction with another feature called forwardRef that again, you probably won't use but libraries will use on your behalf. Let's explain first what it does using the example and then we'll explain the moving parts.

// In the example above, whenever you have an invalid form, it will immediately focus the the first field that's invalid. If you look at the code, ElaborateInput is a child element so the parent component shouldn't have any access to the input contained inside the component. Those components are black boxes to their parents. All they can do is pass in props. So how do we accomplish it then?

// The first thing we use is useImperativeHandle. This allows us to customize methods on an object that is made available to the parents via the useRef API. Inside ElaborateInput we have two refs: one thate is the one that will be provided by the parent, forwarded through by wrapping the ElaborateInput component in a forwardRef call which will ten provide that second ref parameter in the function call, and then the inputRef which is being used to directly access the DOM so we can call focus on the DOM node directly.

// From the parent, we assign via useRef a ref to each of the ElaborateInputs which is then forwarded on each on via the forwardRef. Now, on these refs inside the parent component we have those methods that we made inside the child so we can call them when we need to. In this case, we'll calling the focus when the parent knows that the child has an error.

// Again, you probably use this directly but it's good to know it exists. Normally it's better to not use this hook and try to accomplish the same thing via props but sometimes it may be useful to break this one out.