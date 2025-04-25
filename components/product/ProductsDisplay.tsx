import Image from 'next/image'
import AddToCartButton from '../cart/addtocartbtn'
import ProductDetails from './productdetails'
import { ProductProps } from '../data/productsdata'
import SkeletonPage from '../skeletonPage'

interface AllProductDisplayProps {
    productArray: ProductProps[]
}

const AllProductDisplay = ({ productArray }: AllProductDisplayProps) => {
    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            {productArray && productArray.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {productArray?.slice(0, 4).map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 group"
                        >
                            {/* Product Image with hover effect */}
                            <div className="relative h-60 w-full overflow-hidden">
                                <Image 
                                    src={item.src} 
                                    alt={item.name} 
                                    layout="fill" 
                                    objectFit="cover"
                                    className="transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Badge for popular items */}
                                {item.numOfItemsSold > 50 && (
                                    <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        Popular
                                    </div>
                                )}
                            </div>
                            
                            {/* Product Info */}
                            <div className="p-5 flex flex-col space-y-3">
                                <div>
                                    <p className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{item.name}</p>
                                    <p className="text-green-600 text-xl font-extrabold">₦{item.price.toLocaleString()}</p>
                                </div>
                                
                                {/* Category and Sales */}
                                <div className="flex justify-between items-center text-sm">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                        {item.category}
                                    </span>
                                    <span className="text-amber-700 font-semibold">
                                        Sold: {item.numOfItemsSold}
                                    </span>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <AddToCartButton 
                                        targetid={item.id} 
                                        
                                    />
                                    <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 px-4 rounded-lg transition-colors">
                                        View Details
                                    </button>
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