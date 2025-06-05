'use client'

import { useState, useEffect } from "react"
import { UserProps } from "./data/userdata";

interface InitialProps {
 id: number
}

interface UserProfileProps  {
    id: number,
    firstname: string;
    bio: string;
    photo: string;
}

const Users = [
    {
    id: 1,
    firstname: 'Ibikunle',
     bio: 'I am the next big thing in Africa. My ideas are top notch.',
     photo: ''

    },
     {
    id: 2,
    firstname: 'Chika',
    bio: 'My name is Chika. I am the CEO of a rising ecommerce store in Nigeria',
    photo: ''

    }
]
const DisplayUserProfile = ({id}: InitialProps)=>{
  if(!id) return 'Target userid not found'

  const [users, setUsers] = useState<UserProfileProps[]>([])
  const [user, setUser] = useState<UserProfileProps | null>(null)

  useEffect(()=>{
    if(Users?.length > 0){
        setUsers(Users)
    }

    if(users?.length > 0){
        const userFound = users.find((u)=>u.id === id)
        if(userFound){
            setUser(userFound)
        }
    }
  }, [id])

  return (

    <div className="mt-12 text-center">
        {user ?
        <div className="">
          <p>{user.firstname}</p>
          <p>{user.bio}</p>
        </div> :

        <div className="text-center">
           <p>User profile not found</p>
        </div>
        }
    </div>
  )
}

export default DisplayUserProfile