'use client'
import React from 'react'
import TopHeader from './top-header'
import { usePathname } from 'next/navigation'

export default function Header() {
  const path = usePathname()
  return (
    <div className='w-full'>
      <div className=''>
        <div className='bg-secondary'>
          </div>
        </div>
        <div className='bg-primary h-16'>
          <TopHeader />
        </div>
      </div>
  )
}
