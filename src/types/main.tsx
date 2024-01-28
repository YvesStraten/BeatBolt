type ApplicationDefault = {
	Links: string[];
	setLinks: (args: any) => void;
};

export type NavType = {
	selected: string;
	selectHandler: (selected: string) => void;
};
export default ApplicationDefault;
