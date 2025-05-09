

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
    id: 3,
    title: "Farm produce",
    newTab: false,
    submenu: [
      {
        id: 1,
        title: "Grains & Cereals",
        path: "/men/accessories",
        newTab: false,
      },
      {
        id: 2,
        title: "Tubers & Root Crops",
        path: "/men/shoes",
        newTab: false,
      },
      {
        id: 3,
        title: "Legumes & Pulses",
        path: "/men/clothings",
        newTab: false,
      },
      
      {
        id: 3,
        title: "Vegetables",
        path: "/men/clothings",
        newTab: false,
      },
      {
        id: 3,
        title: "Fruits",
        path: "/men/clothings",
        newTab: false,
      },
      {
        id: 3,
        title: "Livestock & Animal Products",
        path: "/men/clothings",
        newTab: false,
      },
      {
        id: 3,
        title: "Processed Farm Products",
        path: "/men/clothings",
        newTab: false,
      },
    
    ],
  },

  {
    id: 4,
    title: "Nigerian clothings",
    newTab: false,
    submenu: [
      {
        id: 3,
        title: "Agbada",
        path: "/men/clothings",
        newTab: false,
      },
      {
        id: 3,
        title: "Party Natives",
        path: "/women/clothings",
        newTab: false,
      },
  
      {
        id: 1,
        title: "Aso Oke men",
        path: "/women/accessories",
        newTab: false,
      },
      {
        id: 1,
        title: "Aso Oke women",
        path: "/women/accessories",
        newTab: false,
      },
      {
        id: 2,
        title: "Adire men",
        path: "/women/shoes",
        newTab: false,
      },
      {
        id: 2,
        title: "Adire women",
        path: "/women/shoes",
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
        title: "Faq",
        path: "/faq",
        newTab: false,
      },
      {
        id: 2,
        title: "Allstores",
        path: "/allstorespage",
        newTab: false,
      },
      {
        id: 3,
        title: "Contact",
        path: "/contactpage",
        newTab: false,
      },
      {
        id: 3,
        title: "Sell on Elteema",
        path: `/sellerspage`,
        newTab: false,
      },
     
    
    ],
  },
];
export default navData;
