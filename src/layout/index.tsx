import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import "../App.css";
import { useSearchParams } from "react-router-dom";
import PullToRefresh from 'react-simple-pull-to-refresh';

const Layout = () => {
  const [users, setUsers] = useState([]);
  const [scrollDir, setScrollDir] = useState("false");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRefreshPullable, setIsRefreshPullable]: any = useState(true);
  const location = useLocation();

  const handleUserOnChange = (usersList: any) => {
    if (usersList === undefined) {
      setUsers([]);
    } else {
      setUsers(usersList);
    }
  };

  const handleOnRefresh: any = async () => {
    if (location.pathname === '/') setSearchParams({ refresh: 'true' });
  }

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        location.pathname === "/"
      ) {
        setScrollDir("true");
        setSearchParams({ paginate: 'true' });
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  useEffect(() => {
    setIsRefreshPullable(true)
    if (location.pathname !== '/') setIsRefreshPullable(false);
  }, [location.pathname]);

  return (
    <div className="App">
      <Search usersList={handleUserOnChange} />
      <Container className="main-container">
        <PullToRefresh onRefresh={() => handleOnRefresh()} isPullable={isRefreshPullable}>
          <Outlet context={{ fetchedUsers: users }} />
        </PullToRefresh>
      </Container>
    </div>
  );
}

export default Layout;
