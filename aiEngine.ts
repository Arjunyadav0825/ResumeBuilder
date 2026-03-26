import type { ResumeData, Experience, Project, createId } from '../types/resume';

const actionVerbs = [
  'Developed', 'Engineered', 'Architected', 'Implemented', 'Designed',
  'Led', 'Managed', 'Coordinated', 'Spearheaded', 'Orchestrated',
  'Optimized', 'Improved', 'Enhanced', 'Streamlined', 'Accelerated',
  'Built', 'Created', 'Launched', 'Deployed', 'Delivered',
  'Reduced', 'Increased', 'Achieved', 'Generated', 'Saved'
];

const metrics = [
  '25%', '30%', '40%', '50%', '60%', '70%',
  '2x', '3x', '5x', '10x',
  '100+', '500+', '1000+', '10K+', '100K+', '1M+',
  '$50K', '$100K', '$500K', '$1M'
];

const techKeywords: Record<string, string[]> = {
  frontend: ['React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Next.js', 'Redux'],
  backend: ['Node.js', 'Python', 'Java', 'Go', 'REST API', 'GraphQL', 'Microservices', 'Express'],
  database: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB', 'Elasticsearch'],
  cloud: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  data: ['Python', 'SQL', 'Pandas', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Data Analysis'],
  design: ['Figma', 'Adobe XD', 'Sketch', 'UI/UX', 'Design Systems', 'Prototyping', 'User Research'],
  management: ['Agile', 'Scrum', 'JIRA', 'Roadmapping', 'Stakeholder Management', 'Team Leadership']
};

export function detectDomain(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('frontend') || lower.includes('react') || lower.includes('ui')) return 'frontend';
  if (lower.includes('backend') || lower.includes('api') || lower.includes('server')) return 'backend';
  if (lower.includes('data') || lower.includes('analyst') || lower.includes('ml')) return 'data';
  if (lower.includes('design') || lower.includes('ux') || lower.includes('ui')) return 'design';
  if (lower.includes('manager') || lower.includes('lead') || lower.includes('director')) return 'management';
  if (lower.includes('cloud') || lower.includes('devops') || lower.includes('infrastructure')) return 'cloud';
  return 'backend';
}

export function generateSummary(data: Partial<ResumeData>): string {
  const title = data.personalInfo?.title || 'Professional';
  const domain = detectDomain(title);
  const yearsExp = data.experience?.length ? Math.max(data.experience.length * 2, 3) : 3;
  const topSkills = data.skills?.slice(0, 3).join(', ') || techKeywords[domain]?.slice(0, 3).join(', ');
  
  const templates = [
    `Results-driven ${title} with ${yearsExp}+ years of experience delivering high-impact solutions. Proven expertise in ${topSkills}, with a track record of driving innovation and exceeding business objectives. Passionate about building scalable systems and leading cross-functional teams.`,
    `Innovative ${title} with ${yearsExp}+ years specializing in ${topSkills}. Successfully led projects that increased efficiency by 40% and reduced costs by 30%. Committed to leveraging cutting-edge technologies to solve complex business challenges.`,
    `Dynamic ${title} bringing ${yearsExp}+ years of hands-on experience in ${topSkills}. Known for architecting solutions that scale to millions of users while maintaining 99.9% uptime. Strong collaborator with excellent communication skills.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

export function enhanceBulletPoint(point: string): string {
  const trimmed = point.trim();
  if (!trimmed) return '';
  
  // Check if already starts with action verb
  const startsWithVerb = actionVerbs.some(verb => 
    trimmed.toLowerCase().startsWith(verb.toLowerCase())
  );
  
  if (startsWithVerb) {
    // Add metrics if not present
    const hasMetric = /\d+%|\d+x|\$\d+|\d+K\+|\d+M\+/.test(trimmed);
    if (!hasMetric) {
      const metric = metrics[Math.floor(Math.random() * metrics.length)];
      return `${trimmed}, resulting in ${metric} improvement`;
    }
    return trimmed;
  }
  
  // Add action verb and enhance
  const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
  const metric = metrics[Math.floor(Math.random() * metrics.length)];
  
  // Simple enhancement
  const enhanced = trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
  return `${verb} ${enhanced}, achieving ${metric} improvement in efficiency`;
}

export function generateProjectPoints(name: string, description: string): string[] {
  const combined = `${name} ${description}`.toLowerCase();
  const domain = detectDomain(combined);
  const techs = techKeywords[domain] || techKeywords.backend;
  
  const pointTemplates = [
    `Built scalable architecture using ${techs[0]} and ${techs[1]}, handling ${metrics[Math.floor(Math.random() * 6) + 6]} requests daily`,
    `Implemented automated testing achieving 95% code coverage and reducing bugs by ${metrics[Math.floor(Math.random() * 6)]}`,
    `Optimized performance resulting in ${metrics[Math.floor(Math.random() * 6)]} faster load times and improved user experience`,
    `Designed intuitive UI/UX increasing user engagement by ${metrics[Math.floor(Math.random() * 6)]} and reducing bounce rate`,
    `Deployed using ${techs[4] || 'cloud infrastructure'} with CI/CD pipeline enabling rapid iteration`,
    `Collaborated with cross-functional team of 5+ members delivering project 2 weeks ahead of schedule`
  ];
  
  // Shuffle and return 3-4 points
  const shuffled = pointTemplates.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3 + Math.floor(Math.random() * 2));
}

export function generateExperiencePoints(title: string, company: string): string[] {
  const domain = detectDomain(title);
  const techs = techKeywords[domain] || techKeywords.backend;
  
  const pointTemplates = [
    `Led development of core platform features using ${techs[0]} and ${techs[1]}, serving ${metrics[Math.floor(Math.random() * 6) + 6]} users`,
    `Architected microservices infrastructure reducing deployment time by ${metrics[Math.floor(Math.random() * 6)]} and improving reliability`,
    `Mentored team of ${3 + Math.floor(Math.random() * 5)} developers, implementing best practices that increased code quality by ${metrics[Math.floor(Math.random() * 6)]}`,
    `Spearheaded migration to ${techs[4] || 'cloud'} resulting in ${metrics[Math.floor(Math.random() * 6)]} cost reduction`,
    `Designed and implemented RESTful APIs handling ${metrics[Math.floor(Math.random() * 6) + 6]} requests per minute with 99.9% uptime`,
    `Collaborated with product and design teams to deliver features that increased user retention by ${metrics[Math.floor(Math.random() * 6)]}`
  ];
  
  const shuffled = pointTemplates.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3 + Math.floor(Math.random() * 2));
}

export function suggestSkills(title: string, existingSkills: string[]): string[] {
  const domain = detectDomain(title);
  const domainSkills = techKeywords[domain] || [];
  const newSkills = domainSkills.filter(skill => 
    !existingSkills.some(s => s.toLowerCase() === skill.toLowerCase())
  );
  return [...existingSkills, ...newSkills.slice(0, Math.max(0, 12 - existingSkills.length))];
}

export function improveText(text: string, type: 'summary' | 'bullet' | 'description'): string {
  if (type === 'bullet') {
    return enhanceBulletPoint(text);
  }
  
  if (type === 'summary') {
    // Add metrics and power words
    let improved = text;
    if (!improved.includes('%') && !improved.includes('year')) {
      improved = improved.replace(/experience/i, '7+ years of experience');
    }
    return improved;
  }
  
  return text;
}
