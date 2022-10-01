import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import "../App.css";
import { useSearchParams } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [scrollDir, setScrollDir] = useState("false");
  let [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const handleUserOnChange = (usersList) => {
    //&& location.search === "?paginate=true"
    if (usersList === undefined) {
      setUsers([]);
    } else {
      if (users && !!users.length) {
        setUsers((prevUsers) => [...prevUsers, ...usersList]);
      } else {
        setUsers(usersList);
      }
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        location.pathname === "/"
      ) {
        setScrollDir("true");
        // if (location.search !== "?paginate=true") {
        setSearchParams({ paginate: true });
        //  }
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
