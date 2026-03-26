import type { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export default function CompactTemplate({ data }: Props) {
  return (
    <div className="bg-white text-gray-800 p-6 min-h-full" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}>
      {/* Header */}
      <header className="border-b border-gray-400 pb-3 mb-4">
        <div className="flex items-center gap-4">
          {data.photo && (
            <img
              src={data.photo}
              alt={data.name}
              className="w-14 h-14 rounded object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
              {data.name || 'Your Name'}
            </h1>
            <p className="text-blue-700 font-semibold text-sm">
              {data.title || 'Professional Title'}
            </p>
          </div>
          <div className="text-right text-xs text-gray-600 space-y-0.5">
            {data.email && (
              <div className="flex items-center justify-end gap-1">
                <Mail size={10} /> {data.email}
              </div>
            )}
            {data.phone && (
              <div className="flex items-center justify-end gap-1">
                <Phone size={10} /> {data.phone}
              </div>
            )}
            {data.location && (
              <div className="flex items-center justify-end gap-1">
                <MapPin size={10} /> {data.location}
              </div>
            )}
            {data.linkedin && (
              <div className="flex items-center justify-end gap-1">
                <Linkedin size={10} /> {data.linkedin}
              </div>
            )}
            {data.github && (
              <div className="flex items-center justify-end gap-1">
                <Github size={10} /> {data.github}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-3">
          <p className="text-gray-700 leading-tight text-xs">{data.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-4 gap-4">
        {/* Main Content */}
        <div className="col-span-3">
          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-3">
              <h2 className="text-xs font-bold text-white bg-blue-700 px-2 py-1 mb-2 uppercase">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-xs">{exp.role || 'Position'}</h3>
                    <span className="text-xs text-gray-500">{exp.duration || 'Duration'}</span>
                  </div>
                  <p className="text-blue-700 text-xs font-medium">{exp.company || 'Company'}</p>
                  {exp.points.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {exp.points.map((point, i) => (
                        <li key={i} className="text-xs text-gray-700 flex">
                          <span className="mr-1">•</span>
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
            <section className="mb-3">
              <h2 className="text-xs font-bold text-white bg-blue-700 px-2 py-1 mb-2 uppercase">Projects</h2>
              {data.projects.map((proj, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold text-gray-900 text-xs">{proj.name || 'Project Name'}</h3>
                  <p className="text-xs text-gray-600">{proj.description || 'Project description'}</p>
                  {proj.points && proj.points.length > 0 && (
                    <ul className="mt-0.5 space-y-0.5">
                      {proj.points.map((point, i) => (
                        <li key={i} className="text-xs text-gray-700 flex">
                          <span className="mr-1">•</span>
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
          {/* Skills */}
          {data.skills.length > 0 && (
            <section className="mb-3">
              <h2 className="text-xs font-bold text-white bg-blue-700 px-2 py-1 mb-2 uppercase">Skills</h2>
              <div className="space-y-0.5">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-xs text-gray-700 flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-700 rounded-full"></span>
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section className="mb-3">
              <h2 className="text-xs font-bold text-white bg-blue-700 px-2 py-1 mb-2 uppercase">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-semibold text-gray-900 text-xs leading-tight">{edu.degree || 'Degree'}</h3>
                  <p className="text-gray-600 text-xs">{edu.institute || 'Institution'}</p>
                  <p className="text-blue-700 text-xs">{edu.year || 'Year'}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-white bg-blue-700 px-2 py-1 mb-2 uppercase">Languages</h2>
              <div className="space-y-0.5">
                {data.languages.map((lang, index) => (
                  <p key={index} className="text-xs text-gray-700">{lang}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
