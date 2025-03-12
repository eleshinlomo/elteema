import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { getProduct } from "../utils";
import { useState, useEffect } from "react";

interface DetailsProps {
  id: number;
}
  

  const ProductDetails = ({id} : DetailsProps)=>{

    const [product, setProduct] = useState<any | null>(null)
    const [error, setError] = useState('')

    const handleGetProduct = async ()=>{
       const product: any = await getProduct(id)
       if(product){
       console.log(product)
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
  <DialogTrigger>
  <button 
        className="text-center rounded-2xl font-extrabold  px-4 bg-green-300"
        onClick={handleGetProduct}
  >
        MORE
  </button>
  </DialogTrigger>
  <DialogContent className="bg-green-900 text-white text-center flex flex-col justify-center items-center">
  <DialogHeader>
      <DialogTitle className="py-8"> {product ? product.name : 'No Product found'}</DialogTitle>
      <DialogDescription>
        This feature is currently not available.
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
    <div>
    <div>{error ? error : null}</div>
    </div>
  </DialogContent>
</Dialog>
</div> 


  
</div>
)
  }

  export default ProductDetails
