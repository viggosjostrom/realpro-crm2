'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/**
 * A wrapper component that only renders its children on the client side.
 * This is useful for components that use browser APIs or need to avoid hydration mismatches.
 */
const NoSSR = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Use a flag to prevent multiple state updates
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};

/**
 * A component that ensures its children are only rendered on the client side.
 * This is useful for components that use browser APIs or need to avoid hydration mismatches.
 * 
 * Usage:
 * ```tsx
 * <ClientOnly>
 *   <ComponentThatUsesWindowOrLocalStorage />
 * </ClientOnly>
 * ```
 */
const ClientOnly = dynamic(() => Promise.resolve(NoSSR), { 
  ssr: false,
  // Disable automatic retrying on error to prevent render loops
  loading: () => null 
});

export default ClientOnly; 