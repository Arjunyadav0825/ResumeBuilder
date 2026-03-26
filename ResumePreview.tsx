import { forwardRef } from 'react';
import type { ResumeData } from '../types/resume';
import MinimalTemplate from './templates/MinimalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import SidebarTemplate from './templates/SidebarTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import GlassTemplate from './templates/GlassTemplate';

interface Props {
  data: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const renderTemplate = () => {
    switch (data.template) {
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'sidebar':
        return <SidebarTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'glass':
        return <GlassTemplate data={data} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div ref={ref}>
      {renderTemplate()}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
