// import React, { useContext, useState } from 'react';
// import Title from '../component/Title';
// import CartTotal from '../component/CartTotal';
// import { shopDataContext } from '../context/ShopContext';
// import { authDataContext } from '../context/AuthContext';
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
//         <form onSubmit={handlePayment} className="w-full flex flex-col gap-4 mt-4">
//             <label className="text-white font-semibold">Card Number</label>
//             <div className="p-3 rounded-md bg-slate-700">
//                 <CardElement options={{
//                     style: {
//                         base: { fontSize: '16px', color: '#fff', '::placeholder': { color: '#bbb' }, iconColor: '#fff' },
//                         invalid: { color: '#ff6b6b' }
//                     }
//                 }} />
//             </div>
//             <button type="submit" disabled={loading || !stripe} className="py-3 bg-yellow-400 text-black font-bold rounded-xl mt-2 active:scale-95 transform transition-transform duration-150">
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

//     // Tailwind input style
//     const inputClass = "w-full md:w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white px-4 py-2";

//     return (
//         <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-center justify-center gap-[50px] relative px-4 md:px-10 py-10'>
//             {/* Delivery Form */}
//             <div className='lg:w-[50%] w-[100%] flex items-center justify-center mt-[20px] lg:mt-0'>
//                 <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[100%] flex flex-col gap-4 bg-[#1a1a1a] p-6 rounded-3xl shadow-lg shadow-black/50'>
//                     <Title text1="DELIVERY" text2="INFORMATION" />

//                     <div className='w-full flex flex-wrap gap-2'>
//                         <input name='firstName' value={formData.firstName} onChange={onChangeHandler} placeholder='First Name' required className={inputClass}/>
//                         <input name='lastName' value={formData.lastName} onChange={onChangeHandler} placeholder='Last Name' required className={inputClass}/>
//                         <input name='email' value={formData.email} onChange={onChangeHandler} placeholder='Email' required className={inputClass + ' w-full'}/>
//                         <input name='street' value={formData.street} onChange={onChangeHandler} placeholder='Street' required className={inputClass + ' w-full'}/>
//                         <input name='city' value={formData.city} onChange={onChangeHandler} placeholder='City' required className={inputClass}/>
//                         <input name='state' value={formData.state} onChange={onChangeHandler} placeholder='State' required className={inputClass}/>
//                         <input name='pinCode' value={formData.pinCode} onChange={onChangeHandler} placeholder='Pin Code' required className={inputClass}/>
//                         <input name='country' value={formData.country} onChange={onChangeHandler} placeholder='Country' required className={inputClass}/>
//                         <input name='phone' value={formData.phone} onChange={onChangeHandler} placeholder='Phone' required className={inputClass + ' w-full'}/>
//                     </div>

//                     {method === 'cod' && <button type="submit" className='py-3 bg-blue-600 text-white rounded-xl mt-4 active:scale-95 transform transition-transform duration-150'>{loading ? <Loading /> : "Place Order"}</button>}
//                 </form>
//             </div>

//             {/* Payment Method */}
//             <div className='lg:w-[50%] w-[100%] flex items-center justify-center mt-10 lg:mt-0'>
//                 <div className='lg:w-[70%] w-[100%] flex flex-col gap-4 bg-[#1a1a1a] p-6 rounded-3xl shadow-lg shadow-black/50'>
//                     <CartTotal />
//                     <Title text1="PAYMENT" text2="METHOD" />
//                     <div className='flex gap-4'>
//                         <button onClick={() => setMethod('stripe')} className={`flex-1 py-2 px-4 rounded font-bold ${method==='stripe'?'bg-yellow-400 border-2 border-yellow-500':'bg-yellow-300'}`}>Stripe</button>
//                         <button onClick={() => setMethod('cod')} className={`flex-1 py-2 px-4 rounded font-bold ${method==='cod'?'bg-blue-400 border-2 border-blue-500':'bg-blue-300'}`}>COD</button>
//                     </div>

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
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Stripe card form
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
            // Create PaymentIntent on server
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
                // Verify payment
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
            <label className="text-white font-semibold">Card Details</label>
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
    const [method, setMethod] = useState('cod'); // default COD
    const navigate = useNavigate();
    const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext);
    const { serverUrl } = useContext(authDataContext); // ✅ use serverUrl for both COD & Stripe
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

    // COD handler
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (method === 'cod') {
                const result = await axios.post(serverUrl + '/api/order/placeorder', {
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

