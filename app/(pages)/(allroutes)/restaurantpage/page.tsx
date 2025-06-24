'use client'
import { useContext } from "react"
import { ProductContext } from "../../../../contextProviders/ProductContext"
import DisplayStore from "../../../../components/displayStore"
import Image from "next/image"

const RestaurantsPage = ()=>{
    
    const {Products} = useContext(ProductContext)

    const restaurants = Products.filter((product)=> product.category === 'restaurant')

    return (

        <div className="pt-24 text-center font-bold">
            {restaurants?.length > 0 ?
            <DisplayStore productArray={restaurants} numPerPage={5} /> :
             <div className="flex flex-col justify-center items-center">
                    <p>No restaurant found in your city</p>
                       <div className="relative h-72 w-72">
                              <Image src='/images/components/girl_funny_face.png' alt='image' fill />
                        </div>
                  </div>
        }
        </div>
    )
}

export default RestaurantsPage