export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  points: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  points: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export type TemplateType = 'minimal' | 'modern' | 'sidebar' | 'creative' | 'glass';

export interface ResumeData {
  template: TemplateType;
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    photo: string;
  };
  summary: string;
  experience: Experience[];
  projects: Project[];
  skills: string[];
  education: Education[];
  languages: string[];
  certifications: string[];
}

export const createId = () => Math.random().toString(36).substr(2, 9);

export const defaultResume: ResumeData = {
  template: 'modern',
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    photo: '',
  },
  summary: '',
  experience: [],
  projects: [],
  skills: [],
  education: [],
  languages: [],
  certifications: [],
};

export const sampleResume: ResumeData = {
  template: 'modern',
  personalInfo: {
    fullName: 'Sarah Mitchell',
    title: 'Senior Full Stack Developer',
    email: 'sarah.mitchell@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarahmitchell',
    github: 'github.com/sarahmitchell',
    website: 'sarahmitchell.dev',
    photo: '',
  },
  summary: 'Innovative Full Stack Developer with 7+ years of experience building scalable web applications. Led development of microservices architecture serving 2M+ users. Expert in React, Node.js, and cloud technologies with a track record of reducing deployment time by 60% and improving application performance by 45%.',
  experience: [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      company: 'TechVentures Inc.',
      duration: 'Jan 2021 - Present',
      points: [
        'Architected and deployed microservices infrastructure handling 2M+ daily active users with 99.9% uptime',
        'Led team of 8 developers, implementing agile methodologies that increased sprint velocity by 40%',
        'Reduced application load time by 65% through code optimization and implementing Redis caching',
        'Designed CI/CD pipeline reducing deployment time from 2 hours to 15 minutes'
      ]
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'InnovateTech Solutions',
      duration: 'Mar 2018 - Dec 2020',
      points: [
        'Built real-time collaboration platform used by 500K+ professionals globally',
        'Implemented GraphQL API reducing data over-fetching by 70% and improving mobile performance',
        'Developed automated testing framework achieving 95% code coverage',
        'Mentored 5 junior developers, with 3 receiving promotions within 18 months'
      ]
    }
  ],
  projects: [
    {
      id: '1',
      name: 'E-Commerce Platform Redesign',
      description: 'Complete overhaul of legacy e-commerce system',
      points: [
        'Migrated monolithic architecture to microservices, improving scalability by 300%',
        'Implemented headless CMS reducing content update time from days to minutes',
        'Achieved 40% increase in conversion rate through UX improvements'
      ]
    },
    {
      id: '2',
      name: 'AI-Powered Analytics Dashboard',
      description: 'Real-time business intelligence platform',
      points: [
        'Built predictive analytics engine processing 10M+ data points daily',
        'Reduced report generation time by 80% using optimized SQL queries',
        'Integrated ML models for anomaly detection with 94% accuracy'
      ]
    }
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Redis', 'CI/CD'],
  education: [
    {
      id: '1',
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      year: '2018'
    },
    {
      id: '2',
      degree: 'Bachelor of Science in Software Engineering',
      institution: 'UC Berkeley',
      year: '2016'
    }
  ],
  languages: ['English (Native)', 'Spanish (Professional)', 'Mandarin (Conversational)'],
  certifications: ['AWS Solutions Architect Professional', 'Google Cloud Professional Developer', 'Kubernetes Administrator (CKA)']
};
