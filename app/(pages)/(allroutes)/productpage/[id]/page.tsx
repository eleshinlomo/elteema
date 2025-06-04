'use client'
import ProductDetails from "../../../../../components/product/productdetails"
import { useParams } from "next/navigation"

const ProductPage = ()=>{

    const params = useParams()
    const id  = params?.id?.toString()
    console.log('product ID', id)

    return (

        <div className="py-2">
           <ProductDetails id={Number(id)} />
        </div>
    )
}

export default ProductPage