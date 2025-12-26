import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Code, Database, Settings, Image, CheckCircle, ExternalLink, Copy, Github, Globe } from 'lucide-react';

const DownloadPage = () => {
  useEffect(() => {
    document.title = 'Download Source Code - Dehradun Bike Rentals';
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Copied to clipboard!');
    });
  };

  const features = [
    { icon: Code, title: 'React TypeScript Frontend', description: 'Modern React app with TypeScript' },
    { icon: Settings, title: 'Tailwind CSS Styling', description: 'Utility-first CSS framework' },
    { icon: Database, title: 'Supabase Integration', description: 'Database schema and edge functions' },
    { icon: Image, title: 'All Assets Included', description: 'Bike images and other assets' },
    { icon: FileText, title: 'Complete Documentation', description: 'Setup and deployment guides' },
    { icon: CheckCircle, title: 'Production Ready', description: 'Optimized and tested code' },
  ];

  // Current live website URL
  const currentUrl = window.location.origin;
  const downloadInstructionsUrl = `${currentUrl}/download-instructions.html`;

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Download size={64} className="text-primary-600 mx-auto mb-6" />
            <h1 className="heading-xl mb-6">Download Complete Source Code</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get the complete source code for the Dehradun Bike Rentals website. 
              Everything you need to run, modify, and deploy your own version.
            </p>
          </motion.div>

          {/* Download Options */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Current Website */}
            <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-primary-200">
              <div className="flex items-center gap-3 mb-6">
                <Globe size={32} className="text-primary-600" />
                <h2 className="text-2xl font-bold">Current Website</h2>
              </div>
              <p className="text-gray-600 mb-6">
                You're currently viewing the live website. All source code is available for download.
              </p>
              
              <div className="bg-primary-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-primary-800 font-medium">Live Website URL:</p>
                <code className="text-sm text-primary-700 break-all">{currentUrl}</code>
                <button 
                  onClick={() => copyToClipboard(currentUrl)}
                  className="ml-2 p-1 hover:bg-primary-100 rounded"
                  title="Copy URL"
                >
                  <Copy size={16} />
                </button>
              </div>
              
              <a 
                href={downloadInstructionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download Instructions
              </a>
            </div>

            {/* GitHub Repository */}
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Github size={32} className="text-gray-700" />
                <h2 className="text-2xl font-bold">GitHub Repository</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Access the complete source code repository with full git history and documentation.
              </p>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700 font-medium mb-2">Clone Command:</p>
                <code className="text-sm">git clone [repository-url]</code>
                <button 
                  onClick={() => copyToClipboard('git clone [repository-url]')}
                  className="ml-2 p-1 hover:bg-gray-200 rounded"
                  title="Copy command"
                >
                  <Copy size={16} />
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Repository will be available on GitHub soon
                </p>
                <button className="btn btn-outline w-full flex items-center justify-center gap-2" disabled>
                  <Github size={18} />
                  Coming Soon
                </button>
              </div>
            </div>
          </motion.div>

          {/* What's Included */}
          <motion.div 
            className="bg-white rounded-xl shadow-xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">What's Included</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Icon size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-primary-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-primary-900">Dehradun Bike Rentals Website</h3>
                  <p className="text-primary-700">Complete React TypeScript Application</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-primary-700">Production Ready</p>
                  <p className="text-sm text-primary-700">Full Source Code</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Setup Guide */}
          <motion.div 
            className="bg-white rounded-xl shadow-xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Quick Setup Guide</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold">Download Source Code</h3>
                  <p className="text-gray-600 mb-2">Get the complete source code from the download instructions page</p>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <code className="text-sm">Visit: {downloadInstructionsUrl}</code>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold">Install Dependencies</h3>
                  <p className="text-gray-600 mb-2">Navigate to the project folder and install packages</p>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <code className="text-sm">cd dehradun-bike-rentals && npm install</code>
                    <button 
                      onClick={() => copyToClipboard('cd dehradun-bike-rentals && npm install')}
                      className="ml-2 p-1 hover:bg-gray-200 rounded"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold">Configure Environment</h3>
                  <p className="text-gray-600 mb-2">Create a .env file with your Supabase credentials</p>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <code className="text-sm block">
                      VITE_SUPABASE_URL=your_supabase_url<br/>
                      VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-semibold">Start Development Server</h3>
                  <p className="text-gray-600 mb-2">Run the development server to see your site</p>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <code className="text-sm">npm run dev</code>
                    <button 
                      onClick={() => copyToClipboard('npm run dev')}
                      className="ml-2 p-1 hover:bg-gray-200 rounded"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Documentation & Resources */}
          <motion.div 
            className="bg-white rounded-xl shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Documentation & Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <FileText size={32} className="text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Setup Guide</h3>
                <p className="text-sm text-gray-600 mb-3">Complete setup instructions and configuration</p>
                <span className="text-primary-600 text-sm">Included in download</span>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Settings size={32} className="text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Deployment Guide</h3>
                <p className="text-sm text-gray-600 mb-3">Deploy to Netlify, Vercel, and other platforms</p>
                <span className="text-primary-600 text-sm">Included in download</span>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Database size={32} className="text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Database Schema</h3>
                <p className="text-sm text-gray-600 mb-3">Supabase setup and migration files</p>
                <span className="text-primary-600 text-sm">Included in download</span>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Download the complete source code and start building your own bike rental website today. 
                All the code, documentation, and assets you need are included.
              </p>
              <a 
                href={downloadInstructionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-primary-600 hover:bg-primary-50 inline-flex items-center gap-2"
              >
                <Download size={20} />
                Get Download Instructions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;