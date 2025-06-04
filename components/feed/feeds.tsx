'use client'
import React, {useState, useEffect, useContext, ChangeEvent} from 'react'
import { ProductProps } from "../data/productsdata"
import Image from 'next/image'
import { capitalize, searchSingleProduct } from '../utils'
import { CartContext} from '../../contextProviders/cartcontext'
import PostModal from './postFeed'
import HotProductFlash from '../product/hotProductFlash'
import { GeneralContext } from '../../contextProviders/GeneralProvider'
import { FeedProps, getFeeds } from './feedFunctions'
import { FiHeart, FiMessageSquare, FiShare2, FiShoppingCart } from 'react-icons/fi'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import DisplayStore from '../store/displayStore'
import Featured from '../product/featured'
import PostFeed from './postFeed'

interface Props {
    setShowSearch: (value: boolean)=>void
}


const Feeds = ({setShowSearch}: Props) => {

    const handleShowSearch = ()=>{
    setShowSearch(true)
}
   
    const {user, feeds, setFeeds, userStore, setUserStore} = useContext(GeneralContext)
    const message = 'Loading new items...'
    const [text, setText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})
    const [toggleThreeDotsBtn, setToggleThreeDotsBtn] = useState(false)
    const [error, setError] = useState('')
    const [username, setUsername] = useState()
   

    const handleThreeDotBtn = ()=>{
        setToggleThreeDotsBtn(!toggleThreeDotsBtn)
    }
    
    const handleGetFeeds = async () => {
       const initialFeeds: FeedProps[] | any = await getFeeds()
       if(initialFeeds?.feeds?.length > 0) {
             setFeeds(initialFeeds.feeds)
       }
    }

    useEffect(() => {
        handleGetFeeds()
        if(user?.username){
            setUsername(user.username)
        }
    }, [feeds, text, likedPosts, user, username])


//    console.log('FEED', feeds)

    const toggleLike = (postId: string) => {
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }))
    }

    return (
      <div id='new' className='pt-2 bg-gray-50 '>
        <div className='max-w-4xl mx-auto px-4'>
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center bg-white/90 p-2 rounded-lg shadow-sm">
                {username ? `Welcome back, ${capitalize(username)}!` : 'Join the conversation!'}
            </h2>
            
            <div className={`text-center text-sm ${error ? 'text-red-500' : ''} `}>{error ? error : <HotProductFlash />}</div>
            
            {/* Create Post Card */}
            <div className='bg-green-400 rounded-xl shadow-md p-4 mb-6 border border-gray-200'>
                   <PostFeed
                                text={text} 
                                setText={setText} 
                                isTyping={isTyping} 
                                setIsTyping={setIsTyping} 
                                error={error}
                                setError={setError}
                            />
              
                <div className='md:hidden flex justify-center gap-4'>
                    <button className='bg-green-600 text-white px-2' >Feed</button>
                    <button className='bg-green-600 text-white px-2' onClick={handleShowSearch}>Search</button>
                </div>
            </div>

            <div className='md:hidden'>
                <Featured />
            </div>

            {/* No feeds display */}
            {feeds?.length === 0 &&
              <div className='bg-white rounded-xl shadow-md p-8 text-center border border-gray-200'>
                  <h3 className='text-lg font-medium text-gray-800 mb-2'>No posts yet</h3>
                  <p className='text-gray-600'>Be the first to share something!</p>
              </div>
            }
            
            {/* Feeds Section */}
            <div className='space-y-6 '>
                {feeds?.length > 0 && feeds?.sort((a: any,b: any)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((feed, index) => (
                    <div key={index} className='rounded-xl shadow-md overflow-hidden border border-gray-200'>
                        {/* Feed Header */}
                        <div className='p-4 flex justify-between items-center border-b border-gray-100 bg-green-700 '>
                            <div className='flex items-center space-x-3'>
                                <div className='relative'>
                                    <div className='h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold'>
                                        {feed.username.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div>
                                    <a href='/dashboard/customerpage'><h3 className='font-semibold text-white'>
                                        {capitalize(feed.username)}</h3></a>
                                </div>
                            </div>
                            
                            {/* Three dot button */}
                            <div className='flex gap-2'>
                              {toggleThreeDotsBtn ?
                            <div>
                            {/* Only the right user gets to see this buttons */}
                            {user?.userId === feed?.userId ? 
                            <div className='flex flex-col'>
                                <button className='   text-white'>edit</button>
                                <button className='  text-white'>delete</button>
                            </div>:

                             <div className='flex flex-col'>
                                <button className='   text-white'>see profile</button>
                            </div>
                            }

                            </div>
                            : null}

                            <button className='text-white' onClick={handleThreeDotBtn}>
                                <BsThreeDotsVertical />
                            </button>

                          
                            </div>
                        </div>
                        
                        {/* Feed Content */}
                        <div className='p-4 bg-green-600'>
                            <p className='text-white font-extrabold mb-4 leading-relaxed'>{feed.text}</p>

                            {/* Store - Added container with background for better separation */}
                            <div className='mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200'>
                                {feed?.store?.items?.length > 0 ? <DisplayStore productArray={feed.store.items} numPerPage={2} /> : 'No store'}
                            </div>
                        </div>
                        
                        {/* Feed Footer */}
                        <div className='px-4 py-2 border-t border-gray-100 bg-gray-50/95'>
                            <div className='flex justify-between items-center'>
                                <button 
                                    className={`flex items-center space-x-1 px-3 py-1 rounded-full ${likedPosts[feed.feedId] ? 'text-blue-600' : 'text-gray-600'} hover:bg-gray-200`}
                                    onClick={() => toggleLike(feed.feedId.toString())}
                                >
                                    {likedPosts[feed.feedId] ? (
                                        <AiFillLike className='text-lg' />
                                    ) : (
                                        <AiOutlineLike className='text-lg' />
                                    )}
                                    <span className='font-medium'>{feed.likes + (likedPosts[feed.feedId] ? 1 : 0)}</span>
                                </button>
                                
                                <button className='flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-200'>
                                    <FiMessageSquare />
                                    <span className='font-medium'>{feed.comments}</span>
                                </button>
                                
                                <button className='flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-200'>
                                    <FiShare2 />
                                    <span className='font-medium'>Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    )
}

export default Feeds