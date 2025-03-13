'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * A custom error boundary component that catches and suppresses hydration errors.
 * This component will catch errors during rendering and prevent them from crashing the app.
 * It specifically looks for hydration-related errors and suppresses them.
 */
class HydrationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
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
    
    // Reset the error state after a short delay to allow React to recover
    if (isHydrationError) {
      setTimeout(() => {
        this.setState({ hasError: false });
      }, 0);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.children;
    }

    return this.props.children;
  }
}

export default HydrationErrorBoundary; 