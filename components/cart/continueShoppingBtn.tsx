import { useRouter } from "next/navigation"

const ContinueShoppingButton = ()=>{

    const router = useRouter()

    return (

        <div>
                  <button
                    onClick={()=>router.push("/supermarketpage")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm text-center transition-colors"
                  >
                    Continue Shopping
                  </button>
        </div>
    )
}

export default ContinueShoppingButton 