import users from "./users";

export const findOne = (id) => {
  for (let user of users) {
    if (user.id === id) {
      return user;
    }
  }
};
