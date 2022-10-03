import { BsStar, BsFillStarFill, BsSearch } from "react-icons/bs";
import { Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  addToFavorite,
  checkFavorite,
  removeFromFavorite,
} from "../helpers";

const Users = () => {
  const { fetchedUsers }: any = useOutletContext();
  const [users, setUsers]: any = useState(fetchedUsers);

  const handleFavorite = (user: any) => {
    if (user.isFavorite) {
      removeFromFavorite(user);
    } else {
      addToFavorite(user);
    }
    user.isFavorite = !user.isFavorite;
    setUsers(users.flat());
  };

  useEffect(() => {
    setUsers(
      fetchedUsers.map((user: any) => {
        return { ...user, isFavorite: checkFavorite(user.login) };
      })
    );
  }, [fetchedUsers]);

  return (
    <div className="users-list">
      {users && !!users.length ? (
        <div className="mx-auto bg-light mt-3 border rounded shadow">

          {users.map((user: any, index: number) => (
            <div
              key={index}
              className="d-flex flex-column flex-lg-row mx-3 border-bottom p-2 align-items-center justify-content-between"
            >
              <Link to={`/users/${user.login}`}
                className="d-flex flex-column flex-lg-row align-items-center user-info text-lg-start text-sm-center"
              >
                <img
                  className="img-fluid rounded-circle user-image"
                  src={user.avatar_url}
                />
                <div className="ms-4">
                  <h4 className="m-0 mb-1 ">@{user.login}</h4>
                  <p className="bio m-0">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </Link>
              <button
                className="bg-light border-0"
                onClick={() => handleFavorite(user)}
              >
                {!user.isFavorite ? (
                  <BsStar className="fs-2" />
                ) : (
                  <BsFillStarFill color="#F2C94C" className="fs-2" />
                )}
              </button>
            </div>
          ))}
        </div>
      ) : <p className="d-flex justify-content-center p-3 fs-2">
        no search results...
      </p>
      }
    </div>
  )
}
export default Users;


