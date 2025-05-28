import { useState, useEffect, useContext } from 'react'
import Image from "next/image"
import AllProductDisplay from "../product/ProductsDisplay"
import { CartContext} from "../../contextProviders/cartcontext"
import { createFeed, FeedProps, getFeeds } from "./feedFunctions"
import { GeneralContext } from '../../contextProviders/GeneralProvider'
import { FiX, FiImage, FiShoppingCart, FiPlusCircle } from 'react-icons/fi'
import { RiErrorWarningFill } from 'react-icons/ri'
import { capitalize } from '../utils'

interface PostModalProps {
    text: string;
    setText: (value: string) => void;
    isTyping: boolean;
    setIsTyping: (value: boolean) => void;
}

const PostModal = ({ text, setText, isTyping, setIsTyping }: PostModalProps) => {
    const [error, setError] = useState('')
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const { user, feeds, setFeeds } = useContext(GeneralContext)


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setIsUploading(true)
                const reader = new FileReader()
                reader.onloadend = () => {
                    setImagePreview(reader.result as string)
                    setIsUploading(false)
                }
                reader.readAsDataURL(file)
            
        }
    }

    const onClose = () => {
        setIsTyping(false)
        setImagePreview(null)
    }

    useEffect(() => {
        if (!text) {
            setIsTyping(false)
        }
    }, [text, user, feeds])

    // Create New Feed
    const handleCreateFeed = async () => {
        setError('')
        
        if (!user) {
            setError('Please login to post')
            return
        }

        if (!text.trim()) {
            setError('Post content cannot be empty')
            return
        }

        const image1 = 'image1'
        const userId = user?.id
        const username = user?.username
        let likes = 0
        const comments: any = []
        const store: any = []

        try {
            const response: any = await createFeed(userId, text, image1)
            
            if (response.ok) {
                setIsTyping(false)
                setText('')
                setImagePreview(null)
                const newFeeds = await getFeeds()
                if (newFeeds?.length > 0) {
                    setFeeds(newFeeds)
                }
            } else {
                setError(response.error || 'Failed to create post')
            }
        } catch (err) {
            setError('An unexpected error occurred')
            console.error(err)
        }
    }

    return (
        <>
            {isTyping && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">Create Post</h3>
                            <button 
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {/* User Info */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="font-medium text-gray-800">
                                    {capitalize(user?.username) || 'User'}
                                </span>
                            </div>
                            
                            {/* Text Area */}
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="What's on your mind? Share your thoughts or list an item for sale..."
                                className="w-full min-h-[120px] p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                rows={4}
                            />
                            
                            {/* Error Message */}
                            {error && (
                                <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                                    <RiErrorWarningFill />
                                    <span>{error}</span>
                                </div>
                            )}
                            
                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="mt-4 relative rounded-lg overflow-hidden border border-gray-200">
                                    <Image
                                        src={imagePreview}
                                        alt="Post preview"
                                        width={600}
                                        height={400}
                                        className="w-full h-auto object-cover"
                                    />
                                    <button 
                                        onClick={() => setImagePreview(null)}
                                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition"
                                    >
                                        <FiX size={18} />
                                    </button>
                                </div>
                            )}
                            
                            {/* Upload Options */}
                            <div className="mt-4 flex items-center gap-3">
                                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                                    <FiImage className="text-green-600" />
                                    <span>Photo</span>
                                    <input 
                                        type="file" 
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                    />
                                </label>
                                
                              
                            </div>
                            
                        </div>
                        
                        {/* Modal Footer */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50">
                            <button 
                                onClick={handleCreateFeed}
                                disabled={!text.trim() || isUploading}
                                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2
                                    ${(!text.trim() || isUploading) ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
                                `}
                            >
                                {isUploading ? (
                                    'Uploading...'
                                ) : (
                                    <>
                                        <FiPlusCircle size={18} />
                                        Post
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PostModal