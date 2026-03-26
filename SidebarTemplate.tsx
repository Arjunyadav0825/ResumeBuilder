import type { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export default function SidebarTemplate({ data }: Props) {
  const { personalInfo } = data;
  
  return (
    <div className="resume-page resume-sidebar">
      <aside className="sidebar">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="" className="photo" />
        )}
        <h1 className="sidebar-name">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="sidebar-title">{personalInfo.title || 'Professional Title'}</p>

        <div className="sidebar-section">
          <h3 className="sidebar-heading">Contact</h3>
          {personalInfo.email && (
            <p className="sidebar-item">
              <Mail size={10} className="sidebar-icon" />
              {personalInfo.email}
            </p>
          )}
          {personalInfo.phone && (
            <p className="sidebar-item">
              <Phone size={10} className="sidebar-icon" />
              {personalInfo.phone}
            </p>
          )}
          {personalInfo.location && (
            <p className="sidebar-item">
              <MapPin size={10} className="sidebar-icon" />
              {personalInfo.location}
            </p>
          )}
          {personalInfo.linkedin && (
            <p className="sidebar-item">
              <Linkedin size={10} className="sidebar-icon" />
              {personalInfo.linkedin}
            </p>
          )}
          {personalInfo.github && (
            <p className="sidebar-item">
              <Github size={10} className="sidebar-icon" />
              {personalInfo.github}
            </p>
          )}
          {personalInfo.website && (
            <p className="sidebar-item">
              <Globe size={10} className="sidebar-icon" />
              {personalInfo.website}
            </p>
          )}
        </div>

        {data.skills.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-heading">Skills</h3>
            {data.skills.slice(0, 10).map((skill, i) => (
              <div key={i} className="skill-bar">
                <p className="skill-name">{skill}</p>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: `${95 - i * 5}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {data.languages.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-heading">Languages</h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="sidebar-item">• {lang}</p>
            ))}
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-heading">Certifications</h3>
            {data.certifications.map((cert, i) => (
              <p key={i} className="sidebar-item">• {cert}</p>
            ))}
          </div>
        )}
      </aside>

      <main className="main">
        {data.summary && (
          <section className="section">
            <h2 className="section-title">Profile</h2>
            <p style={{ margin: 0, color: '#374151', lineHeight: 1.6, fontSize: '11px' }}>
              {data.summary}
            </p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="section">
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
          </section>
        )}

        {data.education.length > 0 && (
          <section className="section">
            <h2 className="section-title">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="entry">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-title">{edu.degree}</h3>
                    <p className="entry-subtitle">{edu.institution}</p>
                  </div>
                  <span className="entry-date">{edu.year}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="section">
            <h2 className="section-title">Projects</h2>
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
      </main>
    </div>
  );
}
