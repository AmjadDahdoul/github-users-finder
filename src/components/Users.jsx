import { BsStar, BsFillStarFill, BsSearch } from "react-icons/bs";
import { Router, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Users = () => {
  const { users } = useOutletContext();
  const navigate = useNavigate();
  const [fav, setFav] = useState([]);
  const [btnState, setBtnState] = useState(false);

  const handleFavorite = (user) => {
    setFav((prev) => [...prev, user]);
    localStorage.setItem("usr", JSON.stringify(fav));
    //setBtnState(!btnState);
    console.log(fav);
  };

  const handleOnClick = (link) => {
    navigate(link);
  };

  useEffect(() => {
    let locS = JSON.parse(localStorage.getItem("usr")) || [];
    setFav(locS);
  }, []);

  return (
    <div className="users-list">
      <div className="mx-auto bg-light mt-3 border rounded shadow">
        {users && !!users.length ? (
          users.map((user, index) => (
            <div
              key={index}
              className="d-flex flex-column flex-lg-row mx-3 border-bottom p-2 align-items-center justify-content-between"
            >
              <div
                className="d-flex align-items-center user-info"
                onClick={() => handleOnClick(`/users/${user.login}`)}
              >
                <img
                  className="img-fluid rounded-circle user-image"
                  src={user.avatar_url}
                />
                <div className="ms-4">
                  <h4>@{user.login}</h4>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>
              <button
                className="bg-light border-0"
                onClick={() => handleFavorite(user)}
              >
                {!btnState ? (
                  <BsStar className="fs-2" />
                ) : (
                  <BsFillStarFill className="fs-2 " />
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
