'use client';

import { usePathname } from 'next/navigation';
import { FloatingNav } from './FloatingNav';
import { navItems } from '@/data';

const NavWrapper = () => {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) return null;

  return <FloatingNav navItems={navItems} />;
};

export default NavWrapper;
