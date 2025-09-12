
import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext.jsx';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Nav() {
  let { userData, setUserData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext);
  let [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);

      // Clear frontend user state
      setUserData(null);

      setShowProfile(false);
      navigate("/login");
      toast.success("Logged Out Successfully")
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black'>
      {/* Logo */}
      <div className='w-[20%] lg:w-[30%] flex items-center gap-[10px]'>
        <img src={logo} alt="logo" className='w-[30px]' />
        <h1 className='text-[25px] text-black font-sans'>OneCart</h1>
      </div>

      {/* Nav Links */}
      <div className='w-[50%] lg:w-[40%] hidden md:flex'>
        <ul className='flex items-center justify-center gap-[19px] text-white'>
          <li className='text-[15px] bg-[#000000c9] py-[10px] px-[20px] rounded-2xl cursor-pointer hover:bg-slate-500' onClick={() => navigate("/")}>HOME</li>
          <li className='text-[15px] bg-[#000000c9] py-[10px] px-[20px] rounded-2xl cursor-pointer hover:bg-slate-500' onClick={() => navigate("/collection")}>COLLECTIONS</li>
          <li className='text-[15px] bg-[#000000c9] py-[10px] px-[20px] rounded-2xl cursor-pointer hover:bg-slate-500' onClick={() => navigate("/about")}>ABOUT</li>
          <li className='text-[15px] bg-[#000000c9] py-[10px] px-[20px] rounded-2xl cursor-pointer hover:bg-slate-500' onClick={() => navigate("/contact")}>CONTACT</li>
        </ul>
      </div>

      {/* Right Section */}
      <div className='w-[30%] flex items-center justify-end gap-[20px]'>
        {!showSearch && <IoSearchCircleOutline className='w-[38px] h-[38px] text-black cursor-pointer' onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }} />}
        {showSearch && <IoSearchCircleSharp className='w-[38px] h-[38px] text-black cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />}

        {!userData && <FaCircleUser className='w-[29px] h-[29px] text-black cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />}
        {userData && <div className='w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer' onClick={() => setShowProfile(prev => !prev)}>{userData?.name.slice(0, 1)}</div>}

        <MdOutlineShoppingCart className='w-[30px] h-[30px] text-black cursor-pointer hidden md:block' onClick={() => navigate("/cart")} />
        
          <p className='absolute w-[18px] h-[18px] items-center  justify-center bg-black px-[5px] py-[2px] text-white  rounded-full text-[9px] top-[10px] right-[23px] hidden md:block'>{getCartCount()}</p>
      </div>

      {/* Search Box */}
      {showSearch && (
        <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] flex items-center justify-center'>
          <input type="text" className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px]' placeholder='Search Here' onChange={(e) => setSearch(e.target.value)} value={search} />
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10'>
          <ul className='w-full h-full flex flex-col justify-around py-[10px] text-white text-[17px]'>
            {!userData && <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/login"); setShowProfile(false) }}>Login</li>}
            {userData && <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={handleLogout}>Logout</li>}
            <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false) }}>Orders</li>
            <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/about"); setShowProfile(false) }}>About</li>
          </ul>
        </div>
      )}

      {/* Bottom Nav (Mobile) */}
      <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
        <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/")}><IoMdHome className='w-[28px] h-[28px]' /> Home</button>
        <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/collection")}><HiOutlineCollection className='w-[28px] h-[28px]' /> Collections</button>
        <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/contact")}><MdContacts className='w-[28px] h-[28px]' /> Contact</button>
        <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/cart")}><MdOutlineShoppingCart className='w-[28px] h-[28px]' /> Cart</button>
        <p className='absolute w-[18px] h-[18px] bg-white text-black font-semibold text-[9px] rounded-full flex items-center justify-center top-[8px] right-[18px]'>{getCartCount()}</p>
      </div>
    </div>
  )
}

export default Nav
