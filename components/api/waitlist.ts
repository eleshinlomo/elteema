
interface CreateWaitListProps {
    email: string
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createWaitList = async (payload: CreateWaitListProps)=>{
    const response = await fetch(`${BASE_URL}/api/prototype/waitlist`, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(!response) return 'No response from server'
    const data = response.json()
    return data
}