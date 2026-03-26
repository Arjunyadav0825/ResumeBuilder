import type { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export default function ExecutiveTemplate({ data }: Props) {
  return (
    <div className="bg-white text-gray-800 min-h-full" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
      {/* Header */}
      <header className="bg-slate-900 text-white px-8 py-6">
        <div className="flex items-center gap-6">
          {data.photo && (
            <img
              src={data.photo}
              alt={data.name}
              className="w-24 h-24 rounded-lg object-cover border-2 border-amber-500"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-wide">
              {data.name || 'Your Name'}
            </h1>
            <p className="text-amber-400 text-lg font-medium mt-1">
              {data.title || 'Professional Title'}
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-300">
              {data.email && (
                <span className="flex items-center gap-1">
                  <Mail size={14} className="text-amber-400" /> {data.email}
                </span>
              )}
              {data.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={14} className="text-amber-400" /> {data.phone}
                </span>
              )}
              {data.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-amber-400" /> {data.location}
                </span>
              )}
              {data.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin size={14} className="text-amber-400" /> {data.linkedin}
                </span>
              )}
              {data.github && (
                <span className="flex items-center gap-1">
                  <Github size={14} className="text-amber-400" /> {data.github}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {data.summary && (
          <section className="mb-6 bg-slate-50 p-4 rounded-lg border-l-4 border-amber-500">
            <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2">
            {/* Experience */}
            {data.experience.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 border-b-2 border-amber-500 pb-2 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Professional Experience
                </h2>
                {data.experience.map((exp, index) => (
                  <div key={index} className="mb-5 pl-4 border-l-2 border-slate-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-900">{exp.role || 'Position'}</h3>
                        <p className="text-amber-600 font-medium text-sm">{exp.company || 'Company'}</p>
                      </div>
                      <span className="text-xs text-white bg-slate-700 px-2 py-1 rounded">{exp.duration || 'Duration'}</span>
                    </div>
                    {exp.points.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {exp.points.map((point, i) => (
                          <li key={i} className="text-sm text-gray-700 flex">
                            <span className="mr-2 text-amber-500">▪</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 border-b-2 border-amber-500 pb-2 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Key Projects
                </h2>
                {data.projects.map((proj, index) => (
                  <div key={index} className="mb-4 pl-4 border-l-2 border-slate-200">
                    <h3 className="font-bold text-slate-900">{proj.name || 'Project Name'}</h3>
                    <p className="text-sm text-gray-600">{proj.description || 'Project description'}</p>
                    {proj.points && proj.points.length > 0 && (
                      <ul className="mt-1 space-y-1">
                        {proj.points.map((point, i) => (
                          <li key={i} className="text-sm text-gray-700 flex">
                            <span className="mr-2 text-amber-500">▪</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            {/* Education */}
            {data.education.length > 0 && (
              <section className="mb-6 bg-slate-50 p-4 rounded-lg">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Education</h2>
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-semibold text-slate-900 text-sm">{edu.degree || 'Degree'}</h3>
                    <p className="text-gray-600 text-xs">{edu.institute || 'Institution'}</p>
                    <p className="text-amber-600 text-xs font-medium">{edu.year || 'Year'}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <section className="mb-6 bg-slate-50 p-4 rounded-lg">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Core Competencies</h2>
                <div className="flex flex-wrap gap-1">
                  {data.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <section className="bg-slate-50 p-4 rounded-lg">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Languages</h2>
                <div className="space-y-1">
                  {data.languages.map((lang, index) => (
                    <p key={index} className="text-sm text-gray-700">{lang}</p>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
