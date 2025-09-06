
interface ChatbotProps {
    userMessage: null | any;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const chatbot = async (payload: ChatbotProps)=>{
    const response = await fetch(`${BASE_URL}/api/ai/chatbot`, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(!response) return 'No response from server'
    const data = response.json()
    return data
}