'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Clock, Settings, LogOut, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
    {
        title: 'My Courses',
        href: '/dashboard/student/my-courses',
        icon: BookOpen,
    },
    {
        title: 'Certificates',
        href: '/dashboard/student/certificates',
        icon: Award,
    },
    {
        title: 'Settings',
        href: '/dashboard/student/settings',
        icon: Settings,
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-fit lg:w-64 flex-col border-r bg-card">

            <div className="flex-1 overflow-y-auto pt-4">
                <nav className="grid gap-1 px-2">
                    {sidebarItems.map((item, index) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-fit",
                                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                               <p className='hidden md:flex '> {item.title}</p>
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="border-t p-4">
                <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
                    <LogOut className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
