import Image from 'next/image'
import AddToCartButton from '../cart/addtocartbtn'
import ProductDetails from './productdetails'
import { ProductProps } from '../data/productsdata'
import { SkeletonPage } from '../skeletonPage'


interface AllProductDisplayProps {
    productArray: ProductProps[]
  
}

const AllProductDisplay = ({productArray} : AllProductDisplayProps)=>{

    let star = '★'
    return (

        <div>

            {productArray && productArray.length > 0 ?
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6  ">

             {productArray?.slice(0, 4).map((item, index) => (
            <div key={index} className="bg-green-100 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
                              
                {/* <div className="relative h-48 w-full">
                  <Image src={item.src} alt={item.name} layout="fill" objectFit="cover" />
                </div> */}
                <div className="p-4">
                  <p className="font-semibold text-xl mb-2">{item.name}</p>
                  <p className="text-green-600 text-lg font-bold">N{item.price}</p>
                  {/* <div className="flex items-center mt-2">
                      
                          <span className="text-yellow-400">{star += item.star}</span>
                      
                      <span>({item.totalVotes})</span>
                   </div> */}

                   <span className='text-yellow-700 font-extrabold'>Sold: {item.numOfItemsSold}</span>
                   <span className='text-yellow-700 font-extrabold'>Category: {item.category}</span>
                   <div className="mt-4 flex gap-4">
                   <AddToCartButton targetid={item.id}   />
                   <ProductDetails id={item.id} />
                   </div>
                    
                </div>
            </div>
                    ))}

    </div>: 
    <div className='text-center flex flex-col justify-center items-center'>
        <p>Loading...</p>
        <SkeletonPage />
    </div>}
        </div>
    )
}

export default AllProductDisplay