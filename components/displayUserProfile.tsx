'use client'

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"

interface InitialProps {
  id: number
}

// interface UserProfileProps {
//   id: number,
//   firstname: string;
//   bio: string;
//   photo: string;
// }

// const Users = [
//   {
//     id: 1,
//     firstname: 'Ibikunle',
//     bio: 'I am the next big thing in Africa. My ideas are top notch.',
//     photo: ''
//   },
//   {
//     id: 2,
//     firstname: 'Chika',
//     bio: 'My name is Chika. I am the CEO of a rising ecommerce store in Nigeria',
//     photo: ''
//   }
// ]

// const DisplayUserProfile = ({ id }: InitialProps) => {
//   if (!id) return <div className="mt-12 text-center">Target userid not found</div>

//   const [users, setUsers] = useState<UserProfileProps[]>([])
//   const [user, setUser] = useState<UserProfileProps | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   // useEffect(() => {
//   //   // Simulate loading data
//   //     const handleCondition = ()=>{
//   //       if (Users?.length > 0) {
//   //       setUsers(Users)
//   //       const userFound = Users.find((u) => u.id === id)
//   //       if (userFound) {
//   //         setUser(userFound)
//   //       }
//   //     }
//   //     setIsLoading(false)
//   //   }

//   //   handleCondition()
    

   
//   // }, [id])

//   return (
//     <div className="mt-12 text-center">
//       <AnimatePresence mode="wait">
//         {isLoading ? (
//           <motion.div
//             key="loading"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="flex justify-center"
//           >
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//               className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"
//             />
//           </motion.div>
//         ) : user ? (
//           <motion.div
//             key="user-profile"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               className="mb-4"
//             >
//               <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold">
//                 {user.firstname.charAt(0)}
//               </div>
//             </motion.div>
//             <motion.h2 
//               className="text-2xl font-bold text-green-700 mb-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.1 }}
//             >
//               {user.firstname}
//             </motion.h2>
//             <motion.p
//               className="text-gray-600"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               {user.bio}
//             </motion.p>
//           </motion.div>
//         ) : (
//           <motion.div
//             key="not-found"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="p-6 text-gray-500"
//           >
//             User profile not found
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }
const DisplayUserProfile = ({id} : InitialProps)=>{
    return (
      <div></div>
    )
}
export default DisplayUserProfile