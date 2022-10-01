import React, { useEffect, useState } from "react";
import { ExclamationLg } from "react-bootstrap-icons";
import { BsStar, BsFillStarFill, BsSearch } from "react-icons/bs";
import { useParams } from "react-router-dom";

const UserData = ({}) => {
  let { username } = useParams();
  const [data, setData] = useState({});
  // const [fav, setFav] = useState([
  //   { name: "amjad", age: 15 },
  //   { name: "osama", age: 13 },
  // ]);
  const fav = [{}];

  useEffect(() => {
    const getUsers = async () => {
      // Default options are marked with *
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
          {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "bearer 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", // move to .env file
            },
          }
        );
        const data = await response.json();
        setData(data);

        // return response.json(); // parses JSON response into native JavaScript objects
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  // const handleFavorite = () => {
  //   fav.push(data.login);
  //   console.log(localStorage.getItem("userLogin"));
  //   console.log(fav);
  // };

  const [btnState, setBtnState] = useState(false);

  const handleFavorite = () => {
    setBtnState(!btnState);
  };

  return (
    <div>
      <div className="user-list">
        {data.login != null ? (
          <div className="mx-auto bg-light  mt-3 border rounded shadow">
            <div className="d-flex flex-column flex-lg-row mx-3 border-bottom p-2 align-items-center justify-content-between">
              <div className="d-flex align-items-center user-info">
                <img className="img-fluid  user-image" src={data.avatar_url} />
                <div className="ms-4">
                  <h4>{data.name}</h4>
                  <a href={`https://github.com/${data.login}`} target="_blank">
                    <h5>@{data.login}</h5>
                  </a>
                  <p>{data.bio || ""}</p>

                  <div className="d-flex align-items-end text-center">
                    <div className="">
                      <h3>{data.followers}</h3>
                      <p>Followers</p>
                    </div>
                    <div className="mx-3">
                      <h3>{data.following}</h3>
                      <p>Following</p>
                    </div>
                    <div className="mx-3">
                      <h3>{data.public_repos}</h3>
                      <p>Repos</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="bg-light border-0 " onClick={handleFavorite}>
                {!btnState ? (
                  <BsStar className="fs-2" />
                ) : (
                  <BsFillStarFill className="fs-2" />
                )}
              </button>
            </div>
          </div>
        ) : (
          <b className="d-flex justify-content-center pt-5 fs-1">{`There is no user with this ID: ${username}.`}</b>
        )}
      </div>
    </div>
  );
};

export default UserData;
