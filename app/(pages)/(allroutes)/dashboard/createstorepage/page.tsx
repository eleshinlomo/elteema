'use client'
import { useContext } from "react"
import CreateStore from "../../../../../components/store/createStore"
import { GeneralContext } from "../../../../../contextProviders/GeneralProvider"
import { useRouter } from "next/navigation"

const CreateStorePage = ()=>{

    const {user} = useContext(GeneralContext)
  const router = useRouter()

  //    if(user?.store?.name){
  //   router.push('/dashboard/userpage')
  // }

    return (

        <div>
            <CreateStore />
        </div>
    )
}

export default CreateStorePage