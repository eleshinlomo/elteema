import { cookieData } from "./cookiedata";
import { ProductProps } from "./productsdata";


export interface UserProps {
    username: string;
    cookiesAccepted: boolean;
    isLogged: boolean;
    cart: ProductProps[]
}


const BASE_URL  = process.env.NEXT_PUBLIC_BASE_URL

export const getUser = ()=>{
    if(window !== null){
        const userString = localStorage.getItem('ptlgUser')
        if(userString){
           return JSON.parse(userString) as UserProps
        }
        
    }
    return null
}



export const saveUser = (updatedUser: UserProps)=>{
    if(window  !== null){
       localStorage.setItem('ptlgUser', JSON.stringify(updatedUser)) 
    }
    return
}

