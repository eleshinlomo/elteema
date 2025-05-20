'use client'
import { ProductProps } from "./productsdata";


export interface UserProps {
    id:number;
    name:  string;
    authCode: string;
    username: string;
    email: string;
    cart: ProductProps[],
    isLoggedIn: boolean;
    type:  string;
    role:  string;
    createdAt:  string;
    cookiesAccepted: boolean;
    phone:  string;
    address:  string;
    state: string;
    ewsletter: boolean;
    
}


const BASE_URL  = process.env.NEXT_PUBLIC_BASE_URL

export const getLocalUser = ()=>{
    
    if(typeof window !== 'undefined'){
        const userString = localStorage.getItem('ptlgUser')
        if(userString){
           return JSON.parse(userString) 
        }else{
            return null
        }
        
    }
    return null
}



export const updateUser = (updatedUser: UserProps)=>{
    if(!updatedUser) return null
    if(typeof window  !== 'undefined'){
       localStorage.setItem('ptlgUser', JSON.stringify(updatedUser)) 
    }
    return null
}

