import { useState, useEffect, useContext } from 'react'
import Image from "next/image"
import { GeneralContext } from '../../contextProviders/GeneralProvider'
import { FiX, FiImage, FiPlusCircle } from 'react-icons/fi'
import { RiErrorWarningFill } from 'react-icons/ri'
import { capitalize } from '../utils'
import { createFeed, FeedProps, getFeeds } from "./feedFunctions"

const PostFeed = ({ text, setText, isTyping, setIsTyping, error, setError, isEditing }: any) => {
    
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const { user, feeds, setFeeds } = useContext(GeneralContext)
    const [feed, setFeed] = useState<FeedProps | null>(null)

    // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0]
    //     if (file) {
    //         const reader = new FileReader()
    //         reader.onloadend = () => {
    //             setImagePreview(reader.result as string)
    //         }
    //         reader.readAsDataURL(file)
    //     }
    // }

 

    const handleCreateFeed = async () => {
        if (!text.trim()) {
            setError('Post content cannot be empty')
            return
        }

        try {
            const image1 = 'image1'
            if(!user?.id){
                setError('You must be loggedin to post')
                return
            }
            const newFeed = await createFeed(user?.id, text, image1)
            console.log('NEW FEED', newFeed)
            if(newFeed.ok){
            const updatedFeeds = await getFeeds()
            setFeeds(updatedFeeds)
            setIsTyping(false)
            setText('')
            setImagePreview(null)
            setError('')
            }else{
                setError(newFeed.error)
            }
        } catch (err) {
            setError('Failed to create post')
        }
    }

    return (
        <div className="bg-white ">
            <div className="">
                {/* <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div> */}
                
                {/* Input */}
                <div className="flex-1 ">
                    <div className="relative">
                        <textarea
                            value={text}
                            onChange={(e) => setText(isEditing ? feed?.text : e.target.value)}
                            placeholder="Share your thoughts or list an item for sale..."
                            className="w-full text-sm min-h-[40px] p-2  focus:outline-none focus:ring-1 focus:ring-green-500 resize-none pr-20"
                            rows={3}
                        />
                        
                        <div className="absolute right-2 bottom-2 flex gap-2 ">
                            {/* <label className="text-gray-500 hover:text-green-600 cursor-pointer">
                                <FiImage size={20} className='mt-1' />
                                <input 
                                    type="file" 
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                />
                            </label> */}
                            
                            <button 
                                onClick={handleCreateFeed}
                                disabled={!text.trim()}
                                className={`p-1 rounded-full ${
                                    !text.trim() 
                                        ? 'text-gray-400 cursor-not-allowed' 
                                        : 'text-green-600 hover:bg-green-50'
                                }`}
                            >
                                <FiPlusCircle size={20} />
                            </button>
                        </div>
                    </div>
                    
                    {error && (
                        <div className="mt-1 flex items-center gap-1 text-red-500 text-xs">
                            <RiErrorWarningFill size={14} />
                            <span>{error}</span>
                        </div>
                    )}
                    
                    {/* {imagePreview && (
                        <div className="mt-2 relative rounded-md overflow-hidden border border-gray-200">
                            <Image
                                src={imagePreview}
                                alt="Post preview"
                                width={200}
                                height={120}
                                className="w-full h-auto max-h-[120px] object-cover"
                            />
                            <button 
                                onClick={() => setImagePreview(null)}
                                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-0.5"
                            >
                                <FiX size={14} />
                            </button>
                        </div>
                    )} */}
                </div>
                
            
            </div>
        </div>
    )
}

export default PostFeed