'use client'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { capitalize, formatNumber } from '../../../../components/utils'
import { GeneralContext } from '../../../../contextProviders/GeneralProvider'
import { deleteFeed, getFeeds, updateFeed } from '../../../../components/api/feed'
import { FiMessageSquare, FiShare2, FiX } from 'react-icons/fi'
import { AiOutlineLike, AiFillLike, AiOutlinePicture } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import Featured from '../../../../components/product/featured'
import PostFeed from './postFeed'
import HotProductFlash from '../../../../components/product/hotProductFlash'
import { SearchIcon } from 'lucide-react'
import FeedFooter from '../../../../components/mobileFooter'
import Image from 'next/image'
import { CommentsModal } from './comments'
import ShareButton from './shareButton'
import HotMobilePreview from '../../../../components/product/hotProductsPreview'

interface Props {
    setShowSearch: (value: boolean) => void
}

const Feeds = () => {
    const { user, feeds, setFeeds } = useContext(GeneralContext)
    const [text, setText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null)
    const [editingFeedId, setEditingFeedId] = useState<number | null>(null)
    const [editTexts, setEditTexts] = useState<Record<number, string>>({})
    const [previewImages, setPreviewImages] = useState<Record<number, string[]>>({})
    const [uploadedImages, setUploadedImages] = useState<Record<number, File[]>>({})
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const result = await getFeeds()
                if (result?.feeds?.length > 0) {
                    setFeeds(result.feeds)
                }
            } catch (err) {
                console.error('Error fetching feeds:', err)
            }
        }

        fetchFeeds()
        if (user?.username) {
            setUsername(user.username)
        }
    }, [user, setFeeds])

    const toggleLike = (postId: string) => {
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }))
    }

    const openActionButtons = (feedId: number) => {
        setActiveMenuId(activeMenuId === feedId ? null : feedId)
    }

    const closeActionButtons = () => {
        setEditingFeedId(null)
        setActiveMenuId(null)
    }

    const openEditMode = (feedId: number) => {
        setEditingFeedId(feedId)
        const feedToEdit = feeds.find(feed => feed.feedId === feedId)
        if (feedToEdit) {
            setEditTexts(prev => ({
                ...prev,
                [feedId]: feedToEdit.text
            }))
            // Initialize with existing images if any
            if (feedToEdit.images?.length > 0) {
                setPreviewImages(prev => ({
                    ...prev,
                    [feedId]: feedToEdit.images
                }))
            }
        }
    }

    const handleImageUpload = (feedId: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            // Validate files
            if (files.some(file => file.size > 5 * 1024 * 1024)) {
                setError('One or more images exceed 5MB limit')
                return
            }

            const newPreviewUrls = files.map(file => URL.createObjectURL(file))
            
            setPreviewImages(prev => ({
                ...prev,
                [feedId]: [...(prev[feedId] || []), ...newPreviewUrls]
            }))
            
            setUploadedImages(prev => ({
                ...prev,
                [feedId]: [...(prev[feedId] || []), ...files]
            }))
        }
    }

    const removeImage = (feedId: number, index: number) => {
        setPreviewImages(prev => {
            const updated = { ...prev }
            if (updated[feedId]) {
                updated[feedId] = updated[feedId].filter((_, i) => i !== index)
                if (updated[feedId].length === 0) {
                    delete updated[feedId]
                }
            }
            return updated
        })
        
        setUploadedImages(prev => {
            const updated = { ...prev }
            if (updated[feedId]) {
                updated[feedId] = updated[feedId].filter((_, i) => i !== index)
                if (updated[feedId].length === 0) {
                    delete updated[feedId]
                }
            }
            return updated
        })
    }

    const triggerFileInput = (feedId: number) => {
        if (fileInputRef.current) {
            fileInputRef.current.setAttribute('data-feed-id', feedId.toString())
            fileInputRef.current.click()
        }
    }
    

    // Update Feed
    const handleUpdateFeed = async (feedId: number) => {
        const userId = user?.id
        try {
            const formData = new FormData()
            formData.append('text', editTexts[feedId] || '')
            formData.append('feedId', feedId.toString())
            formData.append('userId', userId.toString())
            
            // Add new images if any
            const files = uploadedImages[feedId] || []
            files.forEach(file => {
                formData.append('images', file)
            })
            
            
            const response: any = await updateFeed(formData)
            console.log(response)
            
            if (response.ok) {
                const updatedFeeds = await getFeeds()
                setFeeds(updatedFeeds.feeds)
                setEditingFeedId(null)
                setActiveMenuId(null)
                
                // Clean up preview images
                setPreviewImages(prev => {
                    const updated = { ...prev }
                    delete updated[feedId]
                    return updated
                })
                setUploadedImages(prev => {
                    const updated = { ...prev }
                    delete updated[feedId]
                    return updated
                })
            } else {
                setError(response.error)
            }
        } catch (err) {
            console.error('Error updating feed:', err)
            setError('Failed to update post')
        }
    }

    // Delete
    const handleDelete = async (feedId: number)=>{
        try{
        const response = await deleteFeed(feedId)
        console.log(response)
        if(response.ok){
            setFeeds(response.data)
                setEditingFeedId(null)
                setActiveMenuId(null)
        }else{
            setError(response.error)
        }
      }catch(err){
        console.log(err)
      }
    }

    return (
        <div className="pt-2 pb-24 md:pb-12 bg-gray-50 w-full">
            <input 
                type="file" 
                ref={fileInputRef}
                onChange={(e) => {
                    const feedId = parseInt(e.currentTarget.getAttribute('data-feed-id') || '0')
                    handleImageUpload(feedId, e)
                }}
                multiple
                accept="image/*"
                className="hidden"
            />
            
            <div className="mx-auto px-4 max-w-3xl">
                <h2 className="text-2xl font-bold text-green-700 mb-6 text-center bg-white/90 p-3 rounded-lg shadow-sm">
                    {username ? `Welcome back, ${capitalize(username)}!` : 'Talk, Buy & Sell!'}
                </h2>

                {/* Hot product preview */}
                <HotMobilePreview />
                
                <div className={`text-center text-sm ${error ? 'text-red-500' : ''}`}>
                    {error ? error : <HotProductFlash />}
                </div>
                
                {/* Create Post Card */}
                <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200">
                    <PostFeed
                        text={text} 
                        setText={setText} 
                        isTyping={isTyping} 
                        setIsTyping={setIsTyping} 
                        error={error}
                        setError={setError}
                        isEditing={false}
                        
                    />
                </div>
                
              

                {/* No feeds display */}
                {feeds?.length === 0 && (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No posts yet</h3>
                        <p className="text-gray-600">Be the first to share something!</p>
                    </div>
                )}
                
                {/* Feeds Section */}
                <div className="space-y-6">
                    {feeds?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((feed) => (
                        <div key={feed.feedId} className="rounded-xl shadow-md overflow-hidden border border-gray-200 bg-white">
                            {/* Feed Header */}
                            <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-gradient-to-r from-green-700 to-green-500">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-green-700 font-bold">
                                        {feed.postedBy.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">
                                            {capitalize(feed.postedBy)}
                                        </h3>
                                        <p className="text-xs text-white/80">
                                            {new Date(feed.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Action buttons */}
                                <div className="flex gap-2 relative">
                                    {activeMenuId === feed.feedId && (
                                        <div className="absolute right-10 top-0 bg-white shadow-lg rounded-md z-10 p-1 min-w-[120px]">
                                            {user?.username === feed.postedBy ? (
                                                <div className="flex flex-col gap-3">
                                                    <button 
                                                        className="text-xs py-2 px-3 rounded bg-green-600 hover:bg-green-700 text-white text-left"
                                                        onClick={editingFeedId === feed.feedId ? 
                                                            () =>handleUpdateFeed(feed.feedId) : 
                                                            () => openEditMode(feed.feedId)}
                                                    >
                                                        {editingFeedId === feed.feedId ? 'Save' : 'Edit'}
                                                    </button>
                                                    <button className="text-xs py-2 px-3 rounded bg-red-600 hover:bg-red-700 text-white text-left"
                                                    onClick={()=>handleDelete(feed.feedId)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ) : (
                                                <button className="text-xs py-1 px-3 rounded bg-green-600 hover:bg-green-700 text-white">
                                                    See profile
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    
                                    <button 
                                        className="text-white hover:text-gray-200 transition-colors" 
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            activeMenuId === feed.feedId ? 
                                                closeActionButtons() : 
                                                openActionButtons(feed.feedId)
                                        }}
                                    >
                                        <BsThreeDotsVertical size={18} />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Feed Content */}
                            <div className="p-4">
                                {/* Text Section */}
                                <div className="mb-4">
                                    {editingFeedId === feed.feedId ? (
                                        <textarea 
                                            className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-green-300 focus:outline-none"
                                            rows={3}
                                            value={editTexts[feed.feedId] ?? feed.text}
                                            onChange={(e) => setEditTexts(prev => ({
                                                ...prev,
                                                [feed.feedId]: e.target.value
                                            }))}     
                                        />
                                    ) : (
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                            <div className="p-4">
                                                <p className="text-gray-800 leading-relaxed whitespace-pre-line mb-4">
                                                    {feed.text}
                                                </p>
                                            {feed.imageUrl && (
                                            <div className="relative h-64 w-full rounded-md overflow-hidden">
                                                <Image 
                                            src={feed.imageUrl} 
                                            alt='feed image' 
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                            />
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                    )}
                                </div>
                                
                                {/* Image Section */}
                                <div className="mb-4">
                                  
                                    
                                    {(previewImages[feed.feedId]?.length > 0 || feed.images?.length > 0) && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {/* Show edited images first */}
                                            {previewImages[feed.feedId]?.map((img, idx) => (
                                                <div key={`edit-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                                    <Image
                                                        src={img}
                                                        alt={`Post image ${idx + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    {editingFeedId === feed.feedId && (
                                                        <button 
                                                            onClick={() => removeImage(feed.feedId, idx)}
                                                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                                                        >
                                                            <FiX size={14} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            
                                            {/* Show original feed images */}
                                            {feed.images?.map((img: any, idx: number) => (
                                                !previewImages[feed.feedId]?.includes(img) && (
                                                    <div key={`orig-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                                        <Image
                                                            src={img}
                                                            alt={`Post image ${idx + 1}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex justify-between border-t border-gray-100 pt-3">
                                    <button 
                                        className={`flex items-center space-x-1 px-3 py-1 rounded-full ${likedPosts[feed.feedId] ? 'text-blue-600' : 'text-gray-600'} hover:bg-gray-100`}
                                        onClick={() => toggleLike(feed.feedId.toString())}
                                    >
                                        {likedPosts[feed.feedId] ? (
                                            <AiFillLike className="text-lg" />
                                        ) : (
                                            <AiOutlineLike className="text-lg" />
                                        )}
                                        <span className="font-medium text-sm">
                                            {feed.likes + (likedPosts[feed.feedId] ? 1 : 0)}
                                        </span>
                                    </button>

                                    <button className="flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100">
                                        <span className="font-medium text-sm">
                                            {feed.totalSales ? `${formatNumber(feed.totalSales)} in sales` : 'New seller'}
                                        </span>
                                    </button>
                                    
                                    <button className="flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100">
                                        <CommentsModal comments={feed.comments} />
                                        
                                    </button>
                                    
                                    <ShareButton />
                                </div>
                            </div>

                            {/* Store Section */}
                            {feed.store && (
                                <div className="mt-2 bg-gray-50 rounded-b-lg border-t border-gray-200 p-3">
                                    <div className="flex items-center">
                                        <RiVerifiedBadgeFill className="text-green-600 mr-2 text-xl" />
                                        <h3 className="text-sm font-bold text-gray-700">
                                            <a 
                                                href={`/storefront/${encodeURIComponent(feed.store.storeName.toLowerCase())}`}
                                                className="hover:underline"
                                            >
                                                Visit {feed.store.storeName}
                                            </a>
                                        </h3>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <FeedFooter />
        </div>
    )
}

export default Feeds