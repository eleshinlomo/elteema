'use client'
import { ProductProps } from "../api/product"


export interface UserProps {
    id:number;
    firstname:  string;
    lastname:  string;
    authCode: string;
    username: string;
    email: string;
    cart: ProductProps[],
    isLoggedIn: boolean;
    type:  string;
    role:  string;
    createdAt:  string;
    gender: string;
    cookiesAccepted: boolean;
    phone:  string;
    address:  string;
    city: string;
    state: string;
    newsletter: boolean;
    store: null;
    paymentEmail: string;
    paymentMethod: string;
    
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


// Must setUser(updatedUser) everytime updateUser fucntion runs
export const updateLocalUser = (updatedUser: UserProps)=>{
    if(!updatedUser) return null
    if(typeof window  !== 'undefined'){
       localStorage.setItem('ptlgUser', JSON.stringify(updatedUser)) 
    }
    return null
}

