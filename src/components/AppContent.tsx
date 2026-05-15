import React from 'react';
import { Terminal as TerminalIcon, ExternalLink, Mail, Phone, MapPin, Github, Linkedin, Send, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function AboutMe() {
  return (
    <div className="space-y-8 text-slate-800 font-sans leading-relaxed p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100 pb-8 text-center sm:text-left">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-center shrink-0">
          <span className="text-4xl sm:text-5xl">🚀</span>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">Steve Tapuwa Taiwa</h1>
          <p className="text-blue-600 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-4">Computer Science Undergraduate</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-[10px] text-slate-400 uppercase font-black tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>Harare, Zimbabwe</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="lowercase">stevetapuwataiwa@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>+263 78 095 2004</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-[10px] uppercase font-black text-slate-300 tracking-[0.3em] mb-4 flex items-center gap-4">
            About Me <div className="h-px bg-slate-100 flex-1" />
          </h3>
          <p className="text-base text-slate-700 leading-relaxed font-medium italic mb-4">
            "Motivated and detail-oriented Computer Science undergraduate. Passionate about problem-solving, innovation, and building efficient digital solutions."
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            I'm a Computer Science student at the University of Zimbabwe with a strong foundation in software development, data analysis, and emerging technologies. 
            I love building efficient digital solutions and demonstrate strong analytical thinking and adaptability.
          </p>
        </section>

        <section>
          <h3 className="text-[10px] uppercase font-black text-slate-300 tracking-[0.3em] mb-4 flex items-center gap-4">
            Interests <div className="h-px bg-slate-100 flex-1" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Mobile Application Development', 'Artificial Intelligence', 'Strategic Thinking', 'Cycling', 'Music Production'].map(interest => (
              <span key={interest} className="text-[10px] bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full text-slate-500 font-black uppercase tracking-wider hover:bg-white hover:border-blue-200 hover:text-blue-500 transition-all cursor-default">
                {interest}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[10px] uppercase font-black text-slate-300 tracking-[0.3em] mb-4 flex items-center gap-4">
            Connect <div className="h-px bg-slate-100 flex-1" />
          </h3>
          <div className="flex gap-4">
            <a 
              href="https://github.com/Steve-co-debug?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-11 h-11 rounded-[1.2rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/steve-taiwa" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-11 h-11 rounded-[1.2rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export function Projects() {
  const pjs = [
    { 
      name: 'Gas Level Detection IoT', 
      tech: 'IoT / Microcontrollers', 
      desc: 'An IoT-based solution designed to monitor household gas levels in real-time, solving the problem of gas running out unexpectedly by providing timely alerts.',
      status: 'In Progress',
      color: 'from-amber-400 to-orange-500'
    },
    { 
      name: 'Mobile Trading Journal', 
      tech: 'React / LocalStorage', 
      desc: 'A web-based mobile application trading journal with frontend designed using React, utilizing local storage for data persistence.',
      link: 'https://gen-lang-client-0371200914.web.app/',
      status: 'In Progress',
      color: 'from-blue-500 to-indigo-600',
      showcase: (
        <div className="absolute inset-0 flex flex-col bg-[#0a0a0a] p-4 font-sans scale-90 rounded-t-xl group-hover:scale-95 transition-transform duration-500">
          <div className="flex justify-between items-center mb-4">
            <div className="w-12 h-1 bg-white/20 rounded-full" />
            <div className="w-4 h-4 rounded-full bg-white/10" />
          </div>
          <div className="space-y-4">
            <div className="h-4 w-20 bg-white/10 rounded-full" />
            <div className="h-20 w-full bg-white/5 rounded-2xl border border-white/10 p-3">
              <div className="h-2 w-16 bg-white/20 rounded-full mb-2" />
              <div className="h-6 w-24 bg-green-500/20 rounded-lg flex items-center px-2">
                <div className="w-12 h-2 bg-green-500 rounded-full" />
              </div>
            </div>
            <div className="h-10 w-full bg-blue-600 rounded-xl flex items-center justify-center">
              <div className="w-20 h-2 bg-white/40 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-24 bg-white/10 rounded-full" />
              <div className="flex gap-2">
                <div className="h-8 flex-1 bg-white/5 rounded-lg" />
                <div className="h-8 flex-1 bg-white/5 rounded-lg" />
                <div className="h-8 flex-1 bg-white/5 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'Cattle Manager',
      tech: 'React Native / Firebase',
      desc: 'A comprehensive livestock management system designed to track health, breeding, and production for farmers.',
      status: 'Coming Soon',
      color: 'from-emerald-400 to-teal-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-2 sm:p-4 pb-20">
      {pjs.map((p) => (
        <div key={p.name} className="flex flex-col bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all group">
          <div className="h-52 bg-slate-100 flex items-center justify-center border-b border-slate-100 relative overflow-hidden">
             <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${p.color || 'from-slate-400 to-slate-500'} opacity-5 group-hover:opacity-10`} />
             
             {/* Showcase Background Pattern */}
             <div className="absolute inset-0 opacity-[0.03] rotate-12 scale-150 pointer-events-none">
                <div className="w-full h-full border-[10px] border-slate-900 rounded-[4rem]" />
             </div>

             {/* Status Badge */}
             <div className={`absolute top-4 right-4 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-20 shadow-xl ${p.status === 'Coming Soon' ? 'bg-indigo-500' : 'bg-amber-500 animate-pulse'}`}>
               {p.status}
             </div>

             {/* Content Area */}
             <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                {p.showcase ? (
                  p.showcase
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-slate-200 flex items-center justify-center text-slate-300 group-hover:text-blue-500 transition-all group-hover:scale-110">
                      <TerminalIcon size={24} />
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] group-hover:text-blue-400">Project Showcase</span>
                  </div>
                )}
             </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors mb-1">{p.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">{p.tech}</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3 mb-4 flex-1">{p.desc}</p>
            
            {p.link && (
              <a 
                href={p.link} 
                target="_blank" 
                rel="noreferrer"
                onPointerDown={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 active:scale-95 self-start"
              >
                <span>Test Live</span>
                <ExternalLink size={12} strokeWidth={3} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkillsTerminal() {
  const [lines, setLines] = useState<string[]>(['Initializing kernel...', 'Loading drivers...', 'Accessing neural network...', 'Ready. Type "help" for commands.']);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const skills = [
    'Programming: Python, JavaScript, OOP, Responsive Design',
    'AI & Data: Machine Learning, NumPy, Pandas, Scikit-learn',
    'Computer Science: Algorithms, Data Structures, Databases',
    'Tools: Git, GitHub, Debugging, Testing',
    'Professional: Analytical Thinking, Collaboration, Leadership'
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    const newLines = [...lines, `> ${input}`];

    if (cmd === 'help') {
      newLines.push('Available commands: skills, clear, about, whoami, ping');
    } else if (cmd === 'skills') {
      newLines.push('Scanning skill set:', ...skills);
    } else if (cmd === 'clear') {
      setLines(['Console cleared. Type "help" list commands.']);
      setInput('');
      return;
    } else if (cmd === 'whoami') {
      newLines.push('root@portfolio ~ Guest Access Granted');
    } else if (cmd === 'ping') {
      newLines.push('64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.042 ms');
    } else {
      newLines.push(`Command not found: ${cmd}. Type "help" for a list of commands.`);
    }

    setLines(newLines);
    setInput('');
  };

  return (
    <div className="bg-slate-900 h-full text-green-400 font-mono text-sm p-4 rounded overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto custom-scrollbar pr-2" ref={scrollRef}>
        {lines.map((line, i) => (
          <div key={i} className="mb-0.5 whitespace-pre-wrap">{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="mt-2 flex items-center gap-2 border-t border-slate-800 pt-2 shrink-0">
        <span className="text-blue-400">$</span>
        <input 
          autoFocus
          className="bg-transparent border-none outline-none flex-1 text-green-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
        />
      </form>
    </div>
  );
}

export function Education() {
  const edu = [
    { school: 'University of Zimbabwe', degree: 'BSc Computer Science Honours', years: '2024 - Present', description: 'Relevant Coursework: Programming Fundamentals, Data Structures & Algorithms, OOP, Machine Learning, Database Concepts.' },
    { school: 'ZRP High School', degree: 'Advanced Level (13 Points)', years: 'A-Level', description: 'Computer Science (A), Mathematics (B), Accounting (B).' },
    { school: 'ZRP High School', degree: 'Ordinary Level', years: 'O-Level', description: 'Passed 10 subjects at Ordinary Level.' },
  ];

  return (
    <div className="space-y-8 p-2 sm:p-4 pb-20">
      <h3 className="text-[10px] uppercase font-black text-slate-300 tracking-[0.3em] flex items-center gap-4">
        Academic History <div className="h-px bg-slate-100 flex-1" />
      </h3>
      <div className="space-y-6">
        {edu.map((e, idx) => (
          <div key={idx} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-slate-100 group">
            <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-500 transition-colors" />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
              <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{e.school}</h4>
              <span className="text-[10px] font-black text-blue-500/50 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full w-fit">{e.years}</span>
            </div>
            <div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">{e.degree}</div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">{e.description}</p>
          </div>
        ))}
      </div>
      <div className="p-6 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-transform duration-700" />
        <h3 className="text-[10px] uppercase font-black text-blue-200 tracking-[0.3em] mb-4 relative z-10">Certifications</h3>
        <ul className="text-xs font-bold space-y-3 relative z-10">
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            ICDL Digital Skills for Microsoft 365
          </li>
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            CS50’s Introduction to AI with Python
          </li>
          <li className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Cisco Ethical Hacking
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-100 border border-blue-400/20">
              In Progress
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

  const inputClasses = (field: string) => `
    w-full bg-transparent border-b-2 py-4 outline-none transition-all duration-300 font-medium text-slate-800
    ${focusedField === field || formData[field as keyof typeof formData] 
      ? 'border-blue-600 bg-blue-50/10' 
      : 'border-slate-100 hover:border-slate-200'
    }
  `;

  const labelClasses = (field: string) => `
    absolute left-0 transition-all duration-300 pointer-events-none uppercase font-black tracking-[0.2em] text-[9px]
    ${focusedField === field || formData[field as keyof typeof formData]
      ? '-top-2 text-blue-600 opacity-100'
      : 'top-5 text-slate-400 opacity-60'
    }
  `;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    const path = 'contacts';
    try {
      await addDoc(collection(db, path), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'New Contact Form Submission',
        message: formData.message,
        createdAt: serverTimestamp()
      });

      setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Oops! Something went wrong. Please try again or email me directly.' });
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 pb-32">
      <div className="space-y-12 mb-12 text-center">
        <h3 className="text-[10px] uppercase font-black text-slate-300 tracking-[0.4em] mb-6 flex items-center justify-center gap-4">
          Connect <div className="h-px bg-slate-100 w-12" />
        </h3>
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6">
          Let's craft <br />
          <span className="text-blue-600">innovation</span> together.
        </h2>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />
        
        <form className="space-y-10 relative z-10" onSubmit={handleSubmit}>
          {status.type !== 'idle' && (
            <div className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center animate-in fade-in slide-in-from-top-2 duration-300 ${
              status.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
              status.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' :
              'bg-blue-50 text-blue-600 border border-blue-100'
            }`}>
              {status.message}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            <div className="relative">
              <label className={labelClasses('name')}>Full Name</label>
              <input 
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('name')}
                placeholder=""
              />
            </div>
            <div className="relative">
              <label className={labelClasses('email')}>Email Address</label>
              <input 
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('email')}
                placeholder=""
              />
            </div>
          </div>

          <div className="relative">
            <label className={labelClasses('subject')}>Subject</label>
            <input 
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              className={inputClasses('subject')}
              placeholder=""
            />
          </div>

          <div className="relative">
            <label className={labelClasses('message')}>Your Message</label>
            <textarea 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              className={`${inputClasses('message')} h-32 resize-none`}
              placeholder=""
            />
          </div>

          <button 
            type="submit"
            disabled={status.type === 'loading'}
            className="group relative w-full h-16 bg-slate-900 text-white font-black rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className={`absolute inset-0 bg-blue-600 transition-transform duration-500 ${status.type === 'loading' ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`} />
            <span className="relative z-10 flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.3em]">
              {status.type === 'loading' ? 'Sending...' : 'Send Message'}
              <Send size={16} className={`${status.type !== 'loading' ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : ''} transition-transform`} />
            </span>
          </button>
        </form>
      </div>

      <div className="mt-16 flex flex-wrap justify-center gap-6">
        {[
          { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/263780952004', color: 'hover:text-emerald-500 hover:border-emerald-200' },
          { icon: Mail, label: 'Email', href: 'mailto:stevetapuwataiwa@gmail.com', color: 'hover:text-blue-500 hover:border-blue-200' },
          { icon: Phone, label: 'Call', href: 'tel:+263780952004', color: 'hover:text-amber-500 hover:border-amber-200' }
        ].map((item, i) => (
          <a 
            key={i} 
            href={item.href}
            className={`w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-lg shadow-slate-200/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${item.color}`}
            title={item.label}
          >
            <item.icon size={20} />
          </a>
        ))}
      </div>
    </div>
  );
}
