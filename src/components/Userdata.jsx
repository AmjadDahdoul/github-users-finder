import React, { useEffect, useState } from "react";
import { ExclamationLg } from "react-bootstrap-icons";
import { BsStar, BsFillStarFill, BsSearch } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {
  addToFavorite,
  checkFavorite,
  removeFromFavorite,
} from "./FavoriteManager";

const UserData = ({}) => {
  let { username } = useParams();
  const [data, setData] = useState({});
  const [btnState, setBtnState] = useState(checkFavorite(username));
  const fav = [{}];

  useEffect(() => {
    console.log("getUsers");
    const getUsers = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
          {
            method: "GET",
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

  const handleFavorite = (user) => {
    if (btnState) {
      removeFromFavorite(user);
    } else {
      addToFavorite(user);
    }
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
              <button
                className="bg-light border-0 "
                onClick={() => handleFavorite(data)}
              >
                {!btnState ? (
                  <BsStar className="fs-2" />
                ) : (
                  <BsFillStarFill color="#F2C94C" className="fs-2 " />
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
