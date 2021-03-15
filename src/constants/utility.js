export const SERVICE_URL = 'https://service.micro-lending.stacksapien.com';
// export const SERVICE_URL = 'http://localhost:4004';

export const DEFAULT_SERVICE_VERSION = 'v1';

//ROLES 
export const ROLES = ['user', 'agent', 'sub-agent', 'admin'];
export const USER_ROLE = 'user';
export const AGENT_ROLE = 'agent';
export const SUB_AGENT_ROLE = 'sub-agent';
export const ADMIN_ROLE = 'admin';

//KYC Status for user
export const KYC_STATUS_PENDING = "pending";
export const KYC_STATUS_DONE = "done";
export const KYC_PAGE_URL = "/kyc-details";

export const EMAIL_REGEX = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';