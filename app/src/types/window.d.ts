type Brand = {
	readonly brand: string;
	readonly version: string;
};

type NavigatorUAData = {
	readonly brands: Array<Brand>;
	readonly mobile: boolean;
	readonly platform: string;
};

interface Navigator {
	userAgentData: NavigatorUAData;
}
