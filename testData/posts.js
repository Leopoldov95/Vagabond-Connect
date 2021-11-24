const posts = [
  {
    id: "post01",
    title: "Hobbiton Adventures",
    country: "NZ",
    // here we will use owner id
    owner: "user02",
    created: "Oct 31, 2021",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non laboriosam nihil aspernatur odit quam eum nostrum laborum, nulla deserunt necessitatibus architecto ratione impedit consequuntur vel ab nesciunt minus esse vitae? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non laboriosam nihil aspernatur odit quam eum nostrum laborum, nulla deserunt necessitatibus architecto ratione impedit consequuntur vel ab nesciunt minus esse vitae?",
    image:
      "https://images.unsplash.com/photo-1462759353907-b2ea5ebd72e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2831&q=80",
    likes: ["user01", "user03"],
    comments: [
      {
        owner: "user01",
        message: "Hella Cool Man!",
      },
    ],
  },
  {
    id: "post02",
    title: "Visiting the Opera House",
    country: "AU",
    // here we will use owner id
    owner: "user01",
    created: "Nov 12, 2021",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non laboriosam nihil aspernatur odit quam eum nostrum laborum, nulla deserunt necessitatibus architecto ratione impedit consequuntur vel ab nesciunt minus esse vitae? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non laboriosam nihil aspernatur odit quam eum nostrum laborum, nulla deserunt necessitatibus architecto ratione impedit consequuntur vel ab nesciunt minus esse vitae?",
    image:
      "https://images.unsplash.com/photo-1526958977630-bc61b30a2009?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    likes: [],
    comments: [
      {
        owner: "user02",
        message: "Wow I'm so jealous",
      },
      {
        owner: "user01",
        message: "You should have saved your money...",
      },
    ],
  },
  {
    id: "post03",
    title: "A evening in Kyoto",
    country: "JP",
    // here we will use owner id
    owner: "user03",
    created: "Sept 24, 2021",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non laboriosam nihil aspernatur odit quam eum nostrum laborum, nulla deserunt necessitatibus architecto ratione impedit consequuntur vel ab nesciunt minus esse vitae? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non laboriosam nihil aspernatur odit quam eum nostrum laborum, nulla deserunt necessitatibus architecto ratione impedit consequuntur vel ab nesciunt minus esse vitae?",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    likes: ["user01", "user02", "user03"],
    comments: [
      {
        owner: "user03",
        id: "use creation ISO time as id and username combination",
        message: "こんにちはハンバーガーが欲しいです",
      },
    ],
  },
];

export default posts;
