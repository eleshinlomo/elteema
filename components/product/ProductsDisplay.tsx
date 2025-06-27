import Image from 'next/image'
import { ProductProps } from '../api/product'
import SkeletonPage from '../skeletonPage'
import { formatCurrency } from '../utils'
import PopularBadge from './popularBadge'

interface AllProductDisplayProps {
    productArray: ProductProps[]
}

const AllProductDisplay = ({ productArray }: AllProductDisplayProps) => {
    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            {productArray && productArray.length > 0 ? (
                <div className="">
                    {productArray?.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 group"
                        >
                            {/* Product Image with hover effect */}
                            <div className="relative h-60 w-full overflow-hidden">
                            <a href={`/productpage/${item.productId}`}>
                                <Image 
                                    src={item.images[0]} 
                                    alt={item.productName} 
                                    fill
                                    objectFit="cover"
                                    className="transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Badge for popular items */}
                                <PopularBadge item={item} />
                                </a>
                            </div>
                            
                            {/* Product Info */}
                            <div className="p-5 flex flex-col space-y-3">
                                <div>
                                    <a href={`/productpage/${item.productId}`}>
                                        <p className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{item.productName}</p>
                                        <p className="text-green-600 text-xl font-extrabold">{formatCurrency('NGN', item.price)}</p>
                                    </a>
                                </div>
                                
                                {/* Category and Sales */}
                                <div className="flex flex-col justify-between  text-sm">
                                
                                    <div className='flex gap-1' >
                                    
                                        
                                        <a key={index} href={`/categorypage/${encodeURIComponent(item.category)}`} className="bg-green-100 px-2  ">
                                            {item.category}
                                        </a>
                                        
                                    
                                    </div>
                                
                                    <span className="text-amber-700 font-semibold">
                                        Sold: {item.numOfItemsSold}
                                    </span>
                                </div>
                                
                              
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products available at the moment</p>
                </div>
            )}
        </div>
    )
}

export default AllProductDisplay