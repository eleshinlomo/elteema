

import apple from '@/public/images/products/apples.jpg'
import berries from '@/public/images/products/berries.jpg'
import bellpepper from '@/public/images/products/bell-peppers.jpg'
import cherrytomatoes from '@/public/images/products/cherry-tomatoes.jpg'
import garlic from '@/public/images/products/garlic.jpg'
import grape from '@/public/images/products/grapes.jpg'
import onion from '@/public/images/products/onions.jpg'
import orange from '@/public/images/products/oranges.jpg'
import pepperoni from '@/public/images/products/pepperoni.jpg'
import pears from '@/public/images/products/pears.jpg'
import banana from '@/public/images/products/bananas.jpg'
import olives from '@/public/images/products/olives.jpg'
import { ReactNode } from 'react'
// import pepperoni from '@/public/images/products/pepperoni.jpg'


export interface ProductProps {
    id: number;
    name: string;
    price: number;
    featured: boolean;
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
        name: 'apples',
        price: 7.7,
        featured: false,
        trending: true,
        bestseller: false,
        src: apple,
        supplierName:'Evelyn Cairo',
        supplierEmail: 'eve@something.com',
        quantity: 1,
        star: '★'

    },
    {   id: 2,
        name: 'rasberries',
        price: 5.56,
        featured: false,
        trending: true,
        bestseller: false,
        src: berries,
        supplierName:'Justin Blakes',
        supplierEmail: 'justin@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 3,
        name: 'bell peppers',
        price: 6.78,
        featured: false,
        trending: true,
        bestseller: false,
        src: bellpepper,
        supplierName:'Anthony Perez',
        supplierEmail: 'anthony@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 4,
        name: 'tomatoes',
        price: 5.7,
        featured: false,
        trending: true,
        bestseller: false,
        src: cherrytomatoes,
        supplierName:'Lekan Badmus',
        supplierEmail: 'lekan@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 5,
        name: 'garlics',
        price: 5,
        featured: false,
        trending: false,
        bestseller: true,
        src: garlic,
        supplierName:'Alonzo Murai',
        supplierEmail: 'alonzo@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 6,
        name: 'grapes',
        price: 8.2,
        featured: false,
        trending: false,
        bestseller: true,
        src: grape,
        supplierName:'Chenzeng Fujito',
        supplierEmail: 'chen@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 7,
        name: 'onions',
        price: 5.5,
        featured: false,
        trending: false,
        bestseller: true,
        src: onion,
        supplierName:'Gil Andrez',
        supplierEmail: 'gil@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 8,
        name: 'oranges',
        price: 6.75,
        featured: false,
        trending: false,
        bestseller: true,
        src: orange,
        supplierName:'Ulio Perez',
        supplierEmail: 'u@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 9,
        name: 'pepperoni',
        price: 7.7,
        featured: true,
        trending: false,
        bestseller: false,
        src: pepperoni,
        supplierName:'Shibi Lanre',
        supplierEmail: 'eve@something.com',
        quantity: 1,
        star: '★'

    },
    {   id: 10,
        name: 'pears',
        price: 7.7,
        featured: true,
        trending: false,
        bestseller: false,
        src: pears,
        supplierName:'Shibi Lanre',
        supplierEmail: 'eve@something.com',
        quantity: 1,
        star: '★'

    },
    {   id: 11,
        name: 'olives',
        price: 7.7,
        featured: true,
        trending: false,
        bestseller: false,
        src: olives,
        supplierName:'Shibi Lanre',
        supplierEmail: 'eve@something.com',
        quantity: 1,
        star: '★'

    },
    {   id: 12,
        name: 'bananas',
        price: 7.7,
        featured: true,
        trending: false,
        bestseller: false,
        src: banana,
        supplierName:'Shibi Lanre',
        supplierEmail: 'eve@something.com',
        quantity: 1,
        star: '★'

    },
]