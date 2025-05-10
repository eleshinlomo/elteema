import Image from 'next/image'
import { ProductProps } from '../data/productsdata'
import SkeletonPage from '../skeletonPage'
import { formatCurrency } from '../utils'

interface AllProductDisplayProps {
    productArray: ProductProps[]
}

const AllProductDisplay = ({ productArray }: AllProductDisplayProps) => {
    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            {productArray && productArray.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {productArray?.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 group"
                        >
                            {/* Product Image with hover effect */}
                            <div className="relative h-60 w-full overflow-hidden">
                            <a href={`/productpage/${item.id}`}>
                                <Image 
                                    src={item.src} 
                                    alt={item.name} 
                                    layout="fill" 
                                    objectFit="cover"
                                    className="transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Badge for popular items */}
                                {item.numOfItemsSold > 5 && (
                                    <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        Popular
                                    </div>
                                )}
                                </a>
                            </div>
                            
                            {/* Product Info */}
                            <div className="p-5 flex flex-col space-y-3">
                                <div>
                                    <a href={`/productpage/${item.id}`}>
                                        <p className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{item.name}</p>
                                        <p className="text-green-600 text-xl font-extrabold">{formatCurrency('NGN', item.price)}</p>
                                    </a>
                                </div>
                                
                                {/* Category and Sales */}
                                <div className="flex justify-between items-center text-sm">
                                
                                    <div >
                                    
                                        {item.category.map((cat, index)=>
                                        <a key={index} href={`/categorypage/${encodeURIComponent(cat)}`} className="bg-green-100 text-green-800 px-4 py-1 rounded-full">
                                            {cat}
                                        </a>
                                        )}
                                    
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