import womandress1 from '@/public/images/products/woman-8996552_640.jpg'
import womandress2 from '@/public/images/products/woman-7411414_640.png'
import womandress3 from '@/public/images/products/woman-2178816_1280.jpg'
import womandress4 from '@/public/images/products/model-5660011_640.jpg'
import womandress5 from '@/public/images/products/fashion-3083861_640.jpg'
import womandress6 from '@/public/images/products/bride-2319466_640.jpg'
import React from 'react'

import apple from '@/public/images/products/apples.jpg'
import berries from '@/public/images/products/berries.jpg'
import bellpepper from '@/public/images/products/bell-peppers.jpg'
import cherrytomatoes from '@/public/images/products/cherry-tomatoes.jpg'
import garlic from '@/public/images/products/garlic.jpg'
import grape from '@/public/images/products/grapes.jpg'
import onion from '@/public/images/products/onions.jpg'
import orange from '@/public/images/products/oranges.jpg'
import pepperoni from '@/public/images/products/pepperoni.jpg'


export interface ProductProps {
    id: number;
    name: string;
    price: number;
    trending: boolean;
    bestseller: boolean;
    src: any
}

export const Products: ProductProps[] = [
    {   id: 1,
        name: 'apple',
        price: 7.7,
        trending: true,
        bestseller: false,
        src: apple

    },
    {   id: 2,
        name: 'berries',
        price: 5.56,
        trending: true,
        bestseller: false,
        src: berries

    },
    {   id: 3,
        name: 'bell pepper',
        price: 6.78,
        trending: true,
        bestseller: false,
        src: bellpepper

    },
    {   id: 4,
        name: 'tomatoes',
        price: 5.7,
        trending: true,
        bestseller: false,
        src: cherrytomatoes

    },
    {   id: 5,
        name: 'garlic',
        price: 5,
        trending: false,
        bestseller: true,
        src: garlic

    },
    {   id: 6,
        name: 'grape',
        price: 8.2,
        trending: false,
        bestseller: true,
        src: grape

    },
    {   id: 7,
        name: 'onion',
        price: 5.5,
        trending: false,
        bestseller: true,
        src: onion

    },
    {   id: 8,
        name: 'orange',
        price: 6.75,
        trending: false,
        bestseller: true,
        src: orange

    }
]