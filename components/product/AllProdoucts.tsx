import { useContext, useMemo } from "react"
import { ProductContext } from "../../contextProviders/ProductContext"
import ProductDetails from "./productdetails"

const AllProducts = () => {
  const { Products } = useContext(ProductContext)

  // Shuffle products only once when Products change
  const shuffledProducts = useMemo(() => {
    if (!Products || Products.length === 0) return []
    return [...Products].sort(() => 0.5 - Math.random())
  }, [Products])

  return (
    <div>
      {shuffledProducts.length > 0 && (
        <ProductDetails 
          productArray={shuffledProducts} 
          text="Latest Products" 
          productsPerPage={24} 
        />
      )}
    </div>
  )
}

export default AllProducts
