'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorCount: number;
}

/**
 * A custom error boundary component that catches and suppresses hydration errors.
 * This component will catch errors during rendering and prevent them from crashing the app.
 * It specifically looks for hydration-related errors and suppresses them.
 */
class HydrationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorCount: 0 };
  }

  static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, errorCount: 0 };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Check if this is a hydration error
    const isHydrationError = 
      error.message.includes('Hydration failed because') ||
      error.message.includes('Text content does not match server-rendered HTML') ||
      error.message.includes('There was an error while hydrating');
    
    // Log the error only if it's not a hydration error
    if (!isHydrationError) {
      console.error('Error caught by HydrationErrorBoundary:', error, errorInfo);
    }
    
    // Only reset the error state if it's a hydration error and we haven't tried too many times
    if (isHydrationError && this.state.errorCount < 3) {
      // Use requestAnimationFrame instead of setTimeout for more reliable scheduling
      requestAnimationFrame(() => {
        this.setState(prevState => ({ 
          hasError: false, 
          errorCount: prevState.errorCount + 1 
        }));
      });
    }
  }

  render(): ReactNode {
    // Always render children to allow React to recover from hydration errors
    return this.props.children;
  }
}

export default HydrationErrorBoundary; 