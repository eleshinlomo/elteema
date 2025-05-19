

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
    id: 3,
    title: "Farm",
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
        id: 4,
        title: "Vegetables",
        path: "/men/clothings",
        newTab: false,
      },
      {
        id: 5,
        title: "Fruits",
        path: "/men/clothings",
        newTab: false,
      },
      {
        id: 6,
        title: "Livestock & Animal",
        path: "/men/clothings",
        newTab: false,
      },
      {
        id: 7,
        title: "Processed Products",
        path: "/men/clothings",
        newTab: false,
      },
     
    
    ],
  },

  {
    id: 4,
    title: "Clothings",
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
        title: "Ankara",
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
      {
        id: 3,
        title: "Men Natives",
        path: "/women/clothings",
        newTab: false,
      },
      {
        id: 3,
        title: "Women Natives",
        path: "/women/clothings",
        newTab: false,
      },
 
     
    
    ],
  },
  {
    id: 4,
    title: "Shoes",
    newTab: false,
    submenu: [
      {
        id: 8,
        title: "Women Shoes",
        path: "/men/clothings",
        newTab: false,
      },
      {
        id: 9,
        title: "Men Shoes",
        path: "/men/clothings",
        newTab: false,
      },
    ]
  },
  {
    id: 4,
    title: "Accessories",
    newTab: false,
    submenu: [
      {
        id: 8,
        title: "Women Accessories",
        path: "/men/clothings",
        newTab: false,
      },
      {
        id: 9,
        title: "Men Accessories",
        path: "/men/clothings",
        newTab: false,
      },
    ]
  },
  {
    id: 4,
    title: "Quick links",
    newTab: false,
    submenu: [
      {
        id: 1,
        title: "Customer Dashboard",
        path: "/dashboard/customerpage",
        newTab: false,
      },
     
      {
        id: 4,
        title: "Allstores",
        path: "/allstorespage",
        newTab: false,
      },
     
      {
        id: 6,
        title: "Seller Dashboard",
        path: "/dashboard/sellerpage",
        newTab: false,
      },
      {
        id: 7,
        title: "Sell on Elteema",
        path: `/dashboard/sellerpage`,
        newTab: false,
      },
     
    
    ],
    
  },
  {
    id: 1,
    title: "Terms",
    path: "/",
    newTab: false,
  },
 
];
export default navData;
