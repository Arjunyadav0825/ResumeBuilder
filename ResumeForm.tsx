import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, GraduationCap, Code, Languages, Plus, Trash2, ChevronRight, ChevronLeft, Sparkles, Upload, X, Wand2, Check } from 'lucide-react';
import type { ResumeData, Experience, Education, Project } from '../types/resume';
import { suggestSkills, generateProjectPoints } from '../lib/resumeAI';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const steps = [
  { id: 'personal', label: 'Info', fullLabel: 'Personal', icon: User },
  { id: 'experience', label: 'Work', fullLabel: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Edu', fullLabel: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', fullLabel: 'Skills', icon: Code },
  { id: 'languages', label: 'Lang', fullLabel: 'Languages', icon: Languages },
];

export default function ResumeForm({ data, onChange }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [skillInput, setSkillInput] = useState('');
  const [langInput, setLangInput] = useState('');
  const [generatingPoints, setGeneratingPoints] = useState<number | null>(null);
  const [suggestedPoints, setSuggestedPoints] = useState<{ index: number; points: string[] } | null>(null);

  const updateField = <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updateField('photo', '');
  };

  const addExperience = () => {
    const newExp: Experience = { role: '', company: '', duration: '', points: [''] };
    updateField('experience', [...data.experience, newExp]);
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    updateField('experience', updated);
  };

  const removeExperience = (index: number) => {
    updateField('experience', data.experience.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    const newEdu: Education = { degree: '', institute: '', year: '' };
    updateField('education', [...data.education, newEdu]);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    updateField('education', updated);
  };

  const removeEducation = (index: number) => {
    updateField('education', data.education.filter((_, i) => i !== index));
  };

  const addProject = () => {
    const newProj: Project = { name: '', description: '', points: [] };
    updateField('projects', [...data.projects, newProj]);
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    updateField('projects', updated);
  };

  const removeProject = (index: number) => {
    updateField('projects', data.projects.filter((_, i) => i !== index));
    if (suggestedPoints?.index === index) {
      setSuggestedPoints(null);
    }
  };

  const generateAIPoints = async (index: number) => {
    const project = data.projects[index];
    if (!project.name && !project.description) return;
    
    setGeneratingPoints(index);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const points = generateProjectPoints(project.name, project.description);
    setSuggestedPoints({ index, points });
    setGeneratingPoints(null);
  };

  const selectPoint = (projectIndex: number, point: string) => {
    const project = data.projects[projectIndex];
    if (project.points.includes(point)) {
      updateProject(projectIndex, 'points', project.points.filter(p => p !== point));
    } else {
      updateProject(projectIndex, 'points', [...project.points, point]);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      updateField('skills', [...data.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    updateField('skills', data.skills.filter(s => s !== skill));
  };

  const autoSuggestSkills = () => {
    const suggested = suggestSkills(data.title, data.skills);
    updateField('skills', suggested);
  };

  const addLanguage = () => {
    if (langInput.trim() && !data.languages.includes(langInput.trim())) {
      updateField('languages', [...data.languages, langInput.trim()]);
      setLangInput('');
    }
  };

  const removeLanguage = (lang: string) => {
    updateField('languages', data.languages.filter(l => l !== lang));
  };

  const inputClass = "w-full px-2.5 sm:px-4 py-2 sm:py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all";
  const labelClass = "block text-[10px] sm:text-xs font-medium text-slate-300 mb-1";

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-2.5 sm:space-y-4">
            {/* Photo Upload */}
            <div className="flex items-center gap-2.5 sm:gap-4 mb-3 sm:mb-6">
              <div className="relative">
                {data.photo ? (
                  <div className="relative">
                    <img
                      src={data.photo}
                      alt="Profile"
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-emerald-500"
                    />
                    <button
                      onClick={removePhoto}
                      className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ) : (
                  <label className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-700 border-2 border-dashed border-slate-500 flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors">
                    <Upload size={16} className="text-slate-400" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400">
                <p className="font-medium text-slate-300">Photo</p>
                <p>(Optional)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={inputClass}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className={labelClass}>Job Title *</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className={inputClass}
                  placeholder="Software Engineer"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={inputClass}
                  placeholder="john@email.com"
                />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={inputClass}
                  placeholder="+1 555-1234"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => updateField('location', e.target.value)}
                className={inputClass}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className={labelClass}>LinkedIn</label>
                <input
                  type="text"
                  value={data.linkedin}
                  onChange={(e) => updateField('linkedin', e.target.value)}
                  className={inputClass}
                  placeholder="linkedin.com/in/..."
                />
              </div>
              <div>
                <label className={labelClass}>GitHub</label>
                <input
                  type="text"
                  value={data.github}
                  onChange={(e) => updateField('github', e.target.value)}
                  className={inputClass}
                  placeholder="github.com/..."
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Professional Summary</label>
              <textarea
                value={data.summary}
                onChange={(e) => updateField('summary', e.target.value)}
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Brief summary (AI generates if empty)"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-3 sm:space-y-4">
            {data.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 sm:p-4 bg-slate-800/30 rounded-lg border border-slate-700 space-y-2 sm:space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-emerald-400 font-medium text-xs sm:text-sm">Experience {index + 1}</h4>
                  <button
                    onClick={() => removeExperience(index)}
                    className="p-1 text-red-400 hover:bg-red-400/10 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateExperience(index, 'role', e.target.value)}
                    className={inputClass}
                    placeholder="Job Title"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    className={inputClass}
                    placeholder="Company"
                  />
                </div>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                  className={inputClass}
                  placeholder="Jan 2020 - Present"
                />
                <div>
                  <label className="block text-[10px] sm:text-xs text-slate-400 mb-1">Achievements (one per line)</label>
                  <textarea
                    value={exp.points.join('\n')}
                    onChange={(e) => updateExperience(index, 'points', e.target.value.split('\n').filter(p => p.trim()))}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="Led team of 5..."
                  />
                </div>
              </motion.div>
            ))}
            <button
              onClick={addExperience}
              className="w-full py-2 sm:py-2.5 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-emerald-500 hover:text-emerald-400 transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm"
            >
              <Plus size={16} /> Add Experience
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-3 sm:space-y-4">
            {data.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 sm:p-4 bg-slate-800/30 rounded-lg border border-slate-700 space-y-2 sm:space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-emerald-400 font-medium text-xs sm:text-sm">Education {index + 1}</h4>
                  <button
                    onClick={() => removeEducation(index)}
                    className="p-1 text-red-400 hover:bg-red-400/10 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className={inputClass}
                  placeholder="Bachelor of Science in CS"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={edu.institute}
                    onChange={(e) => updateEducation(index, 'institute', e.target.value)}
                    className={inputClass}
                    placeholder="University"
                  />
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => updateEducation(index, 'year', e.target.value)}
                    className={inputClass}
                    placeholder="2020"
                  />
                </div>
              </motion.div>
            ))}
            <button
              onClick={addEducation}
              className="w-full py-2 sm:py-2.5 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-emerald-500 hover:text-emerald-400 transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm"
            >
              <Plus size={16} /> Add Education
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-3 sm:space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] sm:text-xs font-medium text-slate-300">Skills</label>
                <button
                  onClick={autoSuggestSkills}
                  className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] sm:text-xs hover:bg-emerald-500/30"
                >
                  <Sparkles size={10} /> AI Suggest
                </button>
              </div>
              <div className="flex gap-1.5 sm:gap-2 mb-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className={`flex-1 ${inputClass}`}
                  placeholder="Add skill..."
                />
                <button
                  onClick={addSkill}
                  className="px-2.5 sm:px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 sm:py-1 bg-slate-700 text-slate-200 rounded flex items-center gap-1 text-[10px] sm:text-xs"
                  >
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="text-slate-400 hover:text-red-400">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-700 pt-3 sm:pt-4">
              <label className="block text-[10px] sm:text-xs font-medium text-slate-300 mb-2">Projects</label>
              {data.projects.map((proj, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 sm:p-3 bg-slate-800/30 rounded-lg border border-slate-700 space-y-2 mb-2 sm:mb-3"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-emerald-400 font-medium text-[10px] sm:text-xs">Project {index + 1}</h4>
                    <button
                      onClick={() => removeProject(index)}
                      className="p-1 text-red-400 hover:bg-red-400/10 rounded"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                    className={inputClass}
                    placeholder="Project Name"
                  />
                  <textarea
                    value={proj.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    rows={2}
                    className={`${inputClass} resize-none`}
                    placeholder="Brief description..."
                  />
                  
                  <button
                    onClick={() => generateAIPoints(index)}
                    disabled={generatingPoints === index || (!proj.name && !proj.description)}
                    className="w-full py-1.5 sm:py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-lg flex items-center justify-center gap-1.5 hover:from-purple-500/30 hover:to-pink-500/30 transition-all disabled:opacity-50 text-[10px] sm:text-xs"
                  >
                    <Wand2 size={12} className={generatingPoints === index ? 'animate-spin' : ''} />
                    {generatingPoints === index ? 'Generating...' : 'AI Generate Points'}
                  </button>

                  {suggestedPoints?.index === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-1.5 mt-2"
                    >
                      <p className="text-[9px] sm:text-[10px] text-slate-400">Select points:</p>
                      {suggestedPoints.points.map((point, pointIndex) => (
                        <button
                          key={pointIndex}
                          onClick={() => selectPoint(index, point)}
                          className={`w-full p-2 text-left text-[10px] sm:text-xs rounded border transition-all flex items-start gap-1.5 ${
                            proj.points.includes(point)
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : 'bg-slate-800/50 border-slate-600 text-slate-300'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5 ${
                            proj.points.includes(point)
                              ? 'bg-emerald-500 border-emerald-500'
                              : 'border-slate-500'
                          }`}>
                            {proj.points.includes(point) && <Check size={8} className="text-white" />}
                          </span>
                          <span className="leading-relaxed">{point}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {proj.points.length > 0 && (
                    <div className="mt-2 space-y-0.5">
                      <p className="text-[9px] sm:text-[10px] text-emerald-400 font-medium">Selected:</p>
                      {proj.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start gap-1.5 text-[10px] sm:text-xs text-slate-300">
                          <span className="text-emerald-400">•</span>
                          <span className="leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <button
                onClick={addProject}
                className="w-full py-2 sm:py-2.5 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-emerald-500 hover:text-emerald-400 transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm"
              >
                <Plus size={16} /> Add Project
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-2.5 sm:space-y-4">
            <label className="block text-[10px] sm:text-xs font-medium text-slate-300">Languages</label>
            <div className="flex gap-1.5 sm:gap-2">
              <input
                type="text"
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                className={`flex-1 ${inputClass}`}
                placeholder="English - Native"
              />
              <button
                onClick={addLanguage}
                className="px-2.5 sm:px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {data.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-0.5 sm:py-1 bg-slate-700 text-slate-200 rounded flex items-center gap-1 text-[10px] sm:text-xs"
                >
                  {lang}
                  <button onClick={() => removeLanguage(lang)} className="text-slate-400 hover:text-red-400">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Steps */}
      <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4 overflow-x-auto pb-1">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
                currentStep === index
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Icon size={12} />
              <span className="text-[10px] sm:text-xs font-medium">
                <span className="sm:hidden">{step.label}</span>
                <span className="hidden sm:inline">{step.fullLabel}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-700">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors text-xs sm:text-sm"
        >
          <ChevronLeft size={14} /> Prev
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-emerald-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors text-xs sm:text-sm"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
