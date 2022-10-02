let users = JSON.parse(localStorage.getItem("usr")) ?? [];

export function addToFavorite(user) {
  const findUser = users.find((userFind) => userFind.login === user.login);
  if (findUser) return;
  users.push(user);
  localStorage.setItem("usr", JSON.stringify(users));
}

export function removeFromFavorite(user) {
  const rmv = users.findIndex((userLoc) => userLoc.login === user.login);
  if (rmv !== -1) users.splice(rmv, 1);
  localStorage.setItem("usr", JSON.stringify(users));
}

export function getFavorite() {
  return JSON.parse(localStorage.getItem("usr"));
}

export function checkFavorite(user) {
  const findUser = users.find((userFind) => userFind.login === user);
  return findUser !== undefined;
}
