'use client'
import { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'

type VideoRecorderProps = {
  onNewVideo: (video: { videoUrl: string, caption: string, userId: string }) => void
}

export default function VideoRecorder({ onNewVideo }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const [caption, setCaption] = useState('')
  const webcamRef = useRef<Webcam>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const handleStartRecording = useCallback(() => {
    const videoElement = webcamRef.current?.video
    if (!videoElement) return

    setIsRecording(true)
    setRecordedChunks([])
    
    // Get stream from webcam
    const stream = videoElement.srcObject as MediaStream
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: 'video/webm'
    })

    // Collect data chunks
    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setRecordedChunks(prev => [...prev, e.data])
      }
    }

    // Start recording with 50ms interval
    mediaRecorderRef.current.start(50)
  }, [])

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }, [])

  const handleSave = useCallback(() => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' })
      const videoUrl = URL.createObjectURL(blob)
      onNewVideo({
        videoUrl,
        caption: caption || 'My video',
        userId: 'current-user'
      })
      setRecordedChunks([])
      setCaption('')
    }
  }, [recordedChunks, caption, onNewVideo])

  return (
    <div className="p-6">
      <Webcam
        audio={true}
        ref={webcamRef}
        videoConstraints={{
          facingMode: 'user',
          width: 1280,
          height: 720
        }}
        className="w-full rounded-lg"
        mirrored
      />
      
      <div className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Add a caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 border rounded"
        />
        
        <div className="flex gap-4">
          {!isRecording ? (
            <button
              onClick={handleStartRecording}
              className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={handleStopRecording}
              className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Stop Recording
            </button>
          )}
          
          {recordedChunks.length > 0 && !isRecording && (
            <button
              onClick={handleSave}
              className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Post Video
            </button>
          )}
        </div>
      </div>
    </div>
  )
}