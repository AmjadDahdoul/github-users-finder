import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { BsStar, BsFillStarFill, BsSearch, BsArrowLeft } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { githubApi } from "../helpers/api";

const Search = ({ usersList }: any) => {
  const [searchUsers, setSearchUsers] = useState("");
  const { username } = useParams();
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState(15);

  const handleOnSearchChange = (event: any) => {
    if (event.target.value.trim().length >= 3 || event.target.value.trim() === "") {
      setTimeout(() => {
        setSearchUsers(event.target.value);
      }, 500);
    }
  };

  const getUsers = async () => {
    try {
      const data: any = await githubApi(`/search/users?q=${searchUsers}&page=1&per_page=${pageNumber}`);
      usersList(data?.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [searchUsers]);

  useEffect(() => {
    if (searchUsers && location.search.includes('paginate=true')) {
      setPageNumber(pageNumber + 10);
      getUsers();
    }

    if (searchUsers && location.search.includes('refresh=true')) {
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
                onChange={(event) => handleOnSearchChange(event)}
              />
              <Link to="/Favorties" className="bg-light border-0 px-4">
                <BsStar color="#000" className="fs-2 mx-2" />
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
          <Container className="main-container d-flex">
            <div className="d-flex align-items-center">
              <Link to="/">
                <h3 className="left-arrow">
                  <BsArrowLeft />
                </h3>
              </Link>
              <div className="px-2 fs-4">
                {username ? `@${username}` : "Favorites"}
              </div>
            </div>
            {location.pathname === "/Favorties" ? (
              <div className="bg-light border-0 px-4 mx-2">
                < BsFillStarFill color="#F2C94C" className="fs-2" />
              </div>
            ) : (
              ""
            )}
          </Container>
        </Navbar>
      )
      }
    </>
  );
};

export default Search;
