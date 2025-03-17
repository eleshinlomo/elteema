import { cookieData } from "./cookiedata";
import { ProductProps } from "./productsdata";


export interface UserProps {
    username: string;
    cookiesAccepted: boolean;
    isLogged: boolean;
    cart: ProductProps[]
}


const BASE_URL  = process.env.NEXT_PUBLIC_BASE_URL

export const getUserData = async ()=>{

    try{
    const response = await fetch(`${BASE_URL}/userdata`, {
       mode: 'cors'
    })
    if(!response) return
    const data: any = await response.json()
    
    if(data.ok) {
        console.log('Data', data)
        return data
    }
    console.log('Unable to fetch')
    return
}catch(err){
    console.log(err)
}
    
}


export const user: UserProps = {
    username: '',
    cookiesAccepted: cookieData.cookieAccepted,
    isLogged: false,
    cart: []
}

export const saveUser = (updatedUser: UserProps)=>{
    if(window  !== null){
       localStorage.setItem('user', JSON.stringify(updatedUser)) 
    }
    return
}

export const getUser = ()=>{
    if(window !== null){
        const userString = localStorage.getItem('user')
        if(userString){
           return JSON.parse(userString) as UserProps
        }
        
    }
    return null
}