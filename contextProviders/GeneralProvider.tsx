'use client'
import React, { createContext, useState } from "react"
import { FeedProps } from "../components/feed/feedFunctions";
import { ProductProps } from "../components/data/productsdata";
import { UserProps } from "../components/data/userdata";

interface GeneralProps {
    children: React.ReactNode
}

export interface GeneralContextInitialProps {
    isLoggedIn: boolean,
    isLoading: boolean;
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

}
const initialValues : GeneralContextInitialProps = {
  sticky: false,
  userStore: [],
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

}


export const GeneralContext = createContext(initialValues)
export const GeneralProvider = ({children}: GeneralProps)=>{

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<UserProps | null>(null)
    const [userStore, setUserStore] = useState<ProductProps[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [sticky, setSticky] = useState(false);
    const [feeds, setFeeds] = useState<FeedProps[]>([])

    

const values : GeneralContextInitialProps = {
    sticky,
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
    setFeeds
}
    return (
    <GeneralContext.Provider value={values}>
        {children}
    </GeneralContext.Provider>
    )
}