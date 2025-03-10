
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
    title: "New",
    path: "/#new",
    newTab: false,
  },
  {
    id: 3,
    title: "BestSellers",
    path: "#bestsellers",
    newTab: false,
  },
  {
    id: 5,
    title: "Men",
    newTab: false,
    submenu: [
      {
        id: 1,
        title: "Bags",
        path: "/farmerspage",
        newTab: false,
      },
      {
        id: 2,
        title: "Shoes",
        path: "/driverspage",
        newTab: false,
      },
      {
        id: 3,
        title: "Clothings",
        path: "/driverspage",
        newTab: false,
      },
    
    ],
  },

  {
    id: 6,
    title: "Women",
    newTab: false,
    submenu: [
      {
        id: 1,
        title: "Bags",
        path: "/farmerspage",
        newTab: false,
      },
      {
        id: 2,
        title: "Shoes",
        path: "/driverspage",
        newTab: false,
      },
      {
        id: 3,
        title: "Clothings",
        path: "/driverspage",
        newTab: false,
      },
    
    ],
  },
  {
    id: 7,
    title: "Kids",
    newTab: false,
    submenu: [
      {
        id: 1,
        title: "Bags",
        path: "/farmerspage",
        newTab: false,
      },
      {
        id: 2,
        title: "Shoes",
        path: "/driverspage",
        newTab: false,
      },
      {
        id: 3,
        title: "Clothings",
        path: "/driverspage",
        newTab: false,
      },
    
    ],
  },
];
export default navData;
