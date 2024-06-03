'use client'
import { useAuth } from "@/services/authContext"
import Link from "next/link"

const Navbar = () => {
    const { loggedInState, logout } = useAuth()
    return (
        <header className="flex items-center sm:justify-start sm:flex-nowrap w-full text-sm py-4 ">
            <nav className="max-w-6xl w-full mx-auto px-4 flex items-center justify-between" aria-label="Global">
                <Link legacyBehavior href={'/'}><a className="flex-none text-xl font-semibold " >Levitation</a></Link>
                <div className="flex flex-row items-center gap-5 sm:justify-end sm:mt-0 sm:ps-5">
                    <Link legacyBehavior href={'/'}>
                        <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" >Home</a>
                    </Link>
                    <Link legacyBehavior href={'/product'}>
                        <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">Product</a>
                    </Link>
                    {
                        loggedInState.isLoggedIn ?

                            <a onClick={logout} className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" >Logout</a>
                            :
                            <Link legacyBehavior href={'/login'}>
                                <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" >Login</a>
                            </Link>
                    }
                </div>
            </nav>
        </header>
    )
}
export default Navbar