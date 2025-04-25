

interface SkeletonProps {
  message: string
}
function SkeletonPage({message}: SkeletonProps) {

  return (
    <div className="flex flex-col space-y-3 text-center">
      <p className="animate-pulse font-bold">{message}</p>
      
    </div>
  )
}

export default SkeletonPage
