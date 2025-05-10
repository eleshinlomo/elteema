
'use client'
import ProductCategory from "../../../../../components/product/productCategory"
import { useParams } from "next/navigation"

const ProductCategoryPage = ()=>{

    const params = useParams()
    const category  = params?.category?.toString()
    

    return (

        <div className="pt-32">
           <ProductCategory category={category} />
        </div>
    )
}

export default ProductCategoryPage