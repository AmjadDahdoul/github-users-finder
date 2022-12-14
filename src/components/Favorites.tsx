import React, { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { removeFromFavorite, getFavorite } from "../helpers";

const Favorites = () => {
  const [favUsers, setFavUsers] = useState(getFavorite());
  const removeUser = (user: any) => {
    removeFromFavorite(user);
    setFavUsers(getFavorite());
  };
  return (
    <div className="users-list">
      {favUsers && !!favUsers?.length ? (
        <div className="mx-auto bg-light mt-3 border rounded shadow">

          {favUsers.map((user: any, index: any) => (
            <div
              key={index}
              className="d-flex flex-column flex-lg-row mx-3 border-bottom p-2 align-items-center justify-content-between"
            >
              <div key={index}>
                <div className="d-flex align-items-center user-info">
                  <img
                    className="img-fluid rounded-circle user-image"
                    src={user?.avatar_url}
                  />
                  <div className="ms-4">
                    <Link to={`/users/${user.login}`}>
                      <h4 className="m-0">@{user?.login}</h4>
                    </Link>
                    <p className="m-0">Lorem ipsum dolor sit amet consectetur.</p>
                  </div>
                </div>
              </div>
              <button
                className="bg-light border-0"
                onClick={() => removeUser(user)}
              >
                <BsFillStarFill color="#F2C94C" className="fs-2 " />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="d-flex justify-content-center p-3 fs-2 ">
          Favorite is empty...
        </p>
      )}

    </div>
  );
};

export default Favorites;
