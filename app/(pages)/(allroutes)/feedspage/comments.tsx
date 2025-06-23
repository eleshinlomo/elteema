'use client'
import { useState } from 'react'
import { FiMessageSquare, FiX, FiSend, FiUser } from 'react-icons/fi'

interface Comment {
  id: string
  username: string;
  text: string
  createdAt: string
}

interface CommentsModalProps {
  comments: any[]
}

export const CommentsModal = ({ comments }: CommentsModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [newComment, setNewComment] = useState('')

  const toggleModal = () => setIsOpen(!isOpen)

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your comment submission logic here
    setNewComment('')
  }

  return (
    <>
      <button 
        onClick={toggleModal}
        className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors"
      >
        <FiMessageSquare className="text-lg" />
        <span className="text-sm font-medium">{comments.length}</span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          {/* Modal Container */}
          <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Comments ({comments.length})
              </h3>
              <button 
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.length > 0 ? (
                comments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <FiUser size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {comment.username}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-800 text-sm">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-green-800 text-white p-2 rounded-full disabled:bg-green-300 hover:bg-green-600 transition-colors"
                >
                  <FiSend size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}