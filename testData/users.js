const users = [
  {
    firstName: "Giga",
    lastName: "Chad",
    country: "GB",
    id: "user01",
    password: "testPassword",
    followers: ["user02", "user03"],
    following: ["user02"],
    profile: "https://melmagazine.com/wp-content/uploads/2021/01/66f-1.jpg",
    profileBackground: "default.jpg",
    favoriteCountries: ["GB", "US", "TH", "JP", "NZ"],
    visitedCountries: ["KP", "RU", "ES"],
  },
  {
    firstName: "The",
    lastName: "Wok",
    country: "US",
    id: "user02",
    password: "testPassword",
    followers: ["user01"],
    following: ["user01", "user03"],
    profile: "https://images-cdn.9gag.com/photo/aK7r78Q_700b.jpg",
    profileBackground: "default.jpg",
    favoriteCountries: ["GB", "US", "TH", "JP", "NZ"],
    visitedCountries: ["KP", "RU", "ES"],
  },
  {
    firstName: "Amogus",
    lastName: "",
    country: "IS",
    id: "user03",
    password: "testPassword",
    followers: ["user01", "user02"],
    following: [],
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFEMWnApfnfv6Ce7JYFCVBmrlEF46Diy4pRDST-iOMhB2_xapH3o3q3EE1VqLvGxH1Bp4&usqp=CAU",
    profileBackground: "default.jpg",
    favoriteCountries: ["GB", "US", "TH", "JP", "NZ"],
    visitedCountries: ["KP", "RU", "ES"],
  },
];

export default users;
