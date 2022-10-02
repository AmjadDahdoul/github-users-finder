import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { removeFromFavorite, getFavorite } from "./FavoriteManager";

const Favorites = () => {
  const [favUsers, setFavUsers] = useState(getFavorite());
  const removeUser = (user) => {
    removeFromFavorite(user);
    setFavUsers(getFavorite());
  };
  return (
    <div className="users-list">
      <div className="mx-auto bg-light mt-3 border rounded shadow">
        {favUsers && !!favUsers.length ? (
          favUsers.map((user, index) => (
            <div
              key={index}
              className="d-flex flex-column flex-lg-row mx-3 border-bottom p-2 align-items-center justify-content-between"
            >
              <div key={index}>
                <div className="d-flex align-items-center user-info">
                  <img
                    className="img-fluid rounded-circle user-image"
                    src={user.avatar_url}
                  />
                  <div className="ms-4">
                    <Link to={`/users/${user.login}`}>
                      <h4>@{user.login}</h4>
                    </Link>
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
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
          ))
        ) : (
          <p className="d-flex justify-content-center p-3 fs-2 ">
            Favorites are empty...
          </p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
