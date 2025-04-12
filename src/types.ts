export interface Candidate {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  experience: string;
  skills: string[];
  highestQualification: string;
  careerExperience: string;
  created_at: string;
}

export interface FilterOptions {
  gender?: string;
  experience?: string;
  skills?: string[];
  highestQualification?: string;
}

export type ViewMode = 'list' | 'grid';