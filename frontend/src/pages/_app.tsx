import type { AppProps } from 'next/app';
import { Lato } from 'next/font/google'
import '@/styles/globals.css';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-lato',   // CSS variable name
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${lato.className} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
