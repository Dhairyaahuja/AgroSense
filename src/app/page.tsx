'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect immediately to the dashboard
    router.replace('/dashboard');
  }, [router]);

  // Render a simple loading state while redirecting
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <p>Loading AgroSense...</p>
    </div>
  );
}
