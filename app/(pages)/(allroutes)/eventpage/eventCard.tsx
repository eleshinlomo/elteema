'use client'

import Image from "next/image";

interface HotelProps {
  hotelName: string;
  roomType: string;
  price: any;
  checkInDate: any;
  checkOutDate: Date;
  location: string;
  imageUrl: string;
  rating: string;
  amenities: []
}

export interface EventArrayProps {
    events: HotelProps[]
}
const EventCard = ({events}: EventArrayProps) => {
  return (
    <div className="">
      {events?.length > 0 ?
      
      <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105 hover:shadow-xl">
       {events.map((event, index)=>
      <div key={index}>
      {/* Room Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          className="w-full h-full object-cover"
          src={event.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"} 
          alt={`${event.roomType} at ${event.hotelName}`}
        />
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full flex items-center">
          <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-semibold">{event.rating || "4.8"}</span>
        </div>
      </div>

      {/* Room Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{event.hotelName}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {event.location}
            </p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm font-semibold">
            {event.roomType}
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 my-4">
          {event.amenities.slice(0, 4).map((amenity, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              {amenity}
            </span>
          ))}
          {event.amenities.length > 4 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              +{event.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Price and Booking */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Total for stay</p>
            <p className="text-2xl font-bold text-blue-600">${event.price}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">
              {event.checkInDate} - {event.checkOutDate}
            </p>
            <button className="mt-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
      </div> )}

      </div>: 
      <div className="flex flex-col justify-center items-center">

        <p className="text-center">No event found in your city</p>
        <div className="relative h-72 w-72">
          <Image src='/images/components/girl_funny_face.png' alt='image' fill />
        </div>
      </div>
        }
    </div>
  );
};

export default EventCard;