'use client'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'

export default function LoginModal({
  isOpen,
  setIsOpen,
  setRegisterOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setRegisterOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {
    register,
    formState: { isSubmitting },
  } = useForm()

  if (!isOpen) return null

  return (
    <div className='fixed top-0 z-40 flex min-h-screen w-full items-center justify-center'>
      <div className='bg-primary-foreground absolute top-0 h-full w-full border opacity-80'></div>
      <div className='relative w-full max-w-sm  bg-white p-6 shadow-lg'>
        <button
          className='hover:text-primary absolute right-3 top-3 text-gray-500 hover:cursor-pointer'
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <h2 className='mb-4 text-center text-xl font-bold'>Login</h2>

        <form className='space-y-4'>
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
          <Button
            variant='link'
            onClick={() => setRegisterOpen(true)}
            className='text-primary text-sm'
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  )
}
