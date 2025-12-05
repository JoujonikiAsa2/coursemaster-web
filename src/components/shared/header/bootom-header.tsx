'use client'
import { HeartPlus, Menu, ShoppingBagIcon, UserRound, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Authentication from '../../auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function BottomHeader() {
  const [open, setOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)


  return (
    <>
      <div className='container-style flex justify-between items-center h-full'>
        <div className='flex gap-4 items-center h-full'>
          <Link
            href='/'
            className={`flex h-full items-center px-4`}
          >
            CourseMaster
          </Link>

        </div>
        <ul className='hidden md:flex gap-4 items-center h-full'>
          <Link href="/"><li className='link-text'>Home</li></Link>
          <Link href="/courses"><li className='link-text'>Courses</li></Link>
          <Link href="/about"><li className='link-text'>About</li></Link>
          <Link href="/contact"><li className='link-text'>Contact</li></Link>
        </ul>
        <div className='flex gap-4 md:hidden'>

          <div className='flex gap-2 items-center hover:cursor-pointer'>
            <ShoppingBagIcon className='icon' />
          </div>
          <div className='flex gap-2 items-center hover:cursor-pointer'>
            <HeartPlus className='icon' />
          </div>
          <DropdownMenu open={open} onOpenChange={(state) => setOpen(state)}>
            <DropdownMenuTrigger className="bg-primary text-primary-foreground p-1 rounded">
              {open ? <X size={16}/> : <Menu size={16}/>}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 mt-5">
              <DropdownMenuItem>Home</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Courses</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>About</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Contact</DropdownMenuItem>
              <DropdownMenuItem className=' text-secondary'>
                <div className='bg-primary p-2 w-full flex gap-2 items-center hover:cursor-pointer' onClick={() => setShowLogin(true)}>
                  <UserRound className='text-secondary'/> <p className=''>Login</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
      {showLogin ?  <Authentication showLogin={showLogin} setShowLogin={setShowLogin} />: null}


    </>
  )
}
