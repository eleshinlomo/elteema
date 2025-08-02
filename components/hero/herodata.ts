
import slide1 from '../../public/images/hero/market_women.png'
import slide2 from '../../public/images/hero/nigerian_women.png'
import slide3  from '../../public/images/hero/shoes.jpg'
import slide4 from '../../public/images/hero/robot_ai.jpg'
import slide5 from '../../public/images/hero/vegetables.jpg'





export const HeroData = [

   {
    
    content: 'We are bringing the market online',
    path: '/dashboard/createstorepage',
    text: 'Sell on Elteema',
    src: slide1,
    color: 'green'
  },

  {
    
    content: 'Slay the Naija Way! Shop Nigerian Styles Today',
    path: '/categorypage/' + decodeURIComponent('fabrics & textiles'),
    text: 'see fabrics',
    src: slide2,
    color: 'green'
  },
    {
    
    content: 'Bring your shop online! Sell On Elteema!',
    path: '/dashboard/createstorepage',
    text: 'sell products',
    src: slide3,
    color: 'green'
  },

   {
    
    content: 'Elteema AI Shopper coming soon',
    path: '#',
    text: 'shop with AI',
    src: slide4,
    color: 'blue'
  },


  {
    
    content: 'Shop directly from Nigerian farmers',
    path: '/categorypage/' + decodeURIComponent('foodstuff'),
    text: 'buy food stuff',
    src: slide5,
    color: 'green'
  },

   
  
]