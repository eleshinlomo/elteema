import { useRouter } from "next/navigation"

const CheckoutButton = ()=>{

    const router = useRouter()

    return (

        <div>
                  <button
                    onClick={()=>router.push("/dashboard/checkoutpage")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm text-center transition-colors"
                  >
                    Go to Checkout
                  </button>
        </div>
    )
}

export default CheckoutButton