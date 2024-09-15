
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
    path: "/",
    newTab: false,
  },
  {
    id: 3,
    title: "Diary",
    path: "/",
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
        path: "/",
        newTab: false,
      },
      {
        id: 42,
        title: "Contact us",
        path: "/",
        newTab: false,
      },
      {
        id: 43,
        title: "Blog",
        path: "/",
        newTab: false,
      },
     
    
    ],
  },
];
export default navData;
