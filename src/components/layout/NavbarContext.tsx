"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

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

	const setConfig = useCallback((newConfig: NavbarConfig) => {
		setConfigState((prev) => {
			// Skip update if values are identical (safe for ReactNodes)
			const isDifferent = 
				(newConfig.title !== undefined && newConfig.title !== prev.title) ||
				(newConfig.showBack !== undefined && newConfig.showBack !== prev.showBack) ||
				(newConfig.backHref !== undefined && newConfig.backHref !== prev.backHref) ||
				(newConfig.rightAction !== undefined && newConfig.rightAction !== prev.rightAction) ||
				(newConfig.isLogo !== undefined && newConfig.isLogo !== prev.isLogo);

			if (!isDifferent) return prev;
			return { ...prev, ...newConfig };
		});
	}, []);


	const resetConfig = useCallback(() => {
		setConfigState(defaultConfig);
	}, []);

	const value = useMemo(() => ({
		config,
		setConfig,
		resetConfig
	}), [config, setConfig, resetConfig]);

	return (
		<NavbarContext.Provider value={value}>
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
