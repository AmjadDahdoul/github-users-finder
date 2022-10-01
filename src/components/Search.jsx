import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { BsStar, BsFillStarFill, BsSearch, BsArrowLeft } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Search = ({ usersList }) => {
  const [searchUsers, setSearchUsers] = useState("");
  const { username } = useParams();
  const listInnerRef = useRef();
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState(1);

  const handleOnSearchChange = (e) => {
    if (e.target.value.trim().length >= 3 || e.target.value.trim() === "") {
      setTimeout(() => {
        setSearchUsers(e.target.value);
      }, 500);
    }
  };

  const getUsers = async () => {
    // Default options are marked with *
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchUsers}&page=${pageNumber}&per_page=20`,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: "bearer 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", // move to .env file
          },
        }
      );
      const data = await response.json();
      usersList(data.items);
      // return response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchUsers) getUsers();
  }, [searchUsers]);

  useEffect(() => {
    if (searchUsers && location.search) {
      setPageNumber(pageNumber + 1);
      getUsers();
    }
  }, [location]);

  return (
    <>
      {location.pathname === "/" ? (
        <Navbar
          bg="light"
          expand="lg"
          className="shadow justify-content-center"
        >
          <Container className="main-container">
            <Form className="d-flex w-100">
              <h4>
                <BsSearch />
              </h4>
              <Form.Control
                type="search"
                placeholder="Search for GitHub users..."
                className="mx-2 border-0 bg-light"
                aria-label="Search"
                onChange={(e) => handleOnSearchChange(e)}
              />
              <Link to="/Favorties" className="bg-light border-0 px-4">
                <BsStar className="fs-2 " />
              </Link>
            </Form>
          </Container>
        </Navbar>
      ) : (
        <Navbar
          bg="light"
          expand="lg"
          className="shadow justify-content-center"
        >
          <Container className="main-container">
            <div className="d-flex w-100 align-items-center">
              <Link to="/">
                <h3>
                  <BsArrowLeft />
                </h3>
              </Link>
              <div className="px-2 fs-4">
                {username ? `@${username}` : "Favorites"}
              </div>
            </div>
            {location.pathname === "/Favorties" ? (
              <div to="/Favorties" className="bg-light border-0 px-4">
                <BsFillStarFill className="fs-2 " />
              </div>
            ) : (
              ""
            )}
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Search;
