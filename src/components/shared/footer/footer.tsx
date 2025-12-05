import React from 'react'
import Copyright from './copyright'
import FooterContent from './footer-content'

export default function Footer() {
  return (
      <div className='bg-primary py-16 text-primary-foreground'>
        <FooterContent/>
        <Copyright />
      </div>
  )
}
