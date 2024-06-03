'use client'

import Link from 'next/link';
import { Form } from '../../components/form';
import { SubmitButton } from '../../components/submit-button';
import { _login } from '@/services/services';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { LoggedInContext } from '@/services/authContext';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
    const router = useRouter()
    const { loggedInState, setLoggedInState } = useContext(LoggedInContext)
    const [isPending, setIsPending] = useState<boolean>(false)
    const formHandler = async (formData: FormData) => {
        try {
            setIsPending(true)
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            const res = await _login({
                email,
                password
            })
            const token = await res.json()
            if (res.status === 200 && res.ok) {
                setIsPending(false)
                document.cookie = `token=${token.token}; path=/`
                const decodedToken = jwtDecode(token.token);
                setLoggedInState({ token: token.token, isLoggedIn: true, user: decodedToken })
                router.push('/')
            }
            if (res.status === 404) {
                setIsPending(false)
                alert("unsuccessful login")
                router.push('/register')
            }
        } catch (error) {
            setIsPending(false)
            console.log(error)
        }

    }
    useEffect(() => {
        if (loggedInState.isLoggedIn) {
            router.push('/')
        }
    }, [loggedInState.isLoggedIn])

    return (
        <div className="flex h-screen px-5 md:px-0 md:w-screen items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign In</h3>
                    <p className="text-sm text-gray-500">
                        Use your email and password to sign in
                    </p>
                </div>
                <Form
                    action={formHandler}
                >
                    <SubmitButton state={isPending}>Sign in</SubmitButton>
                    <p className="text-center text-sm text-gray-600">
                        {"Don't have an account? "}
                        <Link href="/register" className="font-semibold text-gray-800">
                            Sign up
                        </Link>
                        {' for free.'}
                    </p>
                </Form>
            </div>
        </div >
    );
}