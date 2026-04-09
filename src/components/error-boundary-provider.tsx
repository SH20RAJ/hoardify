"use client";

import ErrorBoundary from "./error-boundary";

interface ErrorBoundaryProviderProps {
	children: React.ReactNode;
}

export default function ErrorBoundaryProvider({ children }: ErrorBoundaryProviderProps) {
	return <ErrorBoundary>{children}</ErrorBoundary>;
}
