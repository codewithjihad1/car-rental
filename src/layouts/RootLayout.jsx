import React from 'react'
import { Outlet } from 'react-router'

const RootLayout = () => {
    return (
        <>
            <header>
                <h1>My App</h1>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>© 2023 My App</p>
            </footer>
        </>
    )
}

export default RootLayout
