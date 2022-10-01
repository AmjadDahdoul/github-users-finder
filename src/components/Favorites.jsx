import { useEffect } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favUser = JSON.parse(localStorage.getItem("usr"));

  const removeFromFavorite = (user) => {
    localStorage.removeItem("usr");
  };

  return (
    <div className="users-list">
      <div className="mx-auto bg-light mt-3 border rounded shadow">
        {favUser && !!favUser.length ? (
          favUser.map((user, index) => (
            <div
              key={index}
              className="d-flex flex-column flex-lg-row mx-3 border-bottom p-2 align-items-center justify-content-between"
            >
              <Link key={index} to={`/users/${user.login}`}>
                <div className="d-flex align-items-center user-info">
                  <img
                    className="img-fluid rounded-circle user-image"
                    src={user.avatar_url}
                  />
                  <div className="ms-4">
                    <h4>@{user.login}</h4>
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                  </div>
                </div>
              </Link>
              <button
                className="bg-light border-0"
                onClick={() => removeFromFavorite(user.login)}
              >
                <BsFillStarFill className="fs-2" />
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

///dfdfdfdf
