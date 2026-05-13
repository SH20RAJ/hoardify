"use client";

import { useEffect, useRef, useCallback } from "react";
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
	const configRef = useRef<NavbarConfig | null>(null);

	const applyConfig = useCallback(() => {
		setConfig(config);
	}, [setConfig, config]);

	useEffect(() => {
		// Only sync if config has changed in a way that matters (handled by setConfig's internal check)
		applyConfig();
	}, [applyConfig]);

	return null;
}

