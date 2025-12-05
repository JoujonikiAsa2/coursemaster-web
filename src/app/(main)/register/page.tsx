'use client'

import { Dispatch, SetStateAction } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { registrationSchema } from '@/components/auth/formValidation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type RegisterFormValues = z.infer<typeof registrationSchema>;

export default function RegistrationPage() {

    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
        watch,
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registrationSchema),
    })

    const password = watch('password')
    const passwordConfirm = watch('passwordConfirm')

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        console.log(data)
        try {
            const res = await fetch("https://coursemaster-server.vercel.app/api/v1/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            console.log(result)

            if (res.ok && result.success) {
                toast.success(result.message || "Registration successful");
                router.push("/");
            } else {
                toast.error(result.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className=' top-0 z-40 flex min-h-screen w-full items-center justify-center'>
            <div className='relative w-full max-w-md bg-white p-8 shadow-xl'>

                <h2 className='mb-6 text-center text-xl font-semibold'>Create an Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <p className='label'>Name</p>
                        <input
                            type='text'
                            {...register('name')}
                            placeholder='John Smith'
                            className='focus:ring-primary w-full  border px-3 py-2 text-sm focus:outline-none focus:ring-2'
                        />
                    </div>

                    <div>
                        <p className='label'>Email</p>
                        <input
                            type='email'
                            {...register('email')}
                            placeholder='jane.smith@example.com'
                            className='focus:ring-primary w-full  border px-3 py-2 text-sm placeholder:text-sm focus:outline-none focus:ring-2'
                        />
                    </div>

                    <div>
                        <p className='label'>Password</p>
                        <input
                            type='password'
                            {...register('password')}
                            placeholder='••••••••'
                            className='focus:ring-primary w-full  border px-3 py-2 text-sm focus:outline-none focus:ring-2'
                        />
                    </div>

                    <div>
                        <p className='label'>Confirm Password</p>
                        <input
                            type='password'
                            {...register('passwordConfirm')}
                            placeholder='••••••••'
                            className='focus:ring-primary w-full  border px-3 py-2 text-sm focus:outline-none focus:ring-2'
                        />
                        {passwordConfirm && password !== passwordConfirm && (
                            <p className='mt-1 text-sm text-red-500'>Passwords do not match</p>
                        )}
                    </div>

                    <Button
                        type='submit'
                        disabled={!!passwordConfirm && password !== passwordConfirm}
                        className='w-full'
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </Button>
                </form>
                <div className='mt-4 text-center text-sm text-gray-600'>
                    <span>Already have an account?</span>
                    <Link href="/login">
                        <Button
                            variant='link'
                            className='text-primary text-sm hover:cursor-pointer'
                        >
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
