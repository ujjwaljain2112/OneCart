// import React, { useContext, useState } from 'react'
// import ai from "../assets/ai.png"
// import { shopDataContext } from '../context/ShopContext'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import open from "../assets/open.mp3"
// function Ai() {
//   let {showSearch , setShowSearch} = useContext(shopDataContext)
//   let navigate = useNavigate()
//   let [activeAi,setActiveAi] = useState(false)
//   let openingSound = new Audio(open)

//  function speak(message){
// let utterence=new SpeechSynthesisUtterance(message)
// window.speechSynthesis.speak(utterence)
//   }


//   const speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
//   const recognition = new speechRecognition()
//    if(!recognition){
//     console.log("not supported")
//   }

//   recognition.onresult = (e)=>{
//     const transcript = e.results[0][0].transcript.trim();
//  if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch){
//       speak("opening search")
//       setShowSearch(true) 
//       navigate("/collection")
//     }
//     else if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showSearch){
//       speak("closing search")
//       setShowSearch(false) 
      
//     }
//      else if(transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products")){
//       speak("opening collection page")
//       navigate("/collection")
//     }
//     else if(transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage") ){
//       speak("opening about page")
//       navigate("/about")
//       setShowSearch(false) 
//     }
//      else if(transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("homepage") ){
//       speak("opening home page")
//       navigate("/")
//       setShowSearch(false) 
//     }
//      else if(transcript.toLowerCase().includes("cart")  || transcript.toLowerCase().includes("kaat")  || transcript.toLowerCase().includes("caat")){
//       speak("opening your cart")
//       navigate("/cart")
//       setShowSearch(false) 
//     }
//     else if(transcript.toLowerCase().includes("contact")){
//       speak("opening contact page")
//       navigate("/contact")
//       setShowSearch(false) 
//     }
   
//      else if(transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("my order")){
//       speak("opening your orders page")
//       navigate("/order")
//       setShowSearch(false) 
//     }
//     else{
//       toast.error("Try Again")
//     }

//   }
//   recognition.onend=()=>{
//    setActiveAi(false)
//   }
//   return (
//     <div className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] ' onClick={()=>{recognition.start();
//     openingSound.play()
//     setActiveAi(true)
//     }}>
//       <img src={ai} alt="" className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125 ' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform` } style={{
//         filter: ` ${activeAi?"drop-shadow(0px 0px 30px #00d2fc)":"drop-shadow(0px 0px 20px black)"}`
//       }}/>
//     </div>
//   )
// }

// // export default Ai
import React, { useContext, useState, useEffect, useRef } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"

function Ai() {
  let { showSearch, setShowSearch } = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)
  let openingSound = new Audio(open)

  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase()
      console.log("🎤 Transcript:", transcript)

      if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
        speak("Opening search")
        setShowSearch(true)
        navigate("/collection")
      } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
        speak("Closing search")
        setShowSearch(false)
      } else if (
        transcript.includes("collection") ||
        transcript.includes("collections") ||
        transcript.includes("product") ||
        transcript.includes("products")
      ) {
        speak("Opening collection page")
        navigate("/collection")
      } else if (transcript.includes("about")) {
        speak("Opening about page")
        navigate("/about")
        setShowSearch(false)
      } else if (transcript.includes("home")) {
        speak("Opening home page")
        navigate("/")
        setShowSearch(false)
      } 
      else if (transcript.includes("open my cart")) {   // ✅ check this FIRST
      speak("Opening your cart")
      navigate("/cart")
      setShowSearch(false)
    } else if (
       transcript.includes("cart") ||
      transcript.includes("kaat") ||
      transcript.includes("caat")
    ) {
    speak("Opening your cart")
    navigate("/cart")
    setShowSearch(false)
  } 
      else if (transcript.includes("contact")) {
        speak("Opening contact page")
        navigate("/contact")
        setShowSearch(false)
      } else if (
        transcript.includes("order") ||
        transcript.includes("myorders") ||
        transcript.includes("orders") ||
        transcript.includes("my order")
      ) {
        speak("Opening your orders page")
        navigate("/order")
        setShowSearch(false)
      } else if (transcript.includes("logout") || transcript.includes("log out")) { 
        // ✅ new logout command
        speak("Logging you out")
        // clear session (depends on how you store auth)
        localStorage.clear()
        sessionStorage.clear()
        navigate("/login")
      } else {
        // toast.error("Give expected voice")
        speak("This Page not Exists")
        navigate("/login")
      }
    }

    recognition.onend = () => {
      setActiveAi(false)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [navigate, setShowSearch, showSearch])

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const handleClick = () => {
    if (activeAi) return
    if (recognitionRef.current) {
      recognitionRef.current.start()
      openingSound.play()
      setActiveAi(true)
    }
  }

  const handleMouseLeave = () => {
    if (recognitionRef.current && activeAi) {
      recognitionRef.current.stop()
      setActiveAi(false)
    }
  }

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={ai}
        alt="AI Assistant"
        className={`w-[100px] cursor-pointer ${
          activeAi
            ? "translate-x-[10%] translate-y-[-10%] scale-125"
            : "translate-x-[0] translate-y-[0] scale-100"
        } transition-transform`}
        style={{
          filter: `${
            activeAi
              ? "drop-shadow(0px 0px 30px #00d2fc)"
              : "drop-shadow(0px 0px 20px black)"
          }`,
        }}
      />
    </div>
  )
}

export default Ai
