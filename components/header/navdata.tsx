
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
    id: 4,
    title: "Dashboard",
    path: "/dashboards/dashboardpage",
    newTab: false,
  },

  {
    id: 4,
    title: "Quick links",
    newTab: false,
    submenu: [
      {
        id: 1,
        title: "Farmers",
        path: "/farmerspage",
        newTab: false,
      },
      {
        id: 2,
        title: "Drive for us",
        path: "/driverspage",
        newTab: false,
      },
      {
        id: 3,
        title: "Contact us",
        path: "/contactpage",
        newTab: false,
      },
      {
        id:4,
        title: "About us",
        path: "/",
        newTab: false,
      },
    
      {
        id: 5,
        title: "Blog",
        path: "/",
        newTab: false,
      },
     
    
    ],
  },
];
export default navData;
