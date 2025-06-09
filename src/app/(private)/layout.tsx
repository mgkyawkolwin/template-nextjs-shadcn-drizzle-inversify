'use client';

import {Header} from '../../components/layouts/header';
import {Footer} from '../../components/layouts/footer';



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-1500px">
      <Header />
      <div className='max-w-100vw h-1500px p-4'>
      {children}
      </div>
      <Footer />
    </section>
  );
}
