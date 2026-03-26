import type { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Briefcase, GraduationCap, Wrench, FolderOpen, Award, Languages } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export default function ModernTemplate({ data }: Props) {
  const { personalInfo } = data;
  
  return (
    <div className="resume-page resume-modern">
      <header className="header">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="" className="photo" />
        )}
        <div className="header-content">
          <h1 className="name">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="title">{personalInfo.title || 'Professional Title'}</p>
          <div className="contact-grid">
            {personalInfo.email && (
              <div className="contact-item">
                <Mail size={11} className="contact-icon" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="contact-item">
                <Phone size={11} className="contact-icon" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="contact-item">
                <MapPin size={11} className="contact-icon" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="contact-item">
                <Linkedin size={11} className="contact-icon" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="contact-item">
                <Github size={11} className="contact-icon" />
                <span>{personalInfo.github}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="contact-item">
                <Globe size={11} className="contact-icon" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {data.summary && (
        <section className="section">
          <h2 className="section-title">
            <span className="section-icon">✦</span>
            Professional Summary
          </h2>
          <p style={{ margin: 0, color: '#374151', lineHeight: 1.6 }}>{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="section">
          <h2 className="section-title">
            <Briefcase size={13} className="section-icon" />
            Professional Experience
          </h2>
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
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {data.education.length > 0 && (
          <section className="section">
            <h2 className="section-title">
              <GraduationCap size={13} className="section-icon" />
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="entry" style={{ borderLeft: 'none', paddingLeft: 0 }}>
                <h3 className="entry-title">{edu.degree}</h3>
                <p className="entry-subtitle">{edu.institution}</p>
                <span className="entry-date">{edu.year}</span>
              </div>
            ))}
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="section">
            <h2 className="section-title">
              <Wrench size={13} className="section-icon" />
              Skills
            </h2>
            <div className="skills-grid">
              {data.skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )}
      </div>

      {data.projects.length > 0 && (
        <section className="section">
          <h2 className="section-title">
            <FolderOpen size={13} className="section-icon" />
            Projects
          </h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="entry">
              <h3 className="entry-title">{proj.name}</h3>
              <p className="entry-subtitle">{proj.description}</p>
              {proj.points.length > 0 && (
                <ul className="bullet-list">
                  {proj.points.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {(data.languages.length > 0 || data.certifications.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {data.languages.length > 0 && (
            <section className="section">
              <h2 className="section-title">
                <Languages size={13} className="section-icon" />
                Languages
              </h2>
              <p style={{ margin: 0, color: '#374151' }}>{data.languages.join(' • ')}</p>
            </section>
          )}
          {data.certifications.length > 0 && (
            <section className="section">
              <h2 className="section-title">
                <Award size={13} className="section-icon" />
                Certifications
              </h2>
              <p style={{ margin: 0, color: '#374151' }}>{data.certifications.join(' • ')}</p>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
