'use client'

import React, { useState, useEffect } from 'react'

const Page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        // Check if 'admin-auth' cookie is present
        const isLoggedIn = document.cookie.includes('admin-auth=loggedin')
        setAuthenticated(isLoggedIn)
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            })

            const data = await res.json()

            if (res.ok && data.success) {
                document.cookie = 'admin-auth=loggedin; max-age=604800; path=/'
                setAuthenticated(true)
                setError('')
            } else {
                setError(data.error || 'Invalid email or password')
            }
        } catch (err) {
            setError('Network error or server issue')
        }
    }

    if (!authenticated) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <form
                    onSubmit={handleLogin}
                    className="p-6 space-y-4 w-[300px] backdrop-blur shadow rounded"
                >
                    <h2 className="text-xl font-bold text-center">Admin Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                    >
                        Login
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div className="h-[80vh] flex items-center justify-center text-xl font-semibold">
            <h1>Welcome Aashish! 🎉 You are logged in as Admin.</h1>
            <button 
                onClick={() => {
                    document.cookie = 'admin-auth=; Max-Age=0; path=/'
                    setAuthenticated(false)
                }}
                className="absolute bottom-0 right-0 mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    )
}

export default Page
