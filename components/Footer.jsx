import React from 'react'
import {toast} from 'sonner'

const Footer = () => {
    return (
        <footer className='text-center'>

            <input
                type="email"
                placeholder="abc@gmail.com"
                className="bg-white/50 p-2 rounded-l-md focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <button className=' bg-black p-2 rounded-r-md' onClick={()=>{toast.success("Subscribed successfully!",{description: "You have early access to new blogs now."})}}  type='submit'>Subscribe!</button>
        </footer>
    )
}

export default Footer