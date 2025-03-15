

import { ReactNode } from 'react'
import african_drum from '../../public/images/products/african_drum.jpg'
import dopechick from '../../public/images/products/women/clothes/ankara.jpg'
import senatorBassey from '../../public/images/products/men/clothes/senator_bassey.jpg'
import igaraChicken from '../../public/images/products/men/clothes/men_lace.jpg'
import woman_portrait from '../../public/images/products/woman_portrait.jpg'
import beads from '../../public/images/products/beads.jpg'
import sexy_red_flamingo from '../../public/images/products/women/shoes/sexy_red_flamingo.png'
import freakyheels from '../../public/images/products/women/shoes/freaky_heels.png'
// import pepperoni from '@/public/images/products/pepperoni.jpg'


export interface ProductProps {
    id: number;
    name: string;
    price: number;
    new: boolean;
    trending: boolean;
    bestseller: boolean;
    supplierName: string;
    supplierEmail: string;
    src: any;
    quantity: number;
    star: string;
    totalVotes: number,
    sold: number,
    isAdded: boolean
}

export const Products: ProductProps[] = [
    {   id: 1,
        name: 'African Drum',
        price: 10000,
        new: true,
        trending: false,
        bestseller: false,
        src: african_drum,
        supplierName:'Evelyn Cairo',
        supplierEmail: 'eve@something.com',
        quantity: 1,
        star: '★',
        totalVotes: 200,
        sold: 10,
        isAdded: false

    },
    {   id: 2,
        name: 'Dope Chick',
        price: 12000,
        new: true,
        trending: false,
        bestseller: true,
        src: dopechick,
        supplierName:'Justin Blakes',
        supplierEmail: 'justin@something.com',
        quantity: 1,
        star: '★',
        totalVotes: 8,
        sold: 5,
        isAdded: false

    },
    {   id: 3,
        name: 'Senator Bassey',
        price: 8000,
        new: false,
        trending: true,
        bestseller: false,
        src: senatorBassey,
        supplierName:'Anthony Perez',
        supplierEmail: 'anthony@something.com',
        quantity: 1,
         star: '★',
         totalVotes: 7,
         sold: 25,
         isAdded: false

    },
    {   id: 4,
        name: 'Igara Chicken',
        price: 5000,
        new: false,
        trending: true,
        bestseller: false,
        src: igaraChicken,
        supplierName:'Lekan Badmus',
        supplierEmail: 'lekan@something.com',
        quantity: 1,
        star: '★',
        totalVotes: 5,
        sold: 37,
        isAdded: false

    },
    {   id: 5,
        name: 'Sexy Red Flamingo',
        price: 6000,
        new: true,
        trending: false,
        bestseller: false,
        src: woman_portrait,
        supplierName:'Alonzo Murai',
        supplierEmail: 'alonzo@something.com',
        quantity: 1,
         star: '★',
         totalVotes: 5,
        sold: 5,
        isAdded: false

    },
    {   id: 6,
        name: 'Freaky Heels',
        price: 20000,
        new: false,
        trending: false,
        bestseller: true,
        src: beads,
        supplierName:'Chenzeng Fujito',
        supplierEmail: 'chen@something.com',
        quantity: 1,
         star: '★',
         totalVotes: 5,
        sold: 7,
        isAdded: false

    },
    {   id: 7,
        name: 'Woman Bead',
        price: 10000,
        new: true,
        trending: false,
        bestseller: true,
        src: sexy_red_flamingo,
        supplierName:'Gil Andrez',
        supplierEmail: 'gil@something.com',
        quantity: 1,
         star: '★',
         totalVotes: 2,
        sold: 14,
        isAdded: false

    },
    {   id: 8,
        name: 'Woman Portrait by Fikor',
        price: 7000,
        new: false,
        trending: false,
        bestseller: true,
        src: woman_portrait,
        supplierName:'Ulio Perez',
        supplierEmail: 'u@something.com',
        quantity: 1,
         star: '★',
         totalVotes: 1,
        sold: 13,
        isAdded: false

    },
    {   id: 9,
        name: 'Woman Portrait by Fikor',
        price: 4000,
        new: true,
        trending: false,
        bestseller: true,
        src: freakyheels,
        supplierName:'Ulio Perez',
        supplierEmail: 'u@something.com',
        quantity: 1,
        star: '★',
        totalVotes: 9,
        sold: 20,
        isAdded: false

    },
    {   id: 10,
        name: 'Woman Portrait by Fikor',
        price: 3000,
        new: false,
        trending: false,
        bestseller: true,
        src: woman_portrait,
        supplierName:'Ulio Perez',
        supplierEmail: 'u@something.com',
        quantity: 1,
        star: '★',
        totalVotes: 11,
        sold: 17,
        isAdded: false

    },
    {   id: 12,
        name: 'Woman Bead',
        price: 15000,
        new: false,
        trending: false,
        bestseller: true,
        src: sexy_red_flamingo,
        supplierName:'Gil Andrez',
        supplierEmail: 'gil@something.com',
        quantity: 1,
        star: '★',
        totalVotes: 5,
        sold: 17,
        isAdded: false

    },
    {   id: 13,
        name: 'Woman Bead',
        price: 5000,
        new: false,
        trending: false,
        bestseller: true,
        src: woman_portrait,
        supplierName:'Gil Andrez',
        supplierEmail: 'gil@something.com',
        quantity: 1,
        star: '★',
        totalVotes: 5,
        sold: 6,
        isAdded: false

    },
]