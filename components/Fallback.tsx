"use client";

import { Button } from "@/components/ui/button";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again.</Button>
    </div>
  );
}
