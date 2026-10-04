import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-Vumi Seba | জমি সংক্রান্ত সেবায় সহায়তা',
  description: 'Private land-service assistance and document-processing platform',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bn"><body>{children}</body></html>
}
