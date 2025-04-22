
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
    title: "Contact",
    path: "/contactpage",
    newTab: false,
  },

  {
    id: 3,
    title: "Men",
    newTab: false,
    submenu: [
      {
        id: 1,
        title: "Accessories",
        path: "/men/accessories",
        newTab: false,
      },
      {
        id: 2,
        title: "Shoes",
        path: "/men/shoes",
        newTab: false,
      },
      {
        id: 3,
        title: "Clothings",
        path: "/men/clothings",
        newTab: false,
      },
    
    ],
  },

  {
    id: 4,
    title: "Women",
    newTab: false,
    submenu: [
  
      {
        id: 1,
        title: "Accessories",
        path: "/women/accessories",
        newTab: false,
      },
      {
        id: 2,
        title: "Shoes",
        path: "/women/shoes",
        newTab: false,
      },
      {
        id: 3,
        title: "Clothings",
        path: "/women/clothings",
        newTab: false,
      },
    
    ],
  },
  {
    id: 4,
    title: "Quick links",
    newTab: false,
    submenu: [
      {
        id: 1,
        title: "FAQ",
        path: "/faq",
        newTab: false,
      },
      {
        id: 2,
        title: "Allstores",
        path: "/allstores",
        newTab: false,
      },
     
    
    ],
  },
];
export default navData;
