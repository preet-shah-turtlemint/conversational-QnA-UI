export enum API_CONSTANTS {
	BASE_URL = 'api/campaign-management/v1/',
    CAMPAIGN = 'campaign',
    CREATE_CAMPAIGN = 'cohorts/static',
	COHORT_SUMMARY = 'cohorts',
	PROCESS = "process-text",
	AUDIO = "process-audio"

}

export interface FluxStandardAction {
	type: string;
	payload?: any;
	error?: boolean | any;
	meta?: any;
}