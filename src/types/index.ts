export interface User {
  id: string;
  email: string;
  fullName: string;
  age: number;
  bio: string;
  gender: string;
  interestedIn: string;
  city: string;
  phoneNumber: string;
  interests: string[];
  race?: string;
  profilePicture?: string;
  subscriptionFee?: number;
  userType?: "fan" | "creator";
}

export interface ProfileSetupStep {
  step: number;
  title: string;
  subtitle: string;
}

export interface Match {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  profilePicture: string;
  followers: number;
  subscribers: number;
}
