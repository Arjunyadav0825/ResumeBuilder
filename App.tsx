import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Edit3, Palette, ZoomIn, ZoomOut, 
  Check, Sparkles, ChevronDown, Loader2
} from 'lucide-react';
import html2pdf from 'html2pdf.js';
import type { ResumeData, TemplateType } from './types/resume';
import { defaultResumeData, sampleResumeData } from './types/resume';
import ResumePreview from './components/ResumePreview';
import ResumeEditor from './components/ResumeEditor';
import './styles/print.css';

const templates: { id: TemplateType; name: string; desc: string; colors: string[] }[] = [
  { id: 'minimal', name: 'Minimal ATS', desc: 'Clean & Simple', colors: ['#1a1a1a', '#f3f4f6'] },
  { id: 'modern', name: 'Modern Pro', desc: 'Icons & Sections', colors: ['#10b981', '#ecfdf5'] },
  { id: 'sidebar', name: 'Sidebar', desc: 'Two Column', colors: ['#1e293b', '#38bdf8'] },
  { id: 'creative', name: 'Creative', desc: 'Gradient Cards', colors: ['#8b5cf6', '#ec4899'] },
  { id: 'glass', name: 'Glass', desc: 'Glassmorphism', colors: ['#0f172a', '#38bdf8'] },
];

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [showEditor, setShowEditor] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [zoom, setZoom] = useState(0.6);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Responsive zoom
  useEffect(() => {
    const updateZoom = () => {
      const width = window.innerWidth;
      if (width < 480) setZoom(0.35);
      else if (width < 640) setZoom(0.45);
      else if (width < 768) setZoom(0.55);
      else if (width < 1024) setZoom(0.65);
      else setZoom(0.75);
    };
    updateZoom();
    window.addEventListener('resize', updateZoom);
    return () => window.removeEventListener('resize', updateZoom);
  }, []);

  const handleTemplateChange = (template: TemplateType) => {
    setResumeData({ ...resumeData, template });
    setShowTemplates(false);
  };

  const loadSample = () => {
    setResumeData({ ...sampleResumeData, template: resumeData.template });
  };

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = resumeRef.current;
      const opt = {
        margin: 0,
        filename: `${resumeData.name || 'Resume'}_Resume.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        },
        jsPDF: { 
          unit: 'mm' as const, 
          format: 'a4' as const, 
          orientation: 'portrait' as const 
        },
      };
      
      await html2pdf().set(opt).from(element).save();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const currentTemplate = templates.find(t => t.id === resumeData.template) || templates[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-slate-900/70 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <FileText size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">ResumeAI</h1>
              <p className="text-[10px] text-slate-400 -mt-0.5">Premium Builder</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={loadSample}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all"
            >
              <Sparkles size={16} />
              Sample
            </button>

            {/* Zoom Controls */}
            <div className="hidden md:flex items-center gap-1 bg-slate-800/50 rounded-xl p-1">
              <button
                onClick={() => setZoom(Math.max(0.3, zoom - 0.1))}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-xs text-slate-400 w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(Math.min(1.2, zoom + 0.1))}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Full Screen Preview */}
      <main className="pt-16 pb-24 min-h-screen flex items-start justify-center overflow-auto">
        <div 
          className="py-8 px-4"
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="shadow-2xl shadow-black/50 rounded-lg overflow-hidden"
          >
            <ResumePreview ref={resumeRef} data={resumeData} />
          </motion.div>
        </div>
      </main>

      {/* Floating Action Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 p-4"
      >
        <div className="max-w-lg mx-auto">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 flex items-center gap-2 shadow-2xl shadow-black/50">
            {/* Edit Button */}
            <button
              onClick={() => setShowEditor(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-medium"
            >
              <Edit3 size={18} />
              <span>Edit</span>
            </button>

            {/* Template Selector */}
            <div className="relative flex-1">
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-medium"
              >
                <Palette size={18} />
                <span className="hidden sm:inline">{currentTemplate.name}</span>
                <span className="sm:hidden">Template</span>
                <ChevronDown size={16} className={`transition-transform ${showTemplates ? 'rotate-180' : ''}`} />
              </button>

              {/* Template Dropdown */}
              <AnimatePresence>
                {showTemplates && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl"
                  >
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateChange(template.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                          resumeData.template === template.id
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex gap-1">
                          {template.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium">{template.name}</p>
                          <p className="text-[10px] opacity-60">{template.desc}</p>
                        </div>
                        {resumeData.template === template.id && (
                          <Check size={16} className="text-cyan-400" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all font-medium ${
                downloadSuccess
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/25'
              }`}
            >
              {isDownloading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : downloadSuccess ? (
                <Check size={18} />
              ) : (
                <Download size={18} />
              )}
              <span>{downloadSuccess ? 'Done!' : 'PDF'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Zoom Controls */}
      <div className="fixed bottom-24 right-4 z-30 md:hidden flex flex-col gap-2">
        <button
          onClick={() => setZoom(Math.min(1.2, zoom + 0.1))}
          className="w-10 h-10 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition-all"
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={() => setZoom(Math.max(0.3, zoom - 0.1))}
          className="w-10 h-10 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition-all"
        >
          <ZoomOut size={18} />
        </button>
      </div>

      {/* Editor Slide Panel */}
      <AnimatePresence>
        {showEditor && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditor(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            {/* Editor */}
            <ResumeEditor
              data={resumeData}
              onChange={setResumeData}
              onClose={() => setShowEditor(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Click outside to close templates */}
      {showTemplates && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowTemplates(false)}
        />
      )}
    </div>
  );
}
