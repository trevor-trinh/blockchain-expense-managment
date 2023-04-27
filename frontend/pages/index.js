import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}
