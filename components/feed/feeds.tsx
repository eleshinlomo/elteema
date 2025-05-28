import React, {useState, useEffect, useContext, ChangeEvent} from 'react'
import { ProductProps } from "../data/productsdata"
import Image from 'next/image'
import { capitalize, searchSingleProduct } from '../utils'
import { CartContext} from '../../contextProviders/cartcontext'
import PostModal from './postModal'
import HotProductFlash from '../product/hotProductFlash'
import { GeneralContext } from '../../contextProviders/GeneralProvider'
import { FeedProps, getFeeds } from './feedFunctions'
import { FiHeart, FiMessageSquare, FiShare2, FiShoppingCart } from 'react-icons/fi'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import DisplayStore from '../store/displayStore'
import Featured from '../product/featured'

const Feeds = () => {
   
    const {user, feeds, setFeeds, userStore, setUserStore} = useContext(GeneralContext)
    const message = 'Loading new items...'
    const [text, setText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})

    
    const handleGetFeeds = async () => {
       const initialFeeds: FeedProps[] | any = await getFeeds()
       if(initialFeeds?.feeds?.length > 0) {
             setFeeds(initialFeeds.feeds)
       }
    }

    useEffect(() => {
        handleGetFeeds()
    }, [feeds, text, likedPosts, userStore])



    const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsTyping(true)
        const newValue = e.target.value;
        setText(newValue);
    }

    const toggleLike = (postId: string) => {
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }))
    }

    return (
      <div id='new' className='pt-2 bg-gray-50 min-h-screen'>
        <div className='max-w-4xl mx-auto px-4'>
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center bg-white/90 p-2 rounded-lg shadow-sm">
                {user ? `Welcome back, ${capitalize(user.username)}!` : 'Join the conversation!'}
            </h2>
            
            <HotProductFlash />
            
            {/* Create Post Card */}
            <div className='bg-green-200 rounded-xl shadow-md p-4 mb-6 border border-gray-200'>
                <div className='flex items-start space-x-3'>
                    <div className='flex-shrink-0'>
                        <div className='h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold'>
                            {user ? user.firstname.charAt(0).toUpperCase() : 'Y'}
                        </div>
                    </div>
                    <div className='flex-1'>
                        <textarea 
                            className='w-full border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none bg-white text-gray-800'
                            value={text}
                            onChange={handleValueChange}
                            placeholder='Share your thoughts or list an item for sale...' 
                            rows={3}
                        />
                        <div className='flex justify-between items-center mt-3'>
                            <PostModal 
                                text={text} 
                                setText={setText} 
                                isTyping={isTyping} 
                                setIsTyping={setIsTyping} 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='md:hidden'>
                <Featured />
            </div>

            {/* No feeds display */}
            {feeds.length === 0 &&
              <div className='bg-white rounded-xl shadow-md p-8 text-center border border-gray-200'>
                  <h3 className='text-lg font-medium text-gray-800 mb-2'>No posts yet</h3>
                  <p className='text-gray-600'>Be the first to share something!</p>
              </div>
            }
            
            {/* Feeds Section */}
            <div className='space-y-6'>
                {feeds.sort((a: any,b: any)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((feed, index) => (
                    <div key={index} className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-200'>
                        {/* Feed Header */}
                        <div className='p-4 flex justify-between items-center border-b border-gray-100 bg-green-200'>
                            <div className='flex items-center space-x-3'>
                                <div className='relative'>
                                    <div className='h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold'>
                                        {feed.username.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div>
                                    <h3 className='font-semibold text-gray-800'>{capitalize(feed.username)}</h3>
                                </div>
                            </div>
                            <button className='text-gray-500 hover:text-gray-700'>
                                <BsThreeDotsVertical />
                            </button>
                        </div>
                        
                        {/* Feed Content */}
                        <div className='p-4 bg-green-100'>
                            <p className='text-gray-800 mb-4 leading-relaxed'>{feed.text}</p>

                            {/* Store - Added container with background for better separation */}
                            <div className='mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200'>
                                <DisplayStore productArray={userStore} numPerPage={2} />
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