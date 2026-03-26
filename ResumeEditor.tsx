import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Briefcase, GraduationCap, Wrench, FolderOpen, Award, Globe,
  Plus, Trash2, Upload, X, Wand2, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react';
import type { ResumeData, Experience, Project, Education, createId } from '../types/resume';
import { generateSummary, generateExperiencePoints, generateProjectPoints, suggestSkills, enhanceBulletPoint } from '../lib/aiEngine';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onClose: () => void;
}

const tabs = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'summary', label: 'Summary', icon: Sparkles },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'other', label: 'Other', icon: Award },
];

const genId = () => Math.random().toString(36).substr(2, 9);

export default function ResumeEditor({ data, onChange, onClose }: Props) {
  const [activeTab, setActiveTab] = useState('personal');
  const [skillInput, setSkillInput] = useState('');\n  const [langInput, setLangInput] = useState('');\n  const [certInput, setCertInput] = useState('');\n  const [isGenerating, setIsGenerating] = useState(false);

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updatePersonalInfo('photo', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // AI Generation handlers
  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 500));
    const summary = generateSummary(data);
    onChange({ ...data, summary });
    setIsGenerating(false);
  };

  const handleSuggestSkills = () => {
    const skills = suggestSkills(data.personalInfo.title, data.skills);
    onChange({ ...data, skills });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: Experience = { id: genId(), title: '', company: '', duration: '', points: [] };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    const updated = data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp);
    onChange({ ...data, experience: updated });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(exp => exp.id !== id) });
  };

  const generateExpPoints = async (id: string) => {
    const exp = data.experience.find(e => e.id === id);
    if (!exp) return;
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 500));
    const points = generateExperiencePoints(exp.title, exp.company);
    updateExperience(id, 'points', points);
    setIsGenerating(false);
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: Education = { id: genId(), degree: '', institution: '', year: '' };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = data.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu);
    onChange({ ...data, education: updated });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(edu => edu.id !== id) });
  };

  // Project handlers
  const addProject = () => {
    const newProj: Project = { id: genId(), name: '', description: '', points: [] };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    const updated = data.projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj);
    onChange({ ...data, projects: updated });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(proj => proj.id !== id) });
  };

  const generateProjPoints = async (id: string) => {
    const proj = data.projects.find(p => p.id === id);
    if (!proj) return;
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 500));
    const points = generateProjectPoints(proj.name, proj.description);
    updateProject(id, 'points', points);
    setIsGenerating(false);
  };

  // Skills/Languages/Certs handlers
  const addSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      onChange({ ...data, skills: [...data.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    onChange({ ...data, skills: data.skills.filter(s => s !== skill) });
  };

  const addLanguage = () => {
    if (langInput.trim() && !data.languages.includes(langInput.trim())) {
      onChange({ ...data, languages: [...data.languages, langInput.trim()] });
      setLangInput('');
    }
  };

  const removeLanguage = (lang: string) => {
    onChange({ ...data, languages: data.languages.filter(l => l !== lang) });
  };

  const addCertification = () => {
    if (certInput.trim() && !data.certifications.includes(certInput.trim())) {
      onChange({ ...data, certifications: [...data.certifications, certInput.trim()] });
      setCertInput('');
    }
  };

  const removeCertification = (cert: string) => {
    onChange({ ...data, certifications: data.certifications.filter(c => c !== cert) });
  };

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all backdrop-blur-sm";
  const labelClass = "block text-xs font-medium text-white/70 mb-1.5";

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              {data.personalInfo.photo ? (
                <div className="relative group">
                  <img src={data.personalInfo.photo} alt="" className="w-20 h-20 rounded-2xl object-cover border-2 border-violet-500/50" />
                  <button 
                    onClick={() => updatePersonalInfo('photo', '')} 
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <label className="w-20 h-20 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-violet-500/50 transition-all">
                  <Upload size={20} className="text-white/40 mb-1" />
                  <span className="text-[10px] text-white/40">Photo</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              )}
              <div className="flex-1 space-y-3">
                <input type="text" value={data.personalInfo.fullName} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} className={inputClass} placeholder="Full Name" />
                <input type="text" value={data.personalInfo.title} onChange={(e) => updatePersonalInfo('title', e.target.value)} className={inputClass} placeholder="Professional Title" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelClass}>Email</label><input type="email" value={data.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} className={inputClass} placeholder="email@example.com" /></div>
              <div><label className={labelClass}>Phone</label><input type="tel" value={data.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} className={inputClass} placeholder="+1 (555) 123-4567" /></div>
            </div>
            <div><label className={labelClass}>Location</label><input type="text" value={data.personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} className={inputClass} placeholder="City, State/Country" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelClass}>LinkedIn</label><input type="text" value={data.personalInfo.linkedin} onChange={(e) => updatePersonalInfo('linkedin', e.target.value)} className={inputClass} placeholder="linkedin.com/in/..." /></div>
              <div><label className={labelClass}>GitHub</label><input type="text" value={data.personalInfo.github} onChange={(e) => updatePersonalInfo('github', e.target.value)} className={inputClass} placeholder="github.com/..." /></div>
            </div>
            <div><label className={labelClass}>Website</label><input type="text" value={data.personalInfo.website} onChange={(e) => updatePersonalInfo('website', e.target.value)} className={inputClass} placeholder="yourwebsite.com" /></div>
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className={labelClass}>Professional Summary</label>
              <button onClick={handleGenerateSummary} disabled={isGenerating} className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl text-xs font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                <Wand2 size={12} className={isGenerating ? 'animate-spin' : ''} />
                {isGenerating ? 'Generating...' : 'AI Generate'}
              </button>
            </div>
            <textarea value={data.summary} onChange={(e) => onChange({ ...data, summary: e.target.value })} rows={6} className={`${inputClass} resize-none`} placeholder="Write a compelling professional summary..." />
            <p className="text-xs text-white/40">Tip: Include years of experience, key skills, and notable achievements with metrics.</p>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-violet-400">Experience</span>
                  <button onClick={() => removeExperience(exp.id)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={exp.title} onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} className={inputClass} placeholder="Job Title" />
                  <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className={inputClass} placeholder="Company" />
                </div>
                <input type="text" value={exp.duration} onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)} className={inputClass} placeholder="Jan 2020 - Present" />
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs text-white/60">Achievements</label>
                    <button onClick={() => generateExpPoints(exp.id)} disabled={isGenerating} className="flex items-center gap-1 px-2 py-1 bg-violet-500/20 text-violet-300 rounded-lg text-xs hover:bg-violet-500/30 transition-colors disabled:opacity-50">
                      <Wand2 size={10} /> Generate
                    </button>
                  </div>
                  <textarea value={exp.points.join('\n')} onChange={(e) => updateExperience(exp.id, 'points', e.target.value.split('\n').filter(p => p.trim()))} rows={4} className={`${inputClass} resize-none`} placeholder="• Led team of 5 developers...&#10;• Increased revenue by 30%..." />
                </div>
              </motion.div>
            ))}
            <button onClick={addExperience} className="w-full py-3 border-2 border-dashed border-white/20 rounded-2xl text-white/60 hover:border-violet-500/50 hover:text-violet-400 transition-all flex items-center justify-center gap-2">
              <Plus size={18} /> Add Experience
            </button>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            {data.education.map((edu) => (
              <motion.div key={edu.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-violet-400">Education</span>
                  <button onClick={() => removeEducation(edu.id)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
                <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className={inputClass} placeholder="Degree / Certification" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} className={inputClass} placeholder="Institution" />
                  <input type="text" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} className={inputClass} placeholder="Year" />
                </div>
              </motion.div>
            ))}
            <button onClick={addEducation} className="w-full py-3 border-2 border-dashed border-white/20 rounded-2xl text-white/60 hover:border-violet-500/50 hover:text-violet-400 transition-all flex items-center justify-center gap-2">
              <Plus size={18} /> Add Education
            </button>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className={labelClass}>Skills</label>
              <button onClick={handleSuggestSkills} className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl text-xs font-medium text-white hover:opacity-90 transition-opacity">
                <Sparkles size={12} /> AI Suggest
              </button>
            </div>
            <div className="flex gap-2">
              <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addSkill()} className={`flex-1 ${inputClass}`} placeholder="Add a skill..." />
              <button onClick={addSkill} className="px-4 py-3 bg-violet-500 text-white rounded-2xl hover:bg-violet-600 transition-colors"><Plus size={18} /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-white/10 text-white rounded-xl flex items-center gap-2 text-sm border border-white/10">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="text-white/40 hover:text-red-400"><X size={14} /></button>
                </span>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <motion.div key={proj.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-violet-400">Project</span>
                  <button onClick={() => removeProject(proj.id)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
                <input type="text" value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} className={inputClass} placeholder="Project Name" />
                <textarea value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Brief description..." />
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs text-white/60">Key Points</label>
                    <button onClick={() => generateProjPoints(proj.id)} disabled={isGenerating} className="flex items-center gap-1 px-2 py-1 bg-violet-500/20 text-violet-300 rounded-lg text-xs hover:bg-violet-500/30 transition-colors disabled:opacity-50">
                      <Wand2 size={10} /> Generate
                    </button>
                  </div>
                  <textarea value={proj.points.join('\n')} onChange={(e) => updateProject(proj.id, 'points', e.target.value.split('\n').filter(p => p.trim()))} rows={3} className={`${inputClass} resize-none`} placeholder="• Built scalable architecture...&#10;• Improved performance by 50%..." />
                </div>
              </motion.div>
            ))}
            <button onClick={addProject} className="w-full py-3 border-2 border-dashed border-white/20 rounded-2xl text-white/60 hover:border-violet-500/50 hover:text-violet-400 transition-all flex items-center justify-center gap-2">
              <Plus size={18} /> Add Project
            </button>
          </div>
        );

      case 'other':
        return (
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Languages</label>
              <div className="flex gap-2 mb-3">
                <input type="text" value={langInput} onChange={(e) => setLangInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addLanguage()} className={`flex-1 ${inputClass}`} placeholder="e.g., English (Native)" />
                <button onClick={addLanguage} className="px-4 py-3 bg-violet-500 text-white rounded-2xl hover:bg-violet-600 transition-colors"><Plus size={18} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.languages.map((lang, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/10 text-white rounded-xl flex items-center gap-2 text-sm border border-white/10">
                    {lang}
                    <button onClick={() => removeLanguage(lang)} className="text-white/40 hover:text-red-400"><X size={14} /></button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Certifications</label>
              <div className="flex gap-2 mb-3">
                <input type="text" value={certInput} onChange={(e) => setCertInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addCertification()} className={`flex-1 ${inputClass}`} placeholder="e.g., AWS Solutions Architect" />
                <button onClick={addCertification} className="px-4 py-3 bg-violet-500 text-white rounded-2xl hover:bg-violet-600 transition-colors"><Plus size={18} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.certifications.map((cert, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/10 text-white rounded-xl flex items-center gap-2 text-sm border border-white/10">
                    {cert}
                    <button onClick={() => removeCertification(cert)} className="text-white/40 hover:text-red-400"><X size={14} /></button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-y-0 left-0 w-full sm:w-[440px] bg-gradient-to-b from-slate-900/98 via-slate-900/98 to-violet-950/98 backdrop-blur-xl z-50 flex flex-col border-r border-white/10"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Edit Resume</h2>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
          <X size={20} className="text-white/60" />
        </button>
      </div>

      <div className="flex gap-1 p-3 overflow-x-auto border-b border-white/10 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
