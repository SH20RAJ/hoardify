"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarConfig {
	title?: string | React.ReactNode;
	showBack?: boolean;
	backHref?: string;
	rightAction?: React.ReactNode;
	isLogo?: boolean;
}

interface NavbarContextType {
	config: NavbarConfig;
	setConfig: (config: NavbarConfig) => void;
	resetConfig: () => void;
}

const defaultConfig: NavbarConfig = {
	title: "",
	showBack: false,
	backHref: "/",
	rightAction: null,
	isLogo: true,
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: React.ReactNode }) {
	const [config, setConfigState] = useState<NavbarConfig>(defaultConfig);
	const pathname = usePathname();

	// Reset config on route change to prevent stale headers
	useEffect(() => {
		setConfigState(defaultConfig);
	}, [pathname]);

	const setConfig = (newConfig: NavbarConfig) => {
		setConfigState((prev) => ({ ...prev, ...newConfig }));
	};

	const resetConfig = () => {
		setConfigState(defaultConfig);
	};

	return (
		<NavbarContext.Provider value={{ config, setConfig, resetConfig }}>
			{children}
		</NavbarContext.Provider>
	);
}

export function useNavbar() {
	const context = useContext(NavbarContext);
	if (context === undefined) {
		throw new Error("useNavbar must be used within a NavbarProvider");
	}
	return context;
}
