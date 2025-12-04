import React from 'react'
import Copyright from './copyright'
import FooterContent from './footer-content'

export default function Footer() {
  return (
      <div className='bg-primary text-white py-16'>
        <FooterContent/>
        <Copyright />
      </div>
  )
}
