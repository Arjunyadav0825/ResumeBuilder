import type { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export default function CreativeTemplate({ data }: Props) {
  const { personalInfo } = data;
  
  return (
    <div className="resume-page resume-creative">
      <header className="header">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="" className="photo" />
        )}
        <div className="header-content">
          <h1 className="name">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="title">{personalInfo.title || 'Professional Title'}</p>
          <div className="contact-row">
            {personalInfo.email && <span><Mail size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />{personalInfo.email}</span>}
            {personalInfo.phone && <span><Phone size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />{personalInfo.phone}</span>}
            {personalInfo.location && <span><MapPin size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />{personalInfo.location}</span>}
          </div>
          <div className="contact-row" style={{ marginTop: 6 }}>
            {personalInfo.linkedin && <span><Linkedin size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />{personalInfo.linkedin}</span>}
            {personalInfo.github && <span><Github size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />{personalInfo.github}</span>}
            {personalInfo.website && <span><Globe size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />{personalInfo.website}</span>}
          </div>
        </div>
      </header>

      <div className="body">
        <div className="main-content">
          {data.summary && (
            <div className="card">
              <h2 className="section-title">About Me</h2>
              <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6, fontSize: '11px' }}>
                {data.summary}
              </p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div className="card">
              <h2 className="section-title">Experience</h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="entry">
                  <div className="entry-header">
                    <div>
                      <h3 className="entry-title">{exp.title}</h3>
                      <p className="entry-subtitle">{exp.company}</p>
                    </div>
                    <span className="entry-date">{exp.duration}</span>
                  </div>
                  {exp.points.length > 0 && (
                    <ul className="bullet-list">
                      {exp.points.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {data.projects.length > 0 && (
            <div className="card">
              <h2 className="section-title">Projects</h2>
              {data.projects.map((proj) => (
                <div key={proj.id} className="entry">
                  <h3 className="entry-title">{proj.name}</h3>
                  <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '10px' }}>{proj.description}</p>
                  {proj.points.length > 0 && (
                    <ul className="bullet-list">
                      {proj.points.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="side-content">
          {data.skills.length > 0 && (
            <div className="card">
              <h2 className="section-title">Skills</h2>
              <div className="skills-wrap">
                {data.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div className="card">
              <h2 className="section-title">Education</h2>
              {data.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 12 }}>
                  <h3 style={{ fontSize: '11px', fontWeight: 600, margin: 0 }}>{edu.degree}</h3>
                  <p style={{ fontSize: '10px', color: '#6b7280', margin: '2px 0' }}>{edu.institution}</p>
                  <p style={{ fontSize: '9px', color: '#db2777', margin: 0 }}>{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {data.languages.length > 0 && (
            <div className="card">
              <h2 className="section-title">Languages</h2>
              {data.languages.map((lang, i) => (
                <p key={i} style={{ fontSize: '10px', color: '#4b5563', margin: '0 0 4px 0' }}>• {lang}</p>
              ))}
            </div>
          )}

          {data.certifications.length > 0 && (
            <div className="card">
              <h2 className="section-title">Certifications</h2>
              {data.certifications.map((cert, i) => (
                <p key={i} style={{ fontSize: '10px', color: '#4b5563', margin: '0 0 4px 0' }}>• {cert}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
