
import React, { useState, useCallback } from 'react';
import { PhoneWidget } from './components/PhoneWidget';
import { generatePrivacyPolicy, getSecurityInsights } from './services/geminiService';
import { Shield, Lock, FileText, CheckCircle, RefreshCcw, ArrowRight, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [verificationUrl, setVerificationUrl] = useState<string | null>(null);
  const [isGeneratingPP, setIsGeneratingPP] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState<string | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleVerificationSuccess = useCallback(async (url: string) => {
    setVerificationUrl(url);
    setIsAnalyzing(true);
    try {
      const insight = await getSecurityInsights(url);
      setAiInsight(insight);
    } catch (err) {
      console.error("AI Insight Error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleGeneratePolicy = async () => {
    setIsGeneratingPP(true);
    try {
      const policy = await generatePrivacyPolicy("SecureAuth Pro", "https://secureauth-demo.app");
      setPrivacyPolicy(policy);
    } catch (err) {
      console.error("Policy Generation Error:", err);
    } finally {
      setIsGeneratingPP(false);
    }
  };

  const resetVerification = () => {
    setVerificationUrl(null);
    setAiInsight(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">SecureAuth<span className="text-blue-500">Pro</span></span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#demo" className="hover:text-white transition">Live Demo</a>
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition">
            Developer Docs
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-slate-400 bg-clip-text text-transparent">
              The Future of Phone Authentication.
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Integrate world-class phone verification in seconds. No more SMS costs, 
              no more passwords. Just seamless identity verification powered by Phone.email.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#demo" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition flex items-center justify-center gap-2">
                Try the Live Demo <ArrowRight className="w-5 h-5" />
              </a>
              <button onClick={handleGeneratePolicy} className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition flex items-center justify-center gap-2">
                Generate Privacy Policy <FileText className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section id="demo" className="py-20 bg-slate-900/50 border-y border-slate-900">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                Interactive Component
              </div>
              <h2 className="text-3xl font-bold mb-6">Experience the One-Tap Verification</h2>
              <p className="text-slate-400 mb-8">
                The widget to the right is a live implementation of the Phone.email SDK. 
                Once you verify, our AI security agent will analyze the transaction and explain 
                the cryptographic integrity of the session.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <Lock className="text-blue-400" />, title: "Zero Passwords", desc: "Reduce friction and eliminate account takeovers." },
                  { icon: <CheckCircle className="text-green-400" />, title: "Instant Verification", desc: "No manual OTP entry required for modern users." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {!verificationUrl ? (
                <PhoneWidget 
                  clientId="18916899238123945181" 
                  onSuccess={handleVerificationSuccess} 
                />
              ) : (
                <div className="glass rounded-2xl p-8 border-2 border-green-500/30">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold">Verification Successful</h3>
                    </div>
                    <button 
                      onClick={resetVerification}
                      className="text-slate-500 hover:text-white transition"
                    >
                      <RefreshCcw className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-slate-950 rounded-lg p-4 mb-6 border border-slate-800 overflow-hidden">
                    <p className="text-xs font-mono text-blue-400 mb-2">Auth Payload URL:</p>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xs truncate text-slate-300">{verificationUrl}</code>
                      <a href={verificationUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">AI Security Audit</h4>
                    {isAnalyzing ? (
                      <div className="animate-pulse space-y-2">
                        <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                        <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                      </div>
                    ) : (
                      <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                        {aiInsight}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Privacy Policy Section */}
        <section id="privacy" className="py-20 px-4 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-4">Privacy Compliance</h2>
              <p className="text-slate-400">
                Using third-party verification requires clear documentation. 
                Our AI-powered Privacy Policy (PP) generator helps you stay compliant while protecting user data.
              </p>
            </div>
            <button 
              onClick={handleGeneratePolicy}
              disabled={isGeneratingPP}
              className="bg-white text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition flex items-center gap-2 disabled:opacity-50"
            >
              {isGeneratingPP ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
              {privacyPolicy ? 'Regenerate Policy' : 'Generate Privacy Policy'}
            </button>
          </div>

          {privacyPolicy ? (
            <div className="glass rounded-3xl p-8 md:p-12 border border-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-1 rounded border border-blue-500/20">
                  AI-GENERATED DOCUMENT
                </div>
              </div>
              <article className="prose prose-invert prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-slate-300 font-light leading-relaxed">
                  {privacyPolicy}
                </div>
              </article>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-800 rounded-3xl p-20 text-center">
              <FileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-600">No policy generated yet. Click the button above to start.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Shield className="w-5 h-5 text-blue-500" />
            <span className="text-lg font-bold">SecureAuth<span className="text-blue-500">Pro</span></span>
          </div>
          <p className="text-slate-500 text-sm mb-8">
            Built for developers who care about security and UX. Integration demo for Phone.email API.
          </p>
          <div className="flex justify-center space-x-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
          <p className="mt-8 text-slate-700 text-xs">
            © {new Date().getFullYear()} SecureAuth Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
