"use client";

import { Component, ReactNode, ErrorInfo } from "react";
import { Text, Button } from "@/shared/ui/block";
import { LayoutColumn } from "@/shared/ui/layout";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <LayoutColumn>
          <Text>Something went wrong</Text>
          {this.state.error && <Text>{this.state.error.message}</Text>}
          <Button onClick={this.handleReset}>Try again</Button>
        </LayoutColumn>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
