import React, { useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
// import Details from "./Details";
import SearchParams from "./SearchParams";
import ThemeContext from "./ThemeContext";
// import NavBar from "./NavBar";

const Details = lazy(() => import('./Details'));
//dynamic import

const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header> 
        <Suspense fallback={<h1>loading route...</h1>}>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
