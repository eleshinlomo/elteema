'use client'
import { useContext, useState, useEffect } from "react"
import { GeneralContext } from "../../../../contextProviders/GeneralProvider"
import { ProductContext } from "../../../../contextProviders/ProductContext"
import EventCard from "./eventCard"

const Hotels = ()=>{
    const {Products} = useContext(ProductContext)
    const [events, setEvents] = useState([])

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
    const eventArray: any  = Products.filter((product)=> product.category === 'hotel') 
    console.log('Hotel Array', eventArray)
        setEvents(eventArray || dummy) 
    }, [Products?.length])

    return (

        <div className="pt-24 text-center font-bold">
            <EventCard events={events} />
        </div>
    )
}

export default Hotels