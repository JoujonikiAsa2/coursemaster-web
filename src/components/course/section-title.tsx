import React from 'react'

export default function SectionTitle({ title }: {title:string}) {
    return (
        <div className='w-fit h-16 overflow-hidden'>
            <h2>{title}</h2>
            <div className='size-30 border-2 border-primary rounded-full'></div>
        </div>
    )
}
