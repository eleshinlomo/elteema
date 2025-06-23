'use client'
import { useState, useContext, useRef } from 'react'
import Image from "next/image"
import { GeneralContext } from '../../../../contextProviders/GeneralProvider'
import { FiX, FiImage } from 'react-icons/fi'
import { RiErrorWarningFill } from 'react-icons/ri'
import { capitalize } from '../../../../components/utils'
import { createFeed, CreateFeedProps, getFeeds } from '../../../../components/api/feed'
import { SearchIcon } from 'lucide-react'



export interface PostFeedProps {
    text: string
    setText: (text: string) => void
    isTyping: boolean
    setIsTyping: (typing: boolean) => void
    error: string
    setError: (error: string) => void
    isEditing: boolean
    setShowSearch: (show: boolean) => void
}


const PostFeed = ({ 
    text, 
    setText, 
    isTyping, 
    setIsTyping,
    error, 
    setError, 
    isEditing, 
    setShowSearch 
}: PostFeedProps) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const { user, setFeeds } = useContext(GeneralContext)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState([])

    const handleShowSearch = () => {
        setShowSearch(true)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Validate image size (e.g., 5MB max)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB')
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
            setImageFile(file)
            setError('')
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }


    const handleCreateFeed = async () => {
  if (!text.trim()) {
    setError('Post content cannot be empty');
    return;
  }

  if (!user?.id) {
    setError('You must be logged in to post');
    return;
  }

  try {
    const formData = new FormData();
    
    // Append all fields as strings
    formData.append('userId', user.id.toString());
    formData.append('text', text);
    
    // Append image file if it exists
    if (imageFile) {
      formData.append('image', imageFile); // Key should match what server expects
    }

    // Debug: Log FormData contents
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const result = await createFeed(formData, user.id);
    
    if (result.ok) {
      const updatedFeeds = await getFeeds();
      setFeeds(updatedFeeds.feeds);
      setText('');
      setImagePreview(null);
      setImageFile(null);
      setError('');
      setIsTyping(false);
    } else {
      setError(result.error || 'Failed to create post');
    }
  } catch (err) {
    console.error('Error creating feed:', err);
    setError('There was an error creating your post');
  }
};

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="relative">
                <textarea
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                        setIsTyping(!!e.target.value)
                    }}
                    placeholder="Share your thoughts or list an item for sale..."
                    className="w-full text-gray-800 text-sm min-h-[100px] p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none pr-12"
                    rows={3}
                />
                
                <div className="absolute right-3 bottom-3 flex gap-2">
                    <button 
                        onClick={triggerFileInput}
                        className="text-gray-500 hover:text-green-600 transition-colors"
                        title="Add image"
                    >
                        <FiImage size={20} />
                    </button>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                    
                    <button 
                        onClick={handleShowSearch}
                        className="text-gray-500 hover:text-green-600 transition-colors md:hidden"
                        title="Search"
                    >
                        <SearchIcon size={20} />
                    </button>
                </div>
            </div>
            
            {error && (
                <div className="mt-2 flex items-center gap-2 text-red-500 text-sm bg-red-50 p-2 rounded">
                    <RiErrorWarningFill size={16} />
                    <span>{error}</span>
                </div>
            )}
            
            {imagePreview && (
                <div className="mt-3 relative rounded-md overflow-hidden border border-gray-200">
                    <div className="relative w-full h-48">
                        <Image
                            src={imagePreview}
                            alt="Post preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <button 
                        onClick={() => {
                            setImagePreview(null)
                            setImageFile(null)
                        }}
                        className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-black transition-colors"
                    >
                        <FiX size={16} />
                    </button>
                </div>
            )}
          
            <button 
                onClick={handleCreateFeed}
                disabled={!text.trim()}
                className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors ${
                    !text.trim() 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                }`}
            >
                {isEditing ? 'Update Post' : 'Post'}
            </button>
        </div>
    )
}

export default PostFeed