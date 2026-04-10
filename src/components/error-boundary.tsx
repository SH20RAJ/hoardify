"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Link from "next/link";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log error to console or send to monitoring service
		console.error("Error caught by ErrorBoundary:", error, errorInfo);
	}

	handleReload = () => {
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex items-center justify-center min-h-screen bg-background p-4">
					<div className="max-w-md w-full bg-surface rounded-2xl shadow-card p-8 text-center">
						<div className="mb-6">
							<svg className="w-16 h-16 mx-auto text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
						</div>
						<h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h2>
						<p className="text-text-secondary mb-6">
							We&apos;re sorry, but something unexpected happened. Our team has been notified.
						</p>
						<div className="space-y-3">
							<button
								type="button"
								onClick={this.handleReload}
								className="btn-primary w-full"
							>
								Reload Page
							</button>
							<Link
								href="/"
								className="block w-full py-3 px-4 border border-border rounded-lg text-foreground hover:bg-surface transition-colors text-center"
							>
								Go to Homepage
							</Link>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
