export type Session = {
	csrfState?: string;
	jobSeeker?: {
		id: string;
	};
	destroy: () => Promise<void>;
};
