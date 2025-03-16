import { cookieData } from "./cookiedata";
import { ProductProps } from "./productsdata";

export interface UserProps {
    username: string;
    cookiesAccepted: boolean;
    isLogged: boolean;
    cart: ProductProps[]
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