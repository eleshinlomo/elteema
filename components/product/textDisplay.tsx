import { ProductProps } from "../api/product"
import ProductDetails from "./productdetails"

interface TestProps {
    productArray: ProductProps[]

}
const TestDisplay = ({productArray}: TestProps)=>{

    return (

        <div>
           {productArray?.map((product, index)=>
           <div key={index}>
            <ProductDetails id={product.productId} />
            </div>
        )}
        </div>
    )
}

export default TestDisplay