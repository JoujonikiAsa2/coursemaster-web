import Image from 'next/image'
import study from 'src/assets/images/hero-image.png'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Banner({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <section className='container-style flex flex-col items-center justify-center gap-6 overflow-hidden pt-6 lg:pt-20 lg:flex-row lg:justify-between'>
      <div className='w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-start'>
        <h1 className=''>{title}</h1>
        <p className='text-accent-foreground pb-4 text-sm '>{subtitle}</p>
        <Link href="/courses">
          <Button className='max-w-fit h-12'>Find Course</Button>
        </Link>
      </div>
      <div className='w-1/2 relative flex justify-center'>
        <Image src={study} alt='study' width={400} height={400} className='rounded-2xl w-fit animate-collapsible-up' />
      </div>
    </section>
  )
}
