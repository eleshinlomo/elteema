'use client'
import React, { createContext, useState } from "react"
import { FeedProps } from "../app/(pages)/(allroutes)/feedspage/feedFunctions";
import { ProductProps } from "../components/api/product";
import { UserProps } from "../components/data/userdata";

interface GeneralProps {
    children: React.ReactNode
}

export interface GeneralContextInitialProps {
    isLoggedIn: boolean,
    isLoading: boolean;
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

}
const initialValues : GeneralContextInitialProps = {
  sticky: false,
  userStore: [],
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
    setFeeds,
    page,
    setPage
}
    return (
    <GeneralContext.Provider value={values}>
        {children}
    </GeneralContext.Provider>
    )
}