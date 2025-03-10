

import { ReactNode } from 'react'
import african_drum from '@/public/images/products/african_drum.jpg'
import dopechick from '@/public/images/products/women/clothes/ankara.jpg'
import senatorBassey from '@/public/images/products/men/clothes/senator_bassey.jpg'
import igaraChicken from '@/public/images/products/men/clothes/men_lace.jpg'
import woman_portrait from '@/public/images/products/woman_portrait.jpg'
import beads from '@/public/images/products/beads.jpg'
import sexy_red_flamingo from '@/public/images/products/women/shoes/sexy_red_flamingo.png'
import freakyheels from '@/public/images/products/women/shoes/freaky_heels.png'
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
        name: 'African Drum',
        price: 10000,
        featured: false,
        trending: true,
        bestseller: false,
        src: african_drum,
        supplierName:'Evelyn Cairo',
        supplierEmail: 'eve@something.com',
        quantity: 1,
        star: '★'

    },
    {   id: 2,
        name: 'Dope Chick',
        price: 12000,
        featured: false,
        trending: true,
        bestseller: false,
        src: dopechick,
        supplierName:'Justin Blakes',
        supplierEmail: 'justin@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 3,
        name: 'Senator Bassey',
        price: 8000,
        featured: false,
        trending: true,
        bestseller: false,
        src: senatorBassey,
        supplierName:'Anthony Perez',
        supplierEmail: 'anthony@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 4,
        name: 'Igara Chicken',
        price: 5.7,
        featured: false,
        trending: true,
        bestseller: false,
        src: igaraChicken,
        supplierName:'Lekan Badmus',
        supplierEmail: 'lekan@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 5,
        name: 'Sexy Red Flamingo',
        price: 5,
        featured: false,
        trending: false,
        bestseller: true,
        src: sexy_red_flamingo,
        supplierName:'Alonzo Murai',
        supplierEmail: 'alonzo@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 6,
        name: 'Freaky Heels',
        price: 8.2,
        featured: false,
        trending: false,
        bestseller: true,
        src: freakyheels,
        supplierName:'Chenzeng Fujito',
        supplierEmail: 'chen@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 7,
        name: 'Woman Bead',
        price: 5.5,
        featured: false,
        trending: false,
        bestseller: true,
        src: beads,
        supplierName:'Gil Andrez',
        supplierEmail: 'gil@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 8,
        name: 'Woman Portrait by Fikor',
        price: 6.75,
        featured: false,
        trending: false,
        bestseller: true,
        src: woman_portrait,
        supplierName:'Ulio Perez',
        supplierEmail: 'u@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 9,
        name: 'Woman Portrait by Fikor',
        price: 6.75,
        featured: false,
        trending: false,
        bestseller: true,
        src: woman_portrait,
        supplierName:'Ulio Perez',
        supplierEmail: 'u@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 10,
        name: 'Woman Portrait by Fikor',
        price: 6.75,
        featured: false,
        trending: false,
        bestseller: true,
        src: woman_portrait,
        supplierName:'Ulio Perez',
        supplierEmail: 'u@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 12,
        name: 'Woman Bead',
        price: 5.5,
        featured: false,
        trending: false,
        bestseller: true,
        src: beads,
        supplierName:'Gil Andrez',
        supplierEmail: 'gil@something.com',
        quantity: 1,
         star: '★'

    },
    {   id: 13,
        name: 'Woman Bead',
        price: 5.5,
        featured: false,
        trending: false,
        bestseller: true,
        src: beads,
        supplierName:'Gil Andrez',
        supplierEmail: 'gil@something.com',
        quantity: 1,
         star: '★'

    },
]