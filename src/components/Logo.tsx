
'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LogoProps {
    widthClass?: string;
    heightClass?: string;
    className?:string;
  }

export const Logo = ({ 
    widthClass = 'w-[90px] md:w-[120px] ', 
    heightClass = 'h-[30px] md:h-[40px]' ,
    className
  }: LogoProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // This useEffect ensures the component only renders on the client
  // after mounting, preventing a hydration mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  // We default to the light logo to prevent layout shift
  const logoSrc = (mounted && resolvedTheme === 'dark') 
    ? '/Prolearn-dark.png' 
    : '/Prolearn.png';

  const altText = mounted ? 'ProLearn Logo' : 'ProLearn Logo (Loading)';


  if (mounted) {
    return (
        <Link
        href="/"
        className={`relative block ${widthClass} ${heightClass} overflow-hidden ${className}`}
      >
        <Image
          src={logoSrc}
          alt={altText}
          sizes="(max-width: 768px) 200px, 420px"
          fill
          className="object-cover" 
          priority
        />
      </Link>
    );
  }
};