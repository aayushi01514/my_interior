'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Custom styling (optional override)
import './nprogress-custom.css'; // we'll create this next

export default function TopProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    // Simulate loading time
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); // simulate delay for visibility

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}
