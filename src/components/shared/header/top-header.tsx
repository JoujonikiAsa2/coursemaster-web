'use client'
import { Contact, HeartPlus, LogOut, ShoppingBagIcon, TextSearchIcon, UserRound } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import Authentication from '../../auth'
import getUser from '@/helpers/get-user'
import { AuthUser } from '@/types'
import deleteTokenFromCookie from '@/helpers/delete-token'
import { useRouter } from 'next/navigation'

export default function TopHeader() {
    const router = useRouter();
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser();
      setUser(result);
    };
    fetchUser();
  }, []);

      const handleLogout = useCallback(async() => {
        sessionStorage.clear();
        await deleteTokenFromCookie()
        setUserName('');
        router.push('/');
    }, [router]);


  return (
    <>
      <div className='hidden md:flex text-primary-foreground container-style justify-between items-center h-full'>
        <div className='flex gap-4 items-center h-full'>
          <div className='flex gap-2 items-center py-2'>
            <Contact className='icon' /><p className='link-text'> (+88) 1770 6886</p>
          </div>

        </div>
        <div className='flex gap-4 items-center h-full'>
          {user?.email ? <><UserRound />{user.name}</> : <div className='flex gap-2 items-center hover:cursor-pointer' onClick={() => setShowLogin(true)}>
            <UserRound className='icon' /> <p className='link-text'>Login</p>
          </div>}
          <div className='flex gap-2 items-center hover:cursor-pointer'>
            <HeartPlus className='icon' /> <p className='link-text'>Wishlist</p>
          </div>
          <div className='flex gap-2 items-center hover:cursor-pointer'>
            <ShoppingBagIcon className='icon' /> <p className='link-text'>Cart</p>
          </div>
          {user?.email && <button
                    onClick={handleLogout}
                    className="text-left text-sm hover:cursor-pointer"
                >
                    <LogOut/>
                </button>}
        </div>
      </div>
      {
        showLogin ? <Authentication showLogin={showLogin} setShowLogin={setShowLogin} /> : null
      }
    </>
  )
}
