import Image from 'next/image'
import fb from 'src/assets/icons/facebook.png'
import instagram from 'src/assets/icons/instagram.png'
import x from 'src/assets/icons/twitter.png'
import youtube from 'src/assets/icons/youtube.png'
import { ArrowBigRight } from 'lucide-react'
import { Button } from '../../ui/button'

export default function FooterContent() {
  return (
    <div className='container-style flex flex-col items-start justify-between gap-4 pb-6 md:flex-row md:gap-6'>
      <div className='w-fit'>
        <div className='space-y-1 pt-4'>
          <p className='text-sm'>
            <span className='title-sm'>Mail:&nbsp;</span>
            <span className='text-sm'>coursemaster@gmail.com</span>
          </p>
          <p>
            <span className='title-sm'>Phone:&nbsp;</span>
            <span className='text-sm'>+880 01736253232</span>
          </p>
          <p>
            <span className='title-sm'>Address:&nbsp;</span>
            <span className='text-sm'>Dhaka, Banglades</span>h
          </p>
        </div>
      </div>
      <div className='space-y-1 text-sm'>
        <h5 className='pb-2'>INFORMATION</h5>
        <div>Contact</div>
        <div>Career</div>
        <div>My Account</div>
        <div>FAQs</div>
      </div>
      <div className='space-y-2 text-sm'>
        <h5 className='pb-2'>CUSTOMER SERVICES</h5>
        <div>Oder FAQs</div>
      </div>
      <div className='space-y-2 text-sm'>
        <h5>NEWSLETTER</h5>
        <p className='lg:w-80'>Sign up for our newsletter and get 10% off your first purchase</p>
        <div className='relative border h-full px-2'>
          <input
            type='text'
            className='search-input border-white! h-12'
            placeholder='Enter your email'
          />
          <Button className='bg-primary-foreground absolute right-0 h-12 rounded-none'>
            <ArrowBigRight className='text-primary'/>
          </Button>
        </div>
        <div className='flex items-center gap-4 pt-4'>
          <Image src={fb} alt='' width={1024} height={1024} className='size-6' />
          <Image src={instagram} alt='' width={1024} height={1024} className='size-6' />
          <Image src={x} alt='' width={1024} height={1024} className='size-6' />
          <Image src={youtube} alt='' width={1024} height={1024} className='h-8 w-7' />
        </div>
      </div>
    </div>
  )
}
