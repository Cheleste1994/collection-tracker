'use client'

import NavbarMenu from '@/components/NavbarMenu/NavbarMenu';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './page.module.scss';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpenNavbarMenu, setIsOpenNavbarMenu] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpenNavbarMenu(true);
  }, []);

  return (
    <main className={`${styles.main} ${isOpenNavbarMenu && styles.active}`}>
      <NavbarMenu
        isOpenNavbarMenu={isOpenNavbarMenu}
        setIsOpenNavbarMenu={setIsOpenNavbarMenu}
        pathName={pathName}
      />
      {children}
    </main>
  );
}