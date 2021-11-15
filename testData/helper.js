import users from "./users";

export const findOne = (id) => {
  for (let user of users) {
    console.log(user);
    console.log(id);
    if (user.id === id) {
      console.log("match!!");
      return user;
    }
  }
};
