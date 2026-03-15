import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler=(event)=>{
        event.preventDefault()
    }
  return (
    <div className='text-center py-10'>
        <p className='text-sm font-semibold text-gray-800 uppercase tracking-[0.2em]'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3 uppercase tracking-widest text-[10px]'>Join our community to stay updated on new arrivals and exclusive offers.</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none text-xs uppercase tracking-widest py-3' type="email" placeholder='Enter your email' required/>
            <button className='bg-black text-white text-[10px] tracking-[0.2em] px-10 py-4 uppercase' type='submit'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox;
