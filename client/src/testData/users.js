const users = [
  {
    firstName: "Justin",
    lastName: "Wakefield",
    country: "GB",
    email: "testuser@gmail.com",
    id: "user01",
    password: "testPassword",
    followers: ["user02", "user03"],
    following: ["user02"],
    profile:
      "https://c0.wallpaperflare.com/preview/830/646/406/human-interest-people-human-man.jpg",
    profileBackground: "default.jpg",
    favoriteCountries: ["GB", "US", "TH", "JP", "NZ"],
    visitedCountries: ["KP", "RU", "ES"],
  },
  {
    firstName: "Ellen",
    lastName: "Anderson",
    country: "US",
    email: "testuser@gmail.com",
    id: "user02",
    password: "testPassword",
    followers: ["user01"],
    following: ["user01", "user03"],
    profile:
      "https://media.self.com/photos/5be0a54f7942032dd55da480/master/pass/woman-hiking.jpg",
    profileBackground: "default.jpg",
    favoriteCountries: ["GB", "US", "TH", "JP", "NZ"],
    visitedCountries: ["KP", "RU", "ES"],
  },
  {
    firstName: "Jeanne",
    lastName: "Pierre",
    country: "IS",
    email: "testuser@gmail.com",
    id: "user03",
    password: "testPassword",
    followers: ["user01", "user02"],
    following: [],
    profile:
      "https://strapi-images-prod.s3.us-west-1.amazonaws.com/small_rg-profile-picture-1_52c1171691.jpeg",
    profileBackground: "default.jpg",
    favoriteCountries: ["GB", "US", "TH", "JP", "NZ"],
    visitedCountries: ["KP", "RU", "ES"],
  },
];

export default users;
