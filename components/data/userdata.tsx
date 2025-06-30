'use client'
import { ProductProps } from "../api/product"
import { UserProps } from "../api/users"





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

