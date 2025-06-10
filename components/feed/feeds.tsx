'use client'
import React, {useState, useEffect, useContext} from 'react'
import { ProductProps } from "../data/productsdata"
import { capitalize } from '../utils'
import { GeneralContext } from '../../contextProviders/GeneralProvider'
import { FeedProps, getFeeds } from './feedFunctions'
import { FiMessageSquare, FiShare2 } from 'react-icons/fi'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import DisplayStore from '../store/displayStore'
import Featured from '../product/featured'
import PostFeed from './postFeed'
import HotProductFlash from '../product/hotProductFlash'
import { SearchIcon } from 'lucide-react'

interface Props {
    setShowSearch: (value: boolean) => void
}

const Feeds = ({setShowSearch}: Props) => {
    
   
    const {user, feeds, setFeeds, userStore, setUserStore} = useContext(GeneralContext)
    const message = 'Loading new items...'
    const [text, setText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    const toggleMenu = (feedId: number) => {
        setActiveMenuId(activeMenuId === feedId ? null : feedId)
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
    }, [text, likedPosts, user, username])

    const toggleLike = (postId: string) => {
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }))
    }
    

    const saveEditedFeed = (newFeed: FeedProps, feedId: number) => {
        // if(newFeed){
        //    setFeeds(prev=>[...prev, newFeed])
        // }
    }

    const updateFeed = (feedId: number) => {
        const feed = feeds.find((f)=>f.feedId === feedId)
        console.log('FEED', feed)
        if(feed){
            setIsEditing(true)
        }
    }

    // useEffect(() => {
    //     const handleClickOutside = (e: MouseEvent) => {
    //         if (!(e.target as HTMLElement).closest('.action-menu-container')) {
    //             closeMenu()
    //         }
    //     }
    //     document.addEventListener('mousedown', handleClickOutside)
    //     return () => document.removeEventListener('mousedown', handleClickOutside)
    // }, [])

    return (
      <div id='new' className='py-2 bg-gray-50 w-full'>
        <div className='mx-auto px-4'>
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center bg-white/90 p-2 rounded-lg shadow-sm">
                {username ? `Welcome back, ${capitalize(username)}!` : 'Talk, Buy & Sell!'}
            </h2>
            
            <div className={`text-center text-sm ${error ? 'text-red-500' : ''}`}>
                {error ? error : <HotProductFlash />}
            </div>
            
            {/* Create Post Card */}
            <div className='bg-green-400 rounded-xl shadow-md p-1 mb-6 border border-gray-200'>
                <PostFeed
                    text={text} 
                    setText={setText} 
                    isTyping={isTyping} 
                    setIsTyping={setIsTyping} 
                    error={error}
                    setError={setError}
                    isEditing={isEditing}
                    setShowSearch={setShowSearch}
                />
                {/* Feed and Search buttons */}
                {/* <span className=' bg-green-600  flex justify-center  py-2'>
                    <SearchIcon />
                    <button className=' text-white px-2' onClick={handleShowSearch}>Search Products</button>
                </span> */}
            </div>
            
            {/* This featured only shows in mobile view */}
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
            <div className='space-y-6'>
                {feeds?.length > 0 && 
                feeds?.sort((a: any,b: any)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((feed, index) => (
                    <div key={index} className='rounded-xl shadow-md overflow-hidden border border-gray-200'>
                        {/* Feed Header */}
                        <div className='p-4 flex justify-between items-center border-b border-gray-100 bg-green-700'>
                            <div className='flex items-center space-x-3'>
                                <div className='h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold'>
                                    {feed.postedBy.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className='font-semibold text-white'>
                                        Posted by: {capitalize(feed.postedBy)}
                                    </h3>
                                </div>
                            </div>
                            
                            {/* Action buttons */}
                            <div className='flex gap-2 relative'>
                                {activeMenuId === feed.feedId && (
                                    <div className='absolute right-10 top-0 text-white shadow-lg rounded-md z-10'>
                                        {user?.username === feed.postedBy ? (
                                            <div className='flex gap-4'>
                                                <button 
                                                    className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white w-full'
                                                    onClick={()=>isEditing ? updateFeed(feed.feedId) : null}
                                                >
                                                    {isEditing ? 'Save' : 'Edit'}
                                                </button>
                                                <button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white'>
                                                    Delete
                                                </button>
                                            </div>
                                        ) : (
                                            <button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white'>
                                                See profile
                                            </button>
                                        )}
                                    </div>
                                )}
                                
                                <button 
                                    className='text-white' 
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toggleMenu(feed.feedId)
                                    }}
                                >
                                    <BsThreeDotsVertical />
                                </button>
                            </div>
                        </div>
                        
                        {/* Feed Content */}
                        <div className=''>
                            {/* Text Section with Action Buttons */}
                            <div className='bg-green-50 rounded-lg p-4 mb-4 border border-green-100 relative pb-12'>
                                <p className='text-green-800 font-medium leading-relaxed text-start   '>
                                    {isEditing ? (
                                        <textarea 
                                            className="w-full bg-white p-2 rounded border border-green-200 focus:ring-1 focus:ring-green-300 focus:outline-none"
                                            rows={3}
                                            defaultValue={feed.text}        
                                        />
                                    ) : (
                                        feed.text
                                    )}
                                </p>
                                
                                {/* Action Buttons positioned at bottom of text area */}
                                <div className='absolute bottom-2 left-4 right-4 flex justify-between'>
                                    <button 
                                        className={`flex items-center space-x-1 px-3 py-1 rounded-full ${likedPosts[feed.feedId] ? 'text-blue-600' : 'text-gray-600'} hover:bg-gray-200`}
                                        onClick={() => toggleLike(feed.feedId.toString())}
                                    >
                                        {likedPosts[feed.feedId] ? (
                                            <AiFillLike className='text-lg' />
                                        ) : (
                                            <AiOutlineLike className='text-lg' />
                                        )}
                                        <span className='font-medium text-sm'>
                                            {feed.likes + (likedPosts[feed.feedId] ? 1 : 0)}
                                        </span>
                                    </button>
                                    
                                    <button className='flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-200'>
                                        <FiMessageSquare className='text-lg' />
                                        <span className='font-medium text-sm'>{feed.comments}</span>
                                    </button>
                                    
                                    <button className='flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-200'>
                                        <FiShare2 className='text-lg' />
                                        <span className='font-medium text-sm'>Share</span>
                                    </button>
                                </div>
                            </div>

                            {/* Store Section */}
                            <div className='mt-4 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden'>
                                <div className='bg-gradient-to-r from-gray-800 to-green-300 p-3 flex items-center'>
                                    <RiVerifiedBadgeFill className='text-white mr-2 text-xl' />
                                    <h3 className='text-lg font-bold text-white'>
                                        {feed.store?.name || 'My Store'}
                                    </h3>
                                </div>
                                <div className='p-4'>
                                    {feed?.store?.items?.length > 0 ? (
                                        <DisplayStore 
                                            productArray={feed.store.items} 
                                            numPerPage={window.innerWidth < 768 ? 1 : 2} 
                                        />
                                    ) : (
                                        <p className='text-gray-400 text-center py-4'>No store items available</p>
                                    )}
                                </div>
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