import type { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: Props) {
  const { personalInfo } = data;
  
  return (
    <div className="resume-page resume-minimal">
      <header className="header">
        <h1 className="name">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="title">{personalInfo.title || 'Professional Title'}</p>
        <div className="contact-row">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </header>

      {data.summary && (
        <section className="section">
          <h2 className="section-title">Professional Summary</h2>
          <p style={{ margin: 0, color: '#374151', lineHeight: 1.6 }}>{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="section">
          <h2 className="section-title">Professional Experience</h2>
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

      {data.skills.length > 0 && (
        <section className="section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {data.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
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

      {(data.languages.length > 0 || data.certifications.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {data.languages.length > 0 && (
            <section className="section">
              <h2 className="section-title">Languages</h2>
              <p style={{ margin: 0, color: '#374151' }}>{data.languages.join(' • ')}</p>
            </section>
          )}
          {data.certifications.length > 0 && (
            <section className="section">
              <h2 className="section-title">Certifications</h2>
              <p style={{ margin: 0, color: '#374151' }}>{data.certifications.join(' • ')}</p>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
