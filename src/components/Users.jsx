import { BsStar, BsFillStarFill, BsSearch } from "react-icons/bs";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const Users = () => {
  const { users } = useOutletContext();
  const fav = [];
  const [btnState, setBtnState] = useState(false);

  const handleFavorite = (user) => {
    fav.push(user);
    localStorage.setItem("usr", JSON.stringify(fav));
    //setBtnState(!btnState);
    console.log(fav);
  };

  return (
    <div className="users-list">
      <div className="mx-auto bg-light mt-3 border rounded shadow">
        {users && !!users.length ? (
          users.map((user, index) => (
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
                onClick={() => handleFavorite(user)}
              >
                {!btnState ? (
                  <BsStar className="fs-2" />
                ) : (
                  <BsFillStarFill className="fs-2" />
                )}
              </button>
            </div>
          ))
        ) : (
          <p className="d-flex justify-content-center p-3 fs-2">
            no search results...
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
