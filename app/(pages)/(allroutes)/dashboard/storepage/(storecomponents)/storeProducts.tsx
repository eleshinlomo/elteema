'use client';

import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../../../../../contextProviders/GeneralProvider";
import { deleteProduct, ProductProps } from "../../../../../../components/api/product";
import { updateLocalUser } from "../../../../../../components/data/userdata";
import { Store } from "lucide-react";



const StoreProducts = () => {
  const {user, setUser} = useContext(GeneralContext)
  const [storeProducts, setStoreProducts] = useState<ProductProps[]>(user?.store?.items)

   const handleDeleteProduct = async (productId: number)=>{
  const userId = user.id
    const response = await deleteProduct(userId, productId)
    if(response.ok){
      const updatedUser = response.data
      updateLocalUser(updatedUser)
      setUser(updatedUser)
      setStoreProducts(updatedUser.store.items)
    }
    console.log(response)
 }


useEffect(()=>{

}, [storeProducts])





  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">All Products</h2>
        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {storeProducts?.length > 0 ? storeProducts.map((product) => 
        <div key={product.productId}>
          <div  className="flex items-center">
            <img
              src={product.src}
              alt={product.productName}
              className="w-12 h-12 rounded-md object-cover"
              loading="lazy"
              width={48}
              height={48}
            />
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-800">{product.productName}</h3>
                <span className="text-sm font-medium text-gray-800">N{product.price.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500">{product.category}</p>
              <div className="mt-1 flex justify-between">
                <span className="text-xs text-gray-500">{product.numOfItemsSold} sold</span>
                <span className="text-xs font-medium text-blue-500">Total Sales: N{product.totalSales.toFixed(2)}</span>
              </div>
            </div>
             </div>

             {/* Action buttons */}
             <div className="flex gap-2 pt-2">
               <button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white'>
                  View or Edit
               </button>
               <button className='text-xs py-1 px-2 rounded bg-red-600 hover:bg-red-700 text-white'
                onClick={()=>handleDeleteProduct(product.productId)}
               >
                  Delete
               </button>
            </div>

          </div>
          ) : 
          <div>
            You have no product in your store.
          </div>
        
      }
      </div>
    </div>
  );
};

export default StoreProducts;