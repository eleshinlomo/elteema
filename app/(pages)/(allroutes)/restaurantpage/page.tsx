'use client'
import { useContext } from "react"
import { ProductContext } from "../../../../contextProviders/ProductContext"
import DisplayStore from "../dashboard/storepage/displayStore"

const RestaurantsPage = ()=>{
    
    const {Products} = useContext(ProductContext)

    const restaurants = Products.filter((product)=> product.category === 'restaurant')

    return (

        <div className="pt-24 text-center font-bold">
            {restaurants?.length > 0 ?
            <DisplayStore productArray={restaurants} numPerPage={5} /> :
            <p>No restaurant has been listed on Elteema in your city.</p>
        }
        </div>
    )
}

export default RestaurantsPage