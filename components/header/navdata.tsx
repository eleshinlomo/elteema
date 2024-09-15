
export interface NavProps {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: NavProps[] | any;
};

const navData: NavProps[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Fresh",
    path: "/fresh",
    newTab: false,
  },
  {
    id: 3,
    title: "Diary",
    path: "/diary",
    newTab: false,
  },
  {
    id: 33,
    title: "Suppliers",
    path: "/suppliers",
    newTab: false,
  },
  {
    id: 4,
    title: "Quick links",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "About us",
        path: "/about",
        newTab: false,
      },
      {
        id: 42,
        title: "Contact us",
        path: "/contact",
        newTab: false,
      },
      {
        id: 43,
        title: "Blog",
        path: "/blog",
        newTab: false,
      },
     
    
    ],
  },
];
export default navData;
