// import React, { createContext, useContext, useEffect, useState } from 'react'
// import { authDataContext } from './authContext.jsx'
// import axios from 'axios'

// export const userDataContext = createContext()
// function UserContext({children}) {
//     let [userData,setUserData] = useState("")
//     let {serverUrl} = useContext(authDataContext)


//    const getCurrentUser = async () => {
//         try {
//             let result = await axios.get(serverUrl + "/api/user/getcurrentuser",{withCredentials:true})

//             setUserData(result.data)
//             console.log(result.data)

//         } catch (error) {
//             setUserData(null)
//             console.log(error)
//         }
//     }

//     useEffect(()=>{
//      getCurrentUser()
//     },[])



//     let value = {
//      userData,setUserData,getCurrentUser
//     }
    
   
//   return (
//     <div>
//       <userDataContext.Provider value={value}>
//         {children}
//       </userDataContext.Provider>
//     </div>
//   )
// }

// export default UserContext

import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext.jsx'
import axios from 'axios'

export const userDataContext = createContext()

function UserContext({ children }) {
  let [userData, setUserData] = useState(null)   // ✅ use null instead of ""
  let { serverUrl } = useContext(authDataContext)

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/getcurrentuser", { withCredentials: true })
      setUserData(result.data)
      console.log("Current User:", result.data)
    } catch (error) {
      setUserData(null)
      console.log("Error fetching current user:", error)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  let value = {
    userData,
    setUserData,
    getCurrentUser
  }

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext
