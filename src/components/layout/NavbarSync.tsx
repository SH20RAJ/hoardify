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
	const hasSet = useRef(false);

	useEffect(() => {
		// Set config once per mount/update if it's different.
		// Since config is passed as props from a server component, 
		// it's usually static for the life of the page mount.
		setConfig(config);
		hasSet.current = true;
	}, [setConfig, config]); // config is a brand new object on every render of the parent

	return null;
}

