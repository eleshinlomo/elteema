'use client'
import { useContext, useState, useEffect } from "react"
import HotelRoomCard, { HotelArrayProps } from "./hotelRoomCard"
import { GeneralContext } from "../../../../contextProviders/GeneralProvider"
import { ProductContext } from "../../../../contextProviders/ProductContext"

const Hotels = ()=>{
    const {Products} = useContext(ProductContext)
    const [hotels, setHotels] = useState([])

    const dummy = [
 {hotelName: 'Strobo',
  roomType: 'Dleuxe',
  price: 5000,
  checkInDate: '12-12-2025',
  checkOutDate: '12-25-2025',
  location: 'Ikeja',
  imageUrl: '',
  rating: '5star',
  amenities: []}
    ]
    
    useEffect(()=>{
    const hotelArray: any  = Products.filter((product)=> product.category === 'hotel') 
    console.log('Hotel Array', hotelArray)
        setHotels(hotelArray || dummy) 
    }, [Products?.length])

    return (

        <div className="pt-24 text-center font-bold">
            <HotelRoomCard hotels={hotels}  />
            
        </div>
    )
}

export default Hotels