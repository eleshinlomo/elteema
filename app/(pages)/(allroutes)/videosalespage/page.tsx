'use client'
import { useState } from 'react'
import VideoRecorder from '../../../../components/videoSales/videoRecorder'
import VideoFeed from '../../../../components/videoSales/videoFeed'
import { FiPlus, FiX } from 'react-icons/fi'

export type Video = {
  id: string
  videoUrl: string
  caption: string
  likes: number
  userId: string
}

export default function VideoSalesPage() {
  const [showRecorder, setShowRecorder] = useState(false)
  const [videos, setVideos] = useState<Video[]>([])

  const handleNewVideo = (video: Omit<Video, 'id' | 'likes'>) => {
    const newVideo: Video = {
      ...video,
      id: Date.now().toString(),
      likes: 0
    }
    setVideos(prev => [newVideo, ...prev])
    setShowRecorder(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            VideoHub
          </h1>
          <button 
            onClick={() => setShowRecorder(true)}
            className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-all"
          >
            <FiPlus className="text-lg" />
            <span>Create</span>
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-20 pb-10">
        {showRecorder && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl">
              <button 
                onClick={() => setShowRecorder(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
              >
                <FiX className="text-xl" />
              </button>
              <VideoRecorder onNewVideo={handleNewVideo} />
            </div>
          </div>
        )}

        <VideoFeed 
          videos={videos} 
          onOpenRecorder={() => setShowRecorder(true)} 
        />
      </main>

      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowRecorder(true)}
          className="p-4 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600"
        >
          <FiPlus className="text-2xl" />
        </button>
      </div>
    </div>
  )
}