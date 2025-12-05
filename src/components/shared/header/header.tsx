import TopHeader from './top-header'
import BottomHeader from './bootom-header'

export default function Header() {
  return (
    <div className='w-full'>
        <div className='bg-primary'>
          <TopHeader />
        </div>
        <div className='h-16 border-b shadow'>
          <BottomHeader />
        </div>
      </div>
  )
}
