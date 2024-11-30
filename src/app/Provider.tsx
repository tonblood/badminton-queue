'use client'

import { NextUIProvider } from '@nextui-org/react'
import { NotificationProvider } from './context/NotificationContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <NextUIProvider>
        {children}
      </NextUIProvider>
  )
}