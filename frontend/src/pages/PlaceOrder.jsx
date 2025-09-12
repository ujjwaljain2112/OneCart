// import React, { useContext, useState } from 'react'
// import Title from '../component/Title'
// import CartTotal from '../component/CartTotal'
// import razorpay from '../assets/Razorpay.jpg'
// import { shopDataContext } from '../context/ShopContext'
// import { authDataContext } from '../context/authContext'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import Loading from '../component/Loading'

// function PlaceOrder() {
//     let [method,setMethod] = useState('cod')
//     let navigate = useNavigate()
//     const {cartItem , setCartItem , getCartAmount , delivery_fee , products } = useContext(shopDataContext)
//     let {serverUrl} = useContext(authDataContext)
//     let [loading ,setLoading] = useState(false)

//     let [formData,setFormData] = useState({
//         firstName:'',
//     lastName:'',
//     email:'',
//     street:'',
//     city:'',
//     state:'',
//     pinCode:'',
//     country:'',
//     phone:''
//     })

//     const onChangeHandler = (e)=>{
//     const name = e.target.name;
//     const value = e.target.value;
//     setFormData(data => ({...data,[name]:value}))
//     }

//     const initPay = (order) =>{
//         const options = {
//       key:import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name:'Order Payment',
//       description: 'Order Payment',
//       order_id: order.id,
//       receipt: order.receipt,
//       handler: async (response) => {
//         console.log(response)
//     const {data} = await axios.post(serverUrl + '/api/order/verifyrazorpay',response,{withCredentials:true})
//     if(data){
//         navigate("/order")
//         setCartItem({})

//     }
//       }}
//     const rzp = new window.Razorpay(options)
//     rzp.open()
//    }

    
//      const onSubmitHandler = async (e) => {
        
//     setLoading(true)
//         e.preventDefault()
//     try {
//       let orderItems = []
//       for(const items in cartItem){
//         for(const item in cartItem[items]){
//           if(cartItem[items][item] > 0){
//             const itemInfo = structuredClone(products.find(product => product._id === items))
//             if(itemInfo){
//                itemInfo.size = item
//                itemInfo.quantity = cartItem[items][item]
//                orderItems.push(itemInfo)
//             }
//           }
//         }
//       }
//       let orderData = {
//         address:formData,
//         items:orderItems,
//         amount:getCartAmount() + delivery_fee
//       }
//       switch(method){
//         case 'cod': 
      
//         const result = await axios.post(serverUrl + "/api/order/placeorder" , orderData , {withCredentials:true})
//         console.log(result.data)
//         if(result.data){
//             setCartItem({})
//             toast.success("Order Placed")
//             navigate("/order")
//             setLoading(false)

//         }else{
//             console.log(result.data.message)
//             toast.error("Order Placed Error")
//              setLoading(false)
//         }

//         break;

//         case 'razorpay':
//         const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay" , orderData , {withCredentials:true})
//         if(resultRazorpay.data){
//           initPay(resultRazorpay.data)
//            toast.success("Order Placed")
//            setLoading(false)
//         }

//         break;




//         default:
//         break;

//       }
    
      
//     } catch (error) {
//       console.log(error)
    
//     }
//      }
//   return (
//     <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px]  relative'>
//         <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center  lg:mt-[0px] mt-[90px] '>
//             <form action="" onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]'>
//         <div className='py-[10px]'>
//         <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
//         </div>
//         <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

//          <input type="text" placeholder='First name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'required  onChange={onChangeHandler} name='firstName' value={formData.firstName}/>

//           <input type="text" placeholder='Last name' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='lastName' value={formData.lastName} />
//         </div>

//         <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
//           <input type="email" placeholder='Email address' className='w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]'required onChange={onChangeHandler} name='email' value={formData.email} />
         
//         </div>
//         <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
//           <input type="text" placeholder='Street' className='w-[100%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='street' value={formData.street} />
         
//         </div>
//         <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
//           <input type="text" placeholder='City' className='w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='city' value={formData.city} />
//           <input type="text" placeholder='State' className='w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='state' value={formData.state} />
//         </div>
//         <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
//           <input type="text" placeholder='Pincode' className='w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='pinCode' value={formData.pinCode} />
//           <input type="text" placeholder='Country' className='w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='country' value={formData.country} />
//         </div>
//          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
//           <input type="text" placeholder='Phone' className='w-[100%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]' required onChange={onChangeHandler} name='phone' value={formData.phone} />
         
//         </div>
//         <div>
//           <button type='submit' className='text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] absolute lg:right-[20%] bottom-[10%] right-[35%] border-[1px] border-[#80808049] ml-[30px] mt-[20px]' >{loading? <Loading/> : "PLACE ORDER"}</button>
//          </div> 


//             </form>

       
//         </div>
//          <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px] '>
//             <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%]  flex items-center justify-center gap-[10px] flex-col'>
//                 <CartTotal/>
//                 <div className='py-[10px]'>
//         <Title text1={'PAYMENT'} text2={'METHOD'}/>
//         </div>
//         <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]'>
//         <button onClick={()=>setMethod('razorpay')} className={`w-[150px] h-[50px] rounded-sm  ${method === 'razorpay' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}> <img src={razorpay} className='w-[100%] h-[100%] object-fill rounded-sm ' alt="" /></button>
//         <button onClick={()=>setMethod('cod')} className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}>CASH ON DELIVERY </button>
//         </div>
//             </div>
//         </div>
      
//     </div>
//   )
// }

// export default PlaceOrder
// import React, { useContext, useState } from 'react';
// import Title from '../component/Title';
// import CartTotal from '../component/CartTotal';
// import { shopDataContext } from '../context/ShopContext';
// import { authDataContext } from '../context/authContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Loading from '../component/Loading';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// function PlaceOrder() {
//     const [method, setMethod] = useState('cod');
//     const navigate = useNavigate();
//     const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext);
//     const { serverUrl } = useContext(authDataContext);
//     const [loading, setLoading] = useState(false);

//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         street: '',
//         city: '',
//         state: '',
//         pinCode: '',
//         country: '',
//         phone: ''
//     });

//     const onChangeHandler = (e) => {
//         const { name, value } = e.target;
//         setFormData(data => ({ ...data, [name]: value }));
//     };

//     const orderItems = Object.keys(cartItem).flatMap(itemId =>
//         Object.keys(cartItem[itemId])
//             .filter(size => cartItem[itemId][size] > 0)
//             .map(size => {
//                 const productInfo = structuredClone(products.find(p => p._id === itemId));
//                 productInfo.size = size;
//                 productInfo.quantity = cartItem[itemId][size];
//                 return productInfo;
//             })
//     );

//     const totalAmount = getCartAmount() + delivery_fee;

//     const handleCODOrder = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const result = await axios.post(serverUrl + "/api/order/placeorder", {
//                 address: formData,
//                 items: orderItems,
//                 amount: totalAmount
//             }, { withCredentials: true });

//             if (result.data) {
//                 setCartItem({});
//                 toast.success("Order Placed");
//                 navigate("/order");
//             } else {
//                 toast.error("Order Placement Error");
//             }
//         } catch (err) {
//             console.log(err);
//             toast.error("Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleStripePayment = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const stripe = await stripePromise;
//             const elements = stripe ? stripe.elements() : null;
//             if (!stripe || !elements) return;

//             // Create PaymentIntent
//             const { data } = await axios.post(serverUrl + '/api/order/stripe', {
//                 address: formData,
//                 items: orderItems,
//                 amount: totalAmount
//             }, { withCredentials: true });

//             const card = elements.getElement(CardElement);
//             const result = await stripe.confirmCardPayment(data.clientSecret, {
//                 payment_method: { card }
//             });

//             if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
//                 await axios.post(serverUrl + '/api/order/verifystripe', { paymentIntentId: result.paymentIntent.id }, { withCredentials: true });
//                 setCartItem({});
//                 toast.success('Payment Successful');
//                 navigate('/order');
//             } else {
//                 toast.error('Payment Failed');
//             }
//         } catch (err) {
//             console.log(err);
//             toast.error('Payment Error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-center justify-center gap-[50px] relative px-4 md:px-10 py-10'>

//             {/* Delivery Form */}
//             <div className='lg:w-[50%] w-[100%] flex items-center justify-center mt-[20px] lg:mt-0'>
//                 <form onSubmit={method === 'cod' ? handleCODOrder : (e) => e.preventDefault()} className='lg:w-[70%] w-[100%] flex flex-col gap-4 bg-[#1a1a1a] p-6 rounded-3xl shadow-lg shadow-black/50'>
//                     <Title text1="DELIVERY" text2="INFORMATION" />

//                     <div className='w-full flex gap-2'>
//                         <input type="text" name='firstName' placeholder='First name' required value={formData.firstName} onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white px-4'/>
//                         <input type="text" name='lastName' placeholder='Last name' required value={formData.lastName} onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white px-4'/>
//                     </div>

//                     <input type="email" name='email' placeholder='Email' required value={formData.email} onChange={onChangeHandler} className='w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white px-4'/>
//                     <input type="text" name='street' placeholder='Street' required value={formData.street} onChange={onChangeHandler} className='w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white px-4'/>
                    
//                     <div className='w-full flex gap-2'>
//                         <input type="text" name='city' placeholder='City' required value={formData.city} onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white px-4'/>
//                         <input type="text" name='state' placeholder='State' required value={formData.state} onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white px-4'/>
//                     </div>

//                     <div className='w-full flex gap-2'>
//                         <input type="text" name='pinCode' placeholder='Pincode' required value={formData.pinCode} onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white px-4'/>
//                         <input type="text" name='country' placeholder='Country' required value={formData.country} onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white px-4'/>
//                     </div>

//                     <input type="text" name='phone' placeholder='Phone' required value={formData.phone} onChange={onChangeHandler} className='w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white px-4'/>

//                     {method === 'cod' && (
//                         <button type="submit" className='w-full mt-4 py-3 bg-gradient-to-t from-[#3bcee8] to-[#3b80e8] text-white font-bold rounded-2xl active:scale-95 transform transition-transform duration-150'>
//                             {loading ? <Loading /> : "PLACE ORDER"}
//                         </button>
//                     )}
//                 </form>
//             </div>

//             {/* Payment Method */}
//             <div className='lg:w-[50%] w-[100%] flex items-center justify-center mt-10 lg:mt-0'>
//                 <div className='lg:w-[70%] w-[100%] flex flex-col gap-6 bg-[#1a1a1a] p-6 rounded-3xl shadow-lg shadow-black/50'>

//                     <CartTotal />
//                     <Title text1='PAYMENT' text2='METHOD' />

//                     <div className='flex gap-4'>
//                         <button onClick={() => setMethod('stripe')} className={`flex-1 h-[50px] rounded-md font-bold ${method === 'stripe' ? 'bg-yellow-400 border-4 border-yellow-600' : 'bg-yellow-300'} transition-all`}>Stripe</button>
//                         <button onClick={() => setMethod('cod')} className={`flex-1 h-[50px] rounded-md font-bold ${method === 'cod' ? 'bg-blue-400 border-4 border-blue-600' : 'bg-blue-300'} transition-all`}>Cash on Delivery</button>
//                     </div>

//                     {method === 'stripe' && (
//                         <Elements stripe={stripePromise}>
//                             <form onSubmit={handleStripePayment} className="w-full flex flex-col gap-5 mt-4">
//                                 <CardElement />

//                                 <button type="submit" disabled={loading} className='w-full py-3 bg-gradient-to-t from-[#f0b500] to-[#f0d300] text-black font-bold rounded-2xl active:scale-95 transform transition-transform duration-150'>
//                                     {loading ? <Loading /> : "PAY NOW"}
//                                 </button>
//                             </form>
//                         </Elements>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PlaceOrder;
// import React, { useContext, useState, useEffect } from 'react';
// import Title from '../component/Title';
// import CartTotal from '../component/CartTotal';
// import { shopDataContext } from '../context/ShopContext';
// import { authDataContext } from '../context/authContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Loading from '../component/Loading';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// // Card form component
// function StripeCheckoutForm({ orderItems, totalAmount, formData, setCartItem }) {
//     const stripe = useStripe();
//     const elements = useElements();
//     const { serverUrl } = useContext(authDataContext);
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);

//     const handlePayment = async (e) => {
//         e.preventDefault();
//         if (!stripe || !elements) return;
//         setLoading(true);

//         try {
//             // Create payment intent on backend
//             const { data } = await axios.post(serverUrl + '/api/order/stripe', {
//                 address: formData,
//                 items: orderItems,
//                 amount: totalAmount
//             }, { withCredentials: true });

//             // Confirm payment using CardElement
//             const card = elements.getElement(CardElement);
//             const result = await stripe.confirmCardPayment(data.clientSecret, {
//                 payment_method: { card }
//             });

//             if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
//                 // Verify payment in backend
//                 await axios.post(serverUrl + '/api/order/verifystripe', { paymentIntentId: result.paymentIntent.id }, { withCredentials: true });
//                 setCartItem({});
//                 toast.success('Payment Successful');
//                 navigate('/order');
//             } else {
//                 toast.error('Payment failed');
//             }

//         } catch (err) {
//             console.log(err);
//             toast.error('Payment error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handlePayment} className="w-full flex flex-col gap-4">
//             <CardElement options={{ style: { base: { fontSize: '16px', color: '#fff', '::placeholder': { color: '#bbb' } } } }} />
//             <button type="submit" disabled={loading || !stripe} className="py-2 px-4 bg-blue-600 text-white rounded">
//                 {loading ? <Loading /> : "Pay Now"}
//             </button>
//         </form>
//     );
// }

// function PlaceOrder() {
//     const [method, setMethod] = useState('cod');
//     const navigate = useNavigate();
//     const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext);
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         street: '',
//         city: '',
//         state: '',
//         pinCode: '',
//         country: '',
//         phone: ''
//     });

//     const [loading, setLoading] = useState(false);

//     const onChangeHandler = (e) => {
//         const { name, value } = e.target;
//         setFormData(data => ({ ...data, [name]: value }));
//     };

//     // Prepare order items
//     const orderItems = Object.keys(cartItem).flatMap(itemId =>
//         Object.keys(cartItem[itemId])
//             .filter(size => cartItem[itemId][size] > 0)
//             .map(size => {
//                 const productInfo = structuredClone(products.find(p => p._id === itemId));
//                 productInfo.size = size;
//                 productInfo.quantity = cartItem[itemId][size];
//                 return productInfo;
//             })
//     );

//     const totalAmount = getCartAmount() + delivery_fee;

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             if (method === 'cod') {
//                 const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/order/placeorder`, {
//                     address: formData,
//                     items: orderItems,
//                     amount: totalAmount
//                 }, { withCredentials: true });

//                 if (result.data) {
//                     setCartItem({});
//                     toast.success("Order Placed");
//                     navigate("/order");
//                 } else {
//                     toast.error("Order Placement Error");
//                 }
//             }
//         } catch (err) {
//             console.log(err);
//             toast.error("Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative'>
//             {/* Delivery Form */}
//             <div className='lg:w-[50%] w-[100%] flex items-center justify-center mt-[90px] lg:mt-[0px]'>
//                 <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] flex flex-col gap-4'>
//                     <Title text1="DELIVERY" text2="INFORMATION" />
//                     <div className='w-full flex flex-wrap gap-2'>
//                         <input name='firstName' value={formData.firstName} onChange={onChangeHandler} placeholder='First Name' required className='input-field'/>
//                         <input name='lastName' value={formData.lastName} onChange={onChangeHandler} placeholder='Last Name' required className='input-field'/>
//                         <input name='email' value={formData.email} onChange={onChangeHandler} placeholder='Email' required className='input-field w-full'/>
//                         <input name='street' value={formData.street} onChange={onChangeHandler} placeholder='Street' required className='input-field w-full'/>
//                         <input name='city' value={formData.city} onChange={onChangeHandler} placeholder='City' required className='input-field'/>
//                         <input name='state' value={formData.state} onChange={onChangeHandler} placeholder='State' required className='input-field'/>
//                         <input name='pinCode' value={formData.pinCode} onChange={onChangeHandler} placeholder='Pin Code' required className='input-field'/>
//                         <input name='country' value={formData.country} onChange={onChangeHandler} placeholder='Country' required className='input-field'/>
//                         <input name='phone' value={formData.phone} onChange={onChangeHandler} placeholder='Phone' required className='input-field w-full'/>
//                     </div>
//                     {method === 'cod' && <button type="submit" className='py-2 px-4 bg-blue-600 text-white rounded mt-4'>{loading ? <Loading /> : "Place Order"}</button>}
//                 </form>
//             </div>

//             {/* Payment Method */}
//             <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
//                 <div className='lg:w-[70%] w-[90%] flex flex-col gap-4'>
//                     <CartTotal />
//                     <Title text1="PAYMENT" text2="METHOD" />
//                     <div className='flex gap-4'>
//                         <button onClick={() => setMethod('stripe')} className={`px-4 py-2 bg-gray-800 text-white rounded ${method==='stripe'?'border-2 border-blue-500':''}`}>Stripe</button>
//                         <button onClick={() => setMethod('cod')} className={`px-4 py-2 bg-gray-800 text-white rounded ${method==='cod'?'border-2 border-blue-500':''}`}>COD</button>
//                     </div>

//                     {/* Stripe Card Input */}
//                     {method === 'stripe' && (
//                         <Elements stripe={stripePromise}>
//                             <StripeCheckoutForm orderItems={orderItems} totalAmount={totalAmount} formData={formData} setCartItem={setCartItem}/>
//                         </Elements>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PlaceOrder;

import React, { useContext, useState } from 'react';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Card form component
function StripeCheckoutForm({ orderItems, totalAmount, formData, setCartItem }) {
    const stripe = useStripe();
    const elements = useElements();
    const { serverUrl } = useContext(authDataContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);

        try {
            const { data } = await axios.post(serverUrl + '/api/order/stripe', {
                address: formData,
                items: orderItems,
                amount: totalAmount
            }, { withCredentials: true });

            const card = elements.getElement(CardElement);
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: { card }
            });

            if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                await axios.post(serverUrl + '/api/order/verifystripe', { paymentIntentId: result.paymentIntent.id }, { withCredentials: true });
                setCartItem({});
                toast.success('Payment Successful');
                navigate('/order');
            } else {
                toast.error('Payment failed');
            }

        } catch (err) {
            console.log(err);
            toast.error('Payment error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handlePayment} className="w-full flex flex-col gap-4 mt-4">
            <label className="text-white font-semibold">Card Number</label>
            <div className="p-3 rounded-md bg-slate-700">
                <CardElement options={{
                    style: {
                        base: { fontSize: '16px', color: '#fff', '::placeholder': { color: '#bbb' }, iconColor: '#fff' },
                        invalid: { color: '#ff6b6b' }
                    }
                }} />
            </div>
            <button type="submit" disabled={loading || !stripe} className="py-3 bg-yellow-400 text-black font-bold rounded-xl mt-2 active:scale-95 transform transition-transform duration-150">
                {loading ? <Loading /> : "Pay Now"}
            </button>
        </form>
    );
}

function PlaceOrder() {
    const [method, setMethod] = useState('cod');
    const navigate = useNavigate();
    const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
        phone: ''
    });

    const [loading, setLoading] = useState(false);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const orderItems = Object.keys(cartItem).flatMap(itemId =>
        Object.keys(cartItem[itemId])
            .filter(size => cartItem[itemId][size] > 0)
            .map(size => {
                const productInfo = structuredClone(products.find(p => p._id === itemId));
                productInfo.size = size;
                productInfo.quantity = cartItem[itemId][size];
                return productInfo;
            })
    );

    const totalAmount = getCartAmount() + delivery_fee;

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (method === 'cod') {
                const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/order/placeorder`, {
                    address: formData,
                    items: orderItems,
                    amount: totalAmount
                }, { withCredentials: true });

                if (result.data) {
                    setCartItem({});
                    toast.success("Order Placed");
                    navigate("/order");
                } else {
                    toast.error("Order Placement Error");
                }
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Tailwind input style
    const inputClass = "w-full md:w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white px-4 py-2";

    return (
        <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-center justify-center gap-[50px] relative px-4 md:px-10 py-10'>
            {/* Delivery Form */}
            <div className='lg:w-[50%] w-[100%] flex items-center justify-center mt-[20px] lg:mt-0'>
                <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[100%] flex flex-col gap-4 bg-[#1a1a1a] p-6 rounded-3xl shadow-lg shadow-black/50'>
                    <Title text1="DELIVERY" text2="INFORMATION" />

                    <div className='w-full flex flex-wrap gap-2'>
                        <input name='firstName' value={formData.firstName} onChange={onChangeHandler} placeholder='First Name' required className={inputClass}/>
                        <input name='lastName' value={formData.lastName} onChange={onChangeHandler} placeholder='Last Name' required className={inputClass}/>
                        <input name='email' value={formData.email} onChange={onChangeHandler} placeholder='Email' required className={inputClass + ' w-full'}/>
                        <input name='street' value={formData.street} onChange={onChangeHandler} placeholder='Street' required className={inputClass + ' w-full'}/>
                        <input name='city' value={formData.city} onChange={onChangeHandler} placeholder='City' required className={inputClass}/>
                        <input name='state' value={formData.state} onChange={onChangeHandler} placeholder='State' required className={inputClass}/>
                        <input name='pinCode' value={formData.pinCode} onChange={onChangeHandler} placeholder='Pin Code' required className={inputClass}/>
                        <input name='country' value={formData.country} onChange={onChangeHandler} placeholder='Country' required className={inputClass}/>
                        <input name='phone' value={formData.phone} onChange={onChangeHandler} placeholder='Phone' required className={inputClass + ' w-full'}/>
                    </div>

                    {method === 'cod' && <button type="submit" className='py-3 bg-blue-600 text-white rounded-xl mt-4 active:scale-95 transform transition-transform duration-150'>{loading ? <Loading /> : "Place Order"}</button>}
                </form>
            </div>

            {/* Payment Method */}
            <div className='lg:w-[50%] w-[100%] flex items-center justify-center mt-10 lg:mt-0'>
                <div className='lg:w-[70%] w-[100%] flex flex-col gap-4 bg-[#1a1a1a] p-6 rounded-3xl shadow-lg shadow-black/50'>
                    <CartTotal />
                    <Title text1="PAYMENT" text2="METHOD" />
                    <div className='flex gap-4'>
                        <button onClick={() => setMethod('stripe')} className={`flex-1 py-2 px-4 rounded font-bold ${method==='stripe'?'bg-yellow-400 border-2 border-yellow-500':'bg-yellow-300'}`}>Stripe</button>
                        <button onClick={() => setMethod('cod')} className={`flex-1 py-2 px-4 rounded font-bold ${method==='cod'?'bg-blue-400 border-2 border-blue-500':'bg-blue-300'}`}>COD</button>
                    </div>

                    {method === 'stripe' && (
                        <Elements stripe={stripePromise}>
                            <StripeCheckoutForm orderItems={orderItems} totalAmount={totalAmount} formData={formData} setCartItem={setCartItem}/>
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
