import Link from 'next/link'
export default function Copyright() {
    return (
        <div className='container-style flex text-xs'>
            <p className='w-1/3'>&copy;CourseMaster.</p>
            <div className='w-2/3 flex md:gap-2 items-center'>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/privacy-policy">Terms of Service</Link>
                <Link href="/privacy-policy">Cookie Policy</Link>
            </div>
        </div>
    )
}
