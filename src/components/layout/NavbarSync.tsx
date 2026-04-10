"use client";

import { useEffect, useRef } from "react";
import { useNavbar } from "./NavbarContext";
import React from "react";

interface NavbarConfig {
	title?: string | React.ReactNode;
	showBack?: boolean;
	backHref?: string;
	rightAction?: React.ReactNode;
	isLogo?: boolean;
}

export default function NavbarSync(config: NavbarConfig) {
	const { setConfig } = useNavbar();
	const configRef = useRef(config);

	useEffect(() => {
		// Only update if the ref actually changed or on mount
		// We use a ref to avoid the circular JSON.stringify issue
		// and the infinite loop of setConfig changing state -> re-render
		setConfig(config);
		
		return () => {
			// Optional: reset config on unmount if needed
		};
	}, [setConfig]); // Config is passed as props, we treat it as stable for the life of the mount

	return null;
}
