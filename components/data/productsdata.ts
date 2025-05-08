


// import pepperoni from '@/public/images/products/pepperoni.jpg'

// export interface CategoryProps {
//    men: string;
//    women: string;
//    bestseller: string;
//    new: string;
//    trending: string;
   

// }

export interface ProductProps {
    id: number;
    name: string;
    price: number;
    src: any;
    quantity: number;
    star: number;
    totalVotes: number;
    numOfItemsSold: number;
    isAdded: boolean;
    category: string[];
    description: string;
    stock: number,
}


const BASE_URL  = process.env.NEXT_PUBLIC_BASE_URL

export const getProductData = async ()=>{

    try{
    const response = await fetch(`${BASE_URL}/products`, {
       mode: 'cors'
    })
    if(!response) return
    const data: any = await response.json()
    
    if(data.ok) {
        return data
    }
    console.log('Unable to fetch')
    return
}catch(err){
    console.log(err)
}
    
}



// export const Products: ProductProps[] = [
//     {   id: 1,
//         name: 'African Drum',
//         price: 10000,
//         src: african_drum,
//         numOfItemsSold: 8,
//         quantity: 1,
//         star: 3,
//         totalVotes: 200,
//         isAdded: false,
//         category: 'new'

//     },
//     {   id: 2,
//         name: 'Dope Chick',
//         price: 12000,
//         src: dopechick,
//         quantity: 1,
//         star: 4,
//         totalVotes: 8,
//         numOfItemsSold: 10,
//         isAdded: false,
//         category: 'new'

//     },
//     {   id: 3,
//         name: 'Senator Bassey',
//         price: 8000,
//         src: senatorBassey,
//         quantity: 1,
//          star: 5,
//          totalVotes: 7,
//          numOfItemsSold: 3,
//          isAdded: false,
//          category: 'trending'

//     },
//     {   id: 4,
//         name: 'Igara Chicken',
//         price: 5000,
//         src: igaraChicken,
//         quantity: 1,
//         star: 5,
//         totalVotes: 5,
//         numOfItemsSold: 5,
//         isAdded: false,
//         category: 'trending'

//     },
//     {   id: 5,
//         name: 'Sexy Red Flamingo',
//         price: 6000,
//         src: woman_portrait,
//         quantity: 1,
//         star: 5,
//         totalVotes: 5,
//         numOfItemsSold: 6,
//         isAdded: false,
//         category: 'new'

//     },
//     {   id: 6,
//         name: 'Freaky Heels',
//         price: 20000,
//         src: beads,
//         quantity: 1,
//         star: 5,
//         totalVotes: 5,
//         numOfItemsSold: 4,
//         isAdded: false,
//         category: 'bestseller'

//     },
//     {   id: 7,
//         name: 'Woman Bead',
//         price: 10000,
//         src: sexy_red_flamingo,
//         quantity: 1,
//          star: 5,
//          totalVotes: 2,
//          numOfItemsSold: 9,
//         isAdded: false,
//         category: 'bestseller'

//     },
//     {   id: 8,
//         name: 'Woman Portrait by Fikor',
//         price: 7000,
//         src: woman_portrait,
//         quantity: 1,
//         star: 5,
//         totalVotes: 1,
//         numOfItemsSold: 8,
//         isAdded: false,
//         category: 'bestseller'

//     },
//     {   id: 9,
//         name: 'Woman Portrait by Fikor',
//         price: 4000,
//         src: freakyheels,
//         quantity: 1,
//         star: 5,
//         totalVotes: 9,
//         numOfItemsSold: 8,
//         isAdded: false,
//         category: 'trending'

//     },
//     {   id: 10,
//         name: 'Woman Portrait by Fikor',
//         price: 3000,
//         src: woman_portrait,
//         quantity: 1,
//         star: 5,
//         totalVotes: 11,
//         numOfItemsSold: 7,
//         isAdded: false,
//         category: 'trending'

//     },
//     {   id: 12,
//         name: 'Woman Bead',
//         price: 15000,
//         src: sexy_red_flamingo,
//         quantity: 1,
//         star: 5,
//         totalVotes: 5,
//         numOfItemsSold: 5,
//         isAdded: false,
//         category: 'bestseller'

//     },
//     {   id: 13,
//         name: 'Woman Bead',
//         price: 5000,
//         src: woman_portrait,
//         quantity: 1,
//         star: 5,
//         totalVotes: 5,
//         numOfItemsSold: 10,
//         isAdded: false,
//         category: 'new'

//     },
// ]