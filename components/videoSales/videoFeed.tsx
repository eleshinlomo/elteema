'use client'
import { useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Video } from '../../app/(pages)/(allroutes)/videosalespage/page'

type VideoFeedProps = {
  videos: Video[]
  onOpenRecorder: () => void
}

export default function VideoFeed({ videos, onOpenRecorder }: VideoFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(videos.length - 1)

  const onSwipe = (direction: string) => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const handleLike = (videoId: string) => {
    console.log('Liked video:', videoId)
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-gray-500 text-lg">No videos yet</p>
        <button
          onClick={onOpenRecorder}
          className="px-6 py-3 bg-pink-500 text-white rounded-full"
        >
          Create First Video
        </button>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[80vh]">
      {videos.map((video, index) => (
        <TinderCard
          key={video.id}
          onSwipe={onSwipe}
          preventSwipe={['up', 'down']}
          className={`absolute w-full h-full ${index === currentIndex ? 'block' : 'hidden'}`}
        >
          <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
            <video
              src={video.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white text-xl font-bold">{video.caption}</h3>
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => handleLike(video.id)}
                  className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center"
                >
                  ❤️
                </button>
                <span className="text-white">{video.likes} likes</span>
              </div>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  )
}