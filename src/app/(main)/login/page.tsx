'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod';
import setTokenInCookie from '@/helpers/set-token';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '@/components/auth/formValidation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();
    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        try {
            const res = await fetch("https://coursemaster-server.vercel.app/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok && result.success) {

                // Save to cookies
                sessionStorage.setItem("accessToken", result.data.token);
                sessionStorage.setItem("refreshToken", result.data.refreshToken);
                sessionStorage.setItem("name", result.data?.user?.name);
                sessionStorage.setItem("email", result.data?.user?.email);
                sessionStorage.setItem("role", result.data?.user?.role);


                document.cookie = `accessToken=${result.data.token}; path=/; max-age=86400`;
                document.cookie = `refreshToken=${result.data.refreshToken}; path=/; max-age=604800`;
                document.cookie = `name=${result.data.user.name}; path=/; max-age=86400`;
                document.cookie = `email=${result.data.user.email}; path=/; max-age=86400`;
                document.cookie = `role=${result.data.user.role}; path=/; max-age=86400`;


                toast.success(result.message || "Login successful");
                window.location.reload()
                router.push("/");
            } else {
                toast.error(result.message || "Login failed");
            }
        } catch (error: any) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className='top-0 z-40 flex min-h-screen w-full items-center justify-center'>
            <div className='relative w-full max-w-sm  bg-white p-6 shadow-lg'>
                <h2 className='mb-4 text-center text-xl font-bold'>Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <p className='label'>Email</p>
                        <input
                            type='email'
                            {...register('email')}
                            placeholder='jane.smith@example.com'
                            className='focus:border-primary w-full border px-3 py-2 text-sm focus:outline-none focus:ring'
                        />
                    </div>

                    <div>
                        <p className='label'>Password</p>
                        <input
                            type='password'
                            {...register('password')}
                            placeholder='••••••••'
                            className='focus:border-primary w-full border px-3 py-2 text-sm focus:outline-none focus:ring'
                        />
                    </div>

                    <Button type='submit' disabled={isSubmitting} className='bg-primary w-full'>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                <div className='mt-4 text-center text-sm text-gray-600'>
                    <span>Don’t have an account?</span>
                    <Link href="/register">
                        <Button
                            variant='link'
                            className='text-primary text-sm hover:cursor-pointer'
                        >
                            Create Account
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

