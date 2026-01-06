
export interface UserVerificationData {
  user_json_url: string;
}

export interface PrivacyPolicyConfig {
  companyName: string;
  websiteUrl: string;
  dataTypes: string[];
}

declare global {
  interface Window {
    phoneEmailListener?: (userObj: UserVerificationData) => void;
  }
}
