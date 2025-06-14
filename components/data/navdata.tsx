

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
    title: "About",
    path: "/aboutpage",
    newTab: false,
  },
  {
    id: 4,
    title: "Faq",
    path: "/faqpage",
    newTab: false,
  },
      
     
      {
        id: 7,
        title: "Sell on Elteema",
        path: `/dashboard`,
        newTab: false,
      },
    
      {
        id: 7,
        title: "Deliver for Elteema",
        path:`/driverpage`,
        newTab: false,
      },
       {
        id: 7,
        title: "Restaurants",
        path:`/restaurantpage`,
        newTab: false,
      },
       {
        id: 7,
        title: "Hotels",
        path:`/hotelpage`,
        newTab: false,
      },
  
  {
    id: 4,
    title: "Quick links",
    newTab: false,
    submenu: [

  
      {
    id: 3,
    title: "About",
    path: "/aboutpage",
    newTab: false,
  },
  {
    id: 4,
    title: "Faq",
    path: "/faqpage",
    newTab: false,
  },
      
     
      {
        id: 7,
        title: "Sell on Elteema",
        path: `/dashboard/createstore`,
        newTab: false,
      },
    
      {
        id: 7,
        title: "Deliver for Elteema",
        path:`/driverpage`,
        newTab: false,
      },
      //   {
      //   id: 7,
      //   title: "Video Sales",
      //   path: `/videosalespage`,
      //   newTab: false,
      // },
     
    
    ],
    
  },

 
];
export default navData;
