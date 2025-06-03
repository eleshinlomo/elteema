import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import { CartContext } from '../../contextProviders/cartcontext'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import AddToCartButton from '../cart/addtocartbtn'
import BuyNowButton from '../cart/buyNowBtn'
import ProductSize from '../product/productSize'
import { capitalize, formatCurrency } from '../utils'
import PopularBadge from '../product/popularBadge'
import { ProductContext } from '../../contextProviders/ProductContext'
import { ProductProps } from '../data/productsdata'

interface StoreProps {
    productArray: ProductProps[];
    numPerPage: number;
}

const DisplayStore = ({ productArray, numPerPage }: StoreProps) => {
    const [error, setError] = useState('')
    const [isAdded, setIsAdded] = useState(false)
    const { cart } = useContext(CartContext)
    const { 
        Products,
        oldSize,
        setOldSize,
        showClotheSizeInput,
        setShowClotheSizeInput,
        showShoeSizeInput,
        setShowShoeSizeInput
    } = useContext(ProductContext)

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = numPerPage
    const totalPages = Math.ceil(productArray?.length / itemsPerPage)
    const currentItems = productArray?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage,
    )

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    useEffect(() => {
        setCurrentPage(0)
    }, [productArray])

    return (
        <div>
            {productArray?.length > 0 && (
                <div className='relative'>
                    <div className={`grid ${currentItems.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-3 mb-2`}>
                        {currentItems.map((item, StoreIndex) => (
                            <div key={StoreIndex} className='border border-gray-200 rounded-lg p-2 hover:shadow-md transition-shadow'>
                                <div className='flex flex-col h-full'>
                                    <a href={`/productpage/${item.id}`} className='flex flex-col h-full'>
                                        <div className='relative aspect-[4/3] w-full flex-shrink-0 rounded-md overflow-hidden'>
                                            <Image 
                                                src={item.src} 
                                                alt={item.name}
                                                fill
                                                className='object=cover'
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            <PopularBadge item={item} />
                                        </div>
                                        <div className='mt-1 flex-grow'>
                                            <div className='flex justify-between items-start'>
                                                <h5 className='text-sm font-medium text-gray-800 line-clamp-1 flex-grow'>
                                                    {item.name}
                                                </h5>
                                                <span className='text-xs text-gray-500 ml-1'>{item.numOfItemsSold} sold</span>
                                            </div>
                                            <p className='text-green-600 font-bold text-sm mt-0.5'>{formatCurrency('NGN', item.price)}</p>
                                            <div className='flex items-center mt-0.5'>
                                                <div className='flex items-center text-yellow-400'>
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className={`w-2.5 h-2.5 ${i < item.totalVotes ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className='text-xs text-gray-500 ml-1'>({item.totalVotes})</span>
                                            </div>
                                        </div>
                                    </a>
                                    
                                    {/* Size Selector */}
                                    <div className="mb-2">
                                        <ProductSize 
                                            targetId={item.id} 
                                            isAdded={isAdded} 
                                            setIsAdded={setIsAdded} 
                                            error={error}
                                            setError={setError}
                                            showClotheSizeInput={showClotheSizeInput}
                                            setShowClotheSizeInput={setShowClotheSizeInput}
                                            showShoeSizeInput={showShoeSizeInput}
                                            setShowShoeSizeInput={setShowShoeSizeInput} 
                                        />
                                    </div>
                                    
                                    {/* Action Buttons - Wrapped in container to control size */}
                                    <div className="mt-1 flex justify-between gap-1 text-xs">
                                        {!item.isAdded ? (
                                            <>
                                                <div className="">
                                                    <AddToCartButton 
                                                        targetid={item.id}  
                                                        oldSize={oldSize}
                                                        isAdded={item.isAdded} 
                                                        setIsAdded={setIsAdded} 
                                                        setError={setError}
                                                        showClotheSizeInput={showClotheSizeInput}
                                                        showShoeSizeInput={showShoeSizeInput}
                                                    />
                                                </div>
                                                <div className="">
                                                    <BuyNowButton 
                                                        targetid={item.id} 
                                                        oldSize={oldSize}
                                                        setError={setError} 
                                                        showClotheSizeInput={showClotheSizeInput}
                                                        showShoeSizeInput={showShoeSizeInput}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <a href="/checkoutpage" className="">
                                                <button className="w-full py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white">
                                                    Checkout
                                                </button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className='flex justify-center items-center mt-2 space-x-3'>
                            <button 
                                onClick={prevPage}
                                disabled={currentPage === 0}
                                className={`p-1 rounded-full ${currentPage === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <FiChevronLeft size={14} />
                            </button>
                            <span className='text-xs text-gray-600'>
                                {currentPage + 1}/{totalPages}
                            </span>
                            <button 
                                onClick={nextPage}
                                disabled={currentPage === totalPages - 1}
                                className={`p-1 rounded-full ${currentPage === totalPages - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <FiChevronRight size={14} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default DisplayStore