import React, { useState, useContext, createContext } from "react";

const UserContext = createContext([
  {
    firstName: "Bob",
    lastName: "Bobberson",
    suffix: 1,
    email: "bobbobberson@example.com"
  },
  obj => obj
]);

const LevelFive = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div>
      <h5>{`${user.firstName} ${user.lastName} the ${user.suffix} born`}</h5>
      <button
        onClick={() => {
          setUser(Object.assign({}, user, { suffix: user.suffix + 1 }));
        }}
      >
        Increment
      </button>
    </div>
  );
};

const LevelFour = () => (
  <div>
    <h4>fourth level</h4>
    <LevelFive />
  </div>
);

const LevelThree = () => (
  <div>
    <h3>third level</h3>
    <LevelFour />
  </div>
);

const LevelTwo = () => (
  <div>
    <h2>second level</h2>
    <LevelThree />
  </div>
);

const ContextComponent = () => {
  const userState = useState({
    firstName: "James",
    lastName: "Jameson",
    suffix: 1,
    email: "jamesjameson@example.com"
  });

  return (
    <UserContext.Provider value={userState}>
      <h1>first level</h1>
      <LevelTwo />
    </UserContext.Provider>
  );
};

export default ContextComponent;

// An early problem with the React problem is called "data tunneling" or "prop drilling". This is when you have a top level component (in our case the parent component) and a child component way down in the hierarchy that need the same data (like the user object.) We could pass that data down, parent-to-child, for each of the intermediary components but that sucks because now each of LevelTwo, LevelThree, and LevelFour all have to know about the user object even when they themselves don't need it, just their children. This is prop drilling: passing down this data in unnecessary intermediaries.

// Enter context. Context allows you to create a wormhole where stuff goes in and a wormhole in a child component where that same data comes out and the stuff in the middle doesn't know it's there. Now that data is available anywhere inside of the UserContext.Provider. useContext just pulls that data out when given a Context object as a parameter. You don't have to use useState and useContext together (the data can be any shape, not just useState-shaped) but I find it convenient when child components need to be able to update the context as well.

// In general, context adds a decent amount of complexity to an app. A bit of prop drilling is fine. Only put things in context that are truly application-wide state like user information or auth keys and then use local state for the rest.

// Often you'll use context instead of Redux or another state store. You could get fancy and use useReducer and useContext together to get a pretty great approximation of Redux-like features.