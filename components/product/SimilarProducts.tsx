import { useContext, useMemo } from "react"
import { ProductContext } from "../../contextProviders/ProductContext"
import ProductDetails from "./productdetails"
import LatestProducts from "./LatestProducts";

interface SimilarProps {
  product: any;
  productPerPage: number;
}

const SimilarProducts = ({product, productPerPage}: SimilarProps)=>{
  
  const {Products} = useContext(ProductContext)
 const similarProducts = Products.filter(
  (p) => p.category === product.category && p._id !== product._id
);

const shuffledProducts = useMemo(() => {
    if (!similarProducts || similarProducts.length === 0) return []
    return [...similarProducts].sort(() => 0.5 - Math.random())
  }, [similarProducts?.length])

  
  const title = 'Similar Products'

    return (

        <div>
           {shuffledProducts?.length > 1 ? //We use 1 since we removed the matching product.
           <ProductDetails
            text={title}
            productsPerPage={productPerPage}
            productArray={shuffledProducts}
            />:
            <LatestProducts />
            }
        </div>
    )
}

export default SimilarProducts