import React, { useEffect, useState, useRef, useCallback } from "react";
import Search from "../components/Search";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "../App.css";
import { useSearchParams } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [scrollDir, setScrollDir] = useState("false");
  let [searchParams, setSearchParams] = useSearchParams();

  const handleUserOnChange = (usersList) => {
    if (users.length) {
      setUsers((prevUsers) => [...prevUsers, ...usersList]);
    } else {
      setUsers(usersList);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("first");
        setScrollDir("true");
        setSearchParams({ page: 1 });
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <div className="App">
      <Search usersList={handleUserOnChange} />
      <Container className="main-container">
        <Outlet context={{ users }} />
      </Container>
    </div>
  );
}

export default App;

//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 github push
