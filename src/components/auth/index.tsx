'use client'
import React, { useState } from 'react'
import LoginModal from './login'
import RegistrationModal from './registration'

export default function Authentication({
  showLogin,
  setShowLogin,
}: {
  showLogin: boolean
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [registerOpen, setRegisterOpen] = useState(false)
  return (
    <div>
      {!registerOpen ? (
        <LoginModal isOpen={showLogin} setIsOpen={setShowLogin} setRegisterOpen={setRegisterOpen} />
      ) : (
        <RegistrationModal setShowLogin={setShowLogin} setRegisterOpen={setRegisterOpen} />
      )}
    </div>
  )
}
