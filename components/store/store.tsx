'use client'
import { useContext, useState, useEffect } from "react"
import { GeneralContext } from "../../contextProviders/GeneralProvider"

const Store = ()=>{

  const {user} = useContext(GeneralContext)

  
    const [store, setStore] = useState({
     name: user?.name || '',
     phone: user.phone || ''
  })

  useEffect(()=>{

  }, [store])

    return (

        <div>
          <div className="flex gap-3 pt-20">
               

                    <a href='/'>
                    <button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white '>
                      Add Item
                    </button>
                    </a>

                    <a href='/'>
                    <button className='text-xs py-1 px-2 rounded bg-red-600 hover:bg-green-700 text-white '>
                      Delete store
                    </button>
                  </a>
                  
          </div>

          <div>
             <p>{store.name}</p>
          </div>
        </div>
    )
}
export default Store