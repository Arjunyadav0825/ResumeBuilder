import type { ResumeData } from '../types/resume';

const actionVerbs = [
  'Developed', 'Led', 'Improved', 'Built', 'Designed', 'Implemented',
  'Managed', 'Created', 'Achieved', 'Delivered', 'Streamlined', 'Optimized',
  'Spearheaded', 'Orchestrated', 'Pioneered', 'Transformed', 'Accelerated'
];

const skillsByRole: Record<string, string[]> = {
  'software': ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker', 'REST APIs'],
  'data': ['Python', 'SQL', 'Machine Learning', 'TensorFlow', 'Pandas', 'Data Visualization', 'Statistics', 'R', 'Tableau'],
  'design': ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX Design', 'Wireframing', 'Prototyping', 'Design Systems'],
  'marketing': ['SEO', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing', 'CRM', 'A/B Testing', 'Copywriting'],
  'product': ['Product Strategy', 'Agile', 'Scrum', 'JIRA', 'User Research', 'Roadmapping', 'Stakeholder Management', 'Analytics'],
  'default': ['Microsoft Office', 'Communication', 'Problem Solving', 'Team Collaboration', 'Project Management', 'Analytical Skills']
};

const projectPointTemplates: Record<string, string[][]> = {
  'web': [
    ['Built responsive web application using React and TypeScript, achieving 95% mobile compatibility'],
    ['Implemented RESTful API integration, reducing data fetch time by 40%'],
    ['Designed intuitive user interface following modern UX principles, increasing user engagement by 35%'],
    ['Deployed application on cloud infrastructure with CI/CD pipeline for automated testing'],
    ['Optimized application performance achieving 90+ Lighthouse score'],
    ['Integrated authentication system with OAuth 2.0 and JWT tokens'],
  ],
  'mobile': [
    ['Developed cross-platform mobile application serving 10,000+ active users'],
    ['Implemented offline-first architecture with local data synchronization'],
    ['Achieved 4.5+ star rating on app stores through focus on user experience'],
    ['Reduced app load time by 50% through code splitting and lazy loading'],
    ['Integrated push notifications increasing user retention by 25%'],
    ['Built custom animations and transitions for smooth user interactions'],
  ],
  'ml': [
    ['Trained machine learning model achieving 92% accuracy on test dataset'],
    ['Processed and cleaned 100,000+ data points for model training'],
    ['Implemented feature engineering pipeline reducing training time by 30%'],
    ['Deployed model using Flask API for real-time predictions'],
    ['Created data visualization dashboard for model performance monitoring'],
    ['Applied hyperparameter tuning to optimize model performance'],
  ],
  'api': [
    ['Designed and implemented RESTful API handling 10,000+ requests per minute'],
    ['Built microservices architecture improving system scalability by 60%'],
    ['Implemented caching strategy reducing database load by 45%'],
    ['Created comprehensive API documentation using Swagger/OpenAPI'],
    ['Developed rate limiting and authentication middleware for security'],
    ['Achieved 99.9% uptime through robust error handling and monitoring'],
  ],
  'default': [
    ['Led end-to-end development from concept to deployment'],
    ['Collaborated with cross-functional team to deliver project on schedule'],
    ['Implemented automated testing achieving 85% code coverage'],
    ['Documented technical specifications and user guides'],
    ['Utilized agile methodology for iterative development'],
    ['Received positive feedback from stakeholders and end-users'],
  ]
};

export function detectRole(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('software') || lower.includes('developer') || lower.includes('engineer') || lower.includes('frontend') || lower.includes('backend')) return 'software';
  if (lower.includes('data') || lower.includes('analyst') || lower.includes('scientist')) return 'data';
  if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) return 'design';
  if (lower.includes('marketing') || lower.includes('growth') || lower.includes('seo')) return 'marketing';
  if (lower.includes('product') || lower.includes('manager') || lower.includes('pm')) return 'product';
  return 'default';
}

export function detectProjectType(projectName: string, description: string): string {
  const combined = `${projectName} ${description}`.toLowerCase();
  if (combined.includes('web') || combined.includes('website') || combined.includes('react') || combined.includes('frontend')) return 'web';
  if (combined.includes('mobile') || combined.includes('app') || combined.includes('android') || combined.includes('ios')) return 'mobile';
  if (combined.includes('ml') || combined.includes('machine learning') || combined.includes('ai') || combined.includes('data')) return 'ml';
  if (combined.includes('api') || combined.includes('backend') || combined.includes('server') || combined.includes('microservice')) return 'api';
  return 'default';
}

export function generateProjectPoints(projectName: string, description: string): string[] {
  const projectType = detectProjectType(projectName, description);
  const templates = projectPointTemplates[projectType] || projectPointTemplates.default;
  
  // Shuffle and pick 4 unique points
  const shuffled = [...templates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4).map(points => points[0]);
}

export function selectTemplate(data: Partial<ResumeData>): 'modern' | 'sidebar' | 'minimal' | 'executive' | 'creative' | 'compact' {
  const hasExperience = data.experience && data.experience.length > 0;
  const hasProjects = data.projects && data.projects.length > 0;
  const role = detectRole(data.title || '');
  
  if (role === 'design' || (!hasExperience && hasProjects)) return 'sidebar';
  if (!hasExperience && !hasProjects) return 'minimal';
  return 'modern';
}

export function generateSummary(data: Partial<ResumeData>): string {
  const role = data.title || 'Professional';
  const yearsExp = data.experience?.length ? data.experience.length * 2 : 1;
  const topSkills = data.skills?.slice(0, 3).join(', ') || 'diverse skills';
  
  return `Results-driven ${role} with ${yearsExp}+ years of experience delivering high-impact solutions. Proven track record in ${topSkills}, with a passion for driving innovation and exceeding organizational objectives.`;
}

export function enhanceBulletPoint(point: string): string {
  const hasActionVerb = actionVerbs.some(verb => point.startsWith(verb));
  if (!hasActionVerb) {
    const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    return `${randomVerb} ${point.charAt(0).toLowerCase()}${point.slice(1)}`;
  }
  return point;
}

export function suggestSkills(title: string, existingSkills: string[]): string[] {
  const role = detectRole(title);
  const roleSkills = skillsByRole[role] || skillsByRole.default;
  const newSkills = roleSkills.filter(skill => !existingSkills.includes(skill));
  return [...existingSkills, ...newSkills.slice(0, 10 - existingSkills.length)];
}

export function optimizeForATS(data: ResumeData): ResumeData {
  return {
    ...data,
    summary: data.summary || generateSummary(data),
    skills: data.skills.length > 0 ? data.skills : suggestSkills(data.title, []),
    experience: data.experience.map(exp => ({
      ...exp,
      points: exp.points.map(enhanceBulletPoint)
    }))
  };
}
