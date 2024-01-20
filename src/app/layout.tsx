import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Task from './models/Task'
import TaskContextProvider from './context/TaskContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{
        <TaskContextProvider>
          {children}
        </TaskContextProvider>

      }</body>
    </html>
  )
}
