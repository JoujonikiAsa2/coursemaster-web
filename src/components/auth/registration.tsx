'use client'

import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'

export default function RegistrationModal({
  setRegisterOpen,
  setShowLogin,
}: {
  setRegisterOpen: Dispatch<SetStateAction<boolean>>
  setShowLogin: Dispatch<SetStateAction<boolean>>
}) {
  const form = useForm()

  const {
    register,
    formState: { isSubmitting },
    watch,
  } = form

  const password = watch('password')
  const passwordConfirm = watch('passwordConfirm')

  return (
    <div className='fixed top-0 z-40 flex min-h-screen w-full items-center justify-center'>
      <div className='bg-primary-foreground absolute top-0 h-full w-full border opacity-80'></div>
      <div className='relative w-full max-w-md bg-white p-8 shadow-xl'>
        <button
          className='hover:text-primary absolute right-3 top-3 text-gray-500 hover:cursor-pointer'
          onClick={() => {
            setRegisterOpen(false)
            setShowLogin(false)
          }}
        >
          ✕
        </button>

        <h2 className='mb-6 text-center text-xl font-semibold'>Create an Account</h2>

        <form className='space-y-4'>
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
          <Button
            variant='link'
            onClick={() => setRegisterOpen(false)}
            className='text-primary text-sm'
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
