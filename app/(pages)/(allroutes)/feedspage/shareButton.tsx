'use client'
import { FiShare2 } from 'react-icons/fi'

const ShareButton = ({ 
  title = 'Check this out', 
  text = 'I found this interesting', 
  url = window.location.href 
}) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Use native share dialog on mobile devices
        await navigator.share({
          title,
          text,
          url,
        })
      } else if (navigator.clipboard) {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
      } else {
        // Final fallback: Open mailto link
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`)
      }
    } catch (err) {
      console.error('Error sharing:', err)
      // Fallback if Web Share API fails
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank')
    }
  }

  return (
    <button 
      onClick={handleShare}
      className="flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
    >
      <FiShare2 className="text-lg" />
      <span className="font-medium text-sm">Share</span>
    </button>
  )
}

export default ShareButton