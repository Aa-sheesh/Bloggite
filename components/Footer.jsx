import React from 'react'


const Footer = () => {
    return (
        <footer className='text-center'>

            <input
                type="email"
                placeholder="abc@gmail.com"
                className="bg-white/50 p-2 rounded-l-md focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <button className=' bg-black p-2 rounded-r-md' type='submit'>Subscribe!</button>
        </footer>
    )
}

export default Footer