import { Candidate } from '../types';

// Initial mock data
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Rahul',
    phone: '9658107890',
    email: 'rahul@gmail.com',
    gender: 'Male',
    experience: '5 Years',
    skills: ['JavaScript', 'React', 'Node.js'],
    highestQualification: 'Masters in Computer Science',
    careerExperience: 'Full Stack Developer',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Pooja',
    phone: '9876568901',
    email: 'pooja@gmail.com',
    gender: 'Female',
    experience: '3 Years',
    skills: ['Python', 'Django', 'PostgreSQL'],
    highestQualification: 'Bachelor in Software Engineering',
    careerExperience: 'Backend Developer',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Mahesh',
    phone: '9876254112',
    email: 'mahesh@gmail.com',
    gender: 'Male',
    experience: '6 Years',
    skills: ['Java', 'Spring', 'AWS'],
    highestQualification: 'PhD in Computer Science',
    careerExperience: 'Senior Software Engineer',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Sarah',
    phone: '9567890123',
    email: 'sarah@gmail.com',
    gender: 'Female',
    experience: '4 Years',
    skills: ['React', 'TypeScript', 'GraphQL'],
    highestQualification: 'Masters in Information Technology',
    careerExperience: 'Frontend Developer',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Ram',
    phone: '9558901234',
    email: 'ram@gmail.com',
    gender: 'Male',
    experience: '6 Years',
    skills: ['Python', 'TensorFlow', 'AWS'],
    highestQualification: 'PhD in Machine Learning',
    careerExperience: 'AI Engineer',
    created_at: new Date().toISOString()
  }
];

let candidates = [...mockCandidates];

export const candidateService = {
  getCandidates: async (filters: {
    search?: string;
    gender?: string;
    experience?: string;
    skills?: string[];
    highestQualification?: string;
  }) => {
    let filteredCandidates = [...candidates];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredCandidates = filteredCandidates.filter(
        candidate =>
          candidate.name.toLowerCase().includes(searchLower) ||
          candidate.email.toLowerCase().includes(searchLower) ||
          candidate.phone.includes(filters.search)
      );
    }

    if (filters.gender) {
      filteredCandidates = filteredCandidates.filter(
        candidate => candidate.gender === filters.gender
      );
    }

    if (filters.experience) {
      filteredCandidates = filteredCandidates.filter(
        candidate => candidate.experience === filters.experience
      );
    }

    if (filters.skills && filters.skills.length > 0) {
      filteredCandidates = filteredCandidates.filter(candidate =>
        filters.skills!.every(skill => candidate.skills.includes(skill))
      );
    }

    if (filters.highestQualification) {
      filteredCandidates = filteredCandidates.filter(
        candidate => candidate.highestQualification === filters.highestQualification
      );
    }

    return filteredCandidates.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  addCandidate: async (candidate: Omit<Candidate, 'id' | 'created_at'>) => {
    const newCandidate: Candidate = {
      ...candidate,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };

    candidates.push(newCandidate);
    return newCandidate;
  }
};