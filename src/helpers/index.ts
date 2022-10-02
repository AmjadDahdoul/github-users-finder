let users: any = JSON.parse(localStorage?.getItem("usr")!) || [];

export function addToFavorite(user: any) {
    const findUser = users.find((userFind: any) => userFind.login === user.login);
    if (findUser) return;
    users.push(user);
    localStorage.setItem("usr", JSON.stringify(users));
}

export function removeFromFavorite(user: any) {
    const rmv = users.findIndex((userLoc: any) => userLoc.login === user.login);
    if (rmv !== -1) users.splice(rmv, 1);
    localStorage.setItem("usr", JSON.stringify(users));
}

export function getFavorite() {
    return JSON.parse(localStorage.getItem("usr")!);
}

export function checkFavorite(user: any) {
    const findUser = users.find((userFind: any) => userFind.login === user);
    return findUser !== undefined;
}
