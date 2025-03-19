import { useState, useEffect, useContext } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog"
import { Button } from "../ui/button"
import Image from 'next/image'
import AddToCartButton from "../cart/addtocartbtn";
import { CartContext } from "../../contextProviders/cartcontext";
import { getProduct } from "../utils";

interface DetailsProps {
  id: number;
}
  

  const ProductDetails = ({id} : DetailsProps)=>{

    const [product, setProduct] = useState<any | null>(null)
    const [error, setError] = useState('')
    const cartContext = useContext(CartContext)
    const {Products} = cartContext

    const handleGetProduct =  ()=>{
       const product: any = getProduct(id, Products)
       if(product){
       console.log(product)
       setProduct(product)
       return product
       }else{
        console.log(product)
        setError('Product not found')
       }
    }

  return (
  <div>

    <div>
    
    <Dialog>
  <DialogTrigger asChild>
  <button 
        className="text-center rounded-2xl font-extrabold  py-2 px-4 bg-green-300"
        onClick={handleGetProduct}
  >
        MORE
  </button>
  </DialogTrigger>
  <DialogContent className="bg-green-200  text-center flex flex-col ">
  {product ? <div>
     <p className="text-center">{error}</p>
     <DialogHeader className="text-center">
          <DialogTitle className="py-8"> {product.name}</DialogTitle>
          {/* <DialogDescription>
            Ideal for parties and comes in high quality material.
          </DialogDescription> */}
        </DialogHeader>
    <div className="flex justify-between">
      {/* Left side */}
       <div>
       <div className='relative h-72 w-[200px]'>
        <Image src={product.src} alt='product image' fill />
        </div>
      </div>

        {/* Right side */}
      <div>
          <div><span className="font-extrabold">Price:</span> N{product.price}</div>
          <AddToCartButton targetid={product.id} />
      </div>
    </div>
    
    
      
    </div> : <div>No product found</div>}
  </DialogContent>
</Dialog>
</div> 


  
</div>
)
  }

  export default ProductDetails
