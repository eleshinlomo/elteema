

import apple from '@/public/images/products/apples.jpg'
import berries from '@/public/images/products/berries.jpg'
import bellpepper from '@/public/images/products/bell-peppers.jpg'
import cherrytomatoes from '@/public/images/products/cherry-tomatoes.jpg'
import garlic from '@/public/images/products/garlic.jpg'
import grape from '@/public/images/products/grapes.jpg'
import onion from '@/public/images/products/onions.jpg'
import orange from '@/public/images/products/oranges.jpg'
import { ReactNode } from 'react'
// import pepperoni from '@/public/images/products/pepperoni.jpg'


export interface ProductProps {
    id: number;
    name: string;
    price: number;
    trending: boolean;
    bestseller: boolean;
    supplierName: string;
    supplierEmail: string;
    src: any;
    quantity: number;
    star: string;
}

export const Products: ProductProps[] = [
    {   id: 1,
        name: 'apple',
        price: 7.7,
        trending: true,
        bestseller: false,
        src: apple,
        supplierName:'Evelyn Cairo',
        supplierEmail: 'eve@something.com',
        quantity: 1,
        star: '★'

    },
    {   id: 2,
        name: 'rasberry',
        price: 5.56,
        trending: true,
        bestseller: false,
        src: berries,
        supplierName:'Justin Blakes',
        supplierEmail: 'justin@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 3,
        name: 'bell pepper',
        price: 6.78,
        trending: true,
        bestseller: false,
        src: bellpepper,
        supplierName:'Anthony Perez',
        supplierEmail: 'anthony@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 4,
        name: 'tomatoe',
        price: 5.7,
        trending: true,
        bestseller: false,
        src: cherrytomatoes,
        supplierName:'Lekan Badmus',
        supplierEmail: 'lekan@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 5,
        name: 'garlic',
        price: 5,
        trending: false,
        bestseller: true,
        src: garlic,
        supplierName:'Alonzo Murai',
        supplierEmail: 'alonzo@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 6,
        name: 'grape',
        price: 8.2,
        trending: false,
        bestseller: true,
        src: grape,
        supplierName:'Chenzeng Fujito',
        supplierEmail: 'chen@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 7,
        name: 'onion',
        price: 5.5,
        trending: false,
        bestseller: true,
        src: onion,
        supplierName:'Gil Andrez',
        supplierEmail: 'gil@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 8,
        name: 'orange',
        price: 6.75,
        trending: false,
        bestseller: true,
        src: orange,
        supplierName:'Ulio Perez',
        supplierEmail: 'u@something.com',
        quantity: 1,
         star: '★'

    }
]