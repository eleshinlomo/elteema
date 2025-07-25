'use client'
import React, { createContext, useState, useEffect } from "react"
import { FeedProps } from "../components/api/feed";
import { ProductProps } from "../components/api/product";
import { UserProps } from "../components/api/users";
import { usePathname } from "next/navigation";

interface GeneralProps {
    children: React.ReactNode
}

export interface GeneralContextInitialProps {
    isLoggedIn: boolean,
    isLoading: boolean;
    userOrders: ProductProps[],
    setUserOrders: (value: ProductProps[])=>void;
    page: string;
    setPage: (value: string)=>void;
    sticky: boolean;
    userStore: ProductProps[];
    setUserStore: (value: null | any)=>void;
    setSticky: (value: boolean)=> void;
    setIsLoading: (value: boolean)=> void;
    setIsLoggedIn: (value: boolean)=> void;
    user: any | null;
    setUser: (value: null)=>void;
    feeds: FeedProps[];
    setFeeds: (value: FeedProps[])=>void
    showSearchPage: boolean;
    setShowSearchPage: (value: boolean)=>void;

}
const initialValues : GeneralContextInitialProps = {
  sticky: false,
  userStore: [],
  userOrders: [],
  setUserOrders: ()=>{},
  page: '',
  setPage: (value: string)=>{},
  setUserStore: ()=>{},
  setSticky: ()=>{},
  isLoggedIn: false,
  setIsLoggedIn: ()=>{},
  isLoading: false,
  setIsLoading: ()=>{},
  user: null,
  setUser: ()=>{},
  feeds: [],
  setFeeds: ()=>{},
  showSearchPage:false, 
  setShowSearchPage: ()=>{},

}


export const GeneralContext = createContext(initialValues)
export const GeneralProvider = ({children}: GeneralProps)=>{

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<UserProps | null>(null)
    const [userStore, setUserStore] = useState<ProductProps[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [sticky, setSticky] = useState(false);
    const [feeds, setFeeds] = useState<FeedProps[]>([])
    const [page, setPage] = useState('Home')
    const [showSearchPage, setShowSearchPage] = useState(false) // Only used in mobile view
    const [userOrders, setUserOrders] = useState<ProductProps[]>([])

    const path = usePathname()
    
  
    

const values : GeneralContextInitialProps = {
    sticky,
    userOrders,
    setUserOrders,
    setSticky,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    setIsLoading,
    user,
    setUser,
    userStore,
    setUserStore,
    feeds,
    setFeeds,
    page,
    setPage,
    showSearchPage, setShowSearchPage
    
}
    return (
    <GeneralContext.Provider value={values}>
        {children}
    </GeneralContext.Provider>
    )
}