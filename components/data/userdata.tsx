'use client'



export interface UserProps {
    id:number;
    name:  string;
    authCode: string;
    username: string;
    email: string;
    cart: [],
    isLoggedIn: boolean;
    type:  string;
    role:  string;
    createdAt:  string;
    cookiesAccepted: boolean;
    phone:  string;
    address:  string;
    ewsletter: boolean;
    location: string;
}


const BASE_URL  = process.env.NEXT_PUBLIC_BASE_URL

export const getUser = ()=>{
    if(typeof window !== 'undefined'){
        const userString = localStorage.getItem('ptlgUser')
        if(userString){
           return JSON.parse(userString) 
        }
        
    }
    return null
}



export const saveUser = (updatedUser: UserProps)=>{
    if(typeof window  !== 'undefined'){
       localStorage.setItem('ptlgUser', JSON.stringify(updatedUser)) 
    }
    return
}

