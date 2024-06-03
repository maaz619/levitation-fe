'use client'

import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { SubmitButton } from '@/components/submit-button';
import { Form } from '@/components/form';
import { _register } from '@/services/services';
import { useContext, useEffect, useState } from 'react';
import { LoggedInContext } from '@/services/authContext';

export default function Register() {
    const { push } = useRouter()
    const { loggedInState } = useContext(LoggedInContext)
    const [isPending, setIsPending] = useState<boolean>(false)
    const formHandler = async (formData: FormData) => {
        try {
            setIsPending(true)
            const name = formData.get('name') as string
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            const res = await _register({
                name,
                email,
                password
            })
            if (res.status === 201 && res.ok) {
                setIsPending(false)
                push('/login')
            }
        } catch (error: any) {
            alert(error.message)
            setIsPending(false)
        }

    }
    useEffect(() => {
        if (loggedInState.isLoggedIn) {
            push('/')
        }
    }, [loggedInState.isLoggedIn])
    return (
        <div className="flex h-screen px-5 md:px-0 md:w-screen items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign Up</h3>
                    <p className="text-sm text-gray-500">
                        Create an account
                    </p>
                </div>
                <Form type="sign up" action={formHandler}>
                    <SubmitButton state={isPending}>Sign Up</SubmitButton>
                    <p className="text-center text-sm text-gray-600">
                        {'Already have an account? '}
                        <Link href="/login" className="font-semibold text-gray-800">
                            Sign in
                        </Link>
                        {' instead.'}
                    </p>
                </Form>
            </div>
        </div>
    );
}