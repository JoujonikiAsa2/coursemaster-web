'use client'
import { HandshakeIcon, HeartPlus, ShoppingBagIcon, TextSearchIcon, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import Authentication from '../../auth'

export default function TopHeader() {
  const path = usePathname()
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <div className='text-primary-foreground container-style flex justify-between items-center h-full'>
        <div className='flex gap-4 items-center h-full'>
          <Link
            href='/courses'
            className={`flex h-full items-center px-4 ${path !== '/' && ' md:text-primary-foreground text-2xl'}`}
          >
            CourseMaster
          </Link>

        </div>
        <div className='flex gap-4 items-center h-full'>
          <div className='flex gap-2 items-center hover:cursor-pointer' onClick={() => setShowLogin(true)}>
            <UserRound className='icon' /> <p className='link-text'>Login</p>
          </div>
          <div className='flex gap-2 items-center hover:cursor-pointer'>
            <HeartPlus className='icon' /> <p className='link-text'>Wishlist</p>
          </div>
          <div className='flex gap-2 items-center hover:cursor-pointer'>
            <ShoppingBagIcon className='icon' /> <p className='link-text'>Cart</p>
          </div>
        </div>
      </div>
      <Authentication showLogin={showLogin} setShowLogin={setShowLogin} />
    </>
  )
}
