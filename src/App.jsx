import React, { useState, useEffect, useRef } from 'react';
import { 
  Map as MapIcon, Scroll, Compass as CompassIcon, Feather, Crosshair, Mountain, Gem, 
  Ship, Anchor, Link as LinkIcon, List, MapPin, Tent, Castle, Landmark, 
  Cpu, Globe, Code, Menu, X, BookOpen, Trophy, Star, Github, Linkedin, 
  Hammer, Shield, Zap
} from 'lucide-react';
import profilePic from './assets/portfolio-pic.png';

// --- Utility Components ---

const PaperBackground = ({ children, className = "" }) => (
  <div className="relative bg-[#f3e9d2] text-[#2c241b] h-full w-full overflow-hidden isolate">
    {/* Paper Texture Overlay */}
    <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply z-0"
         style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/aged-paper.png")` }}></div>
    
    {/* Vignette & Grime */}
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(44,36,27,0.15)_100%)] z-0"></div>
    
    {/* Content Wrapper */}
    <div className={`relative z-10 h-full ${className}`}>
      {children}
    </div>
  </div>
);

const InkRipple = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {ripples.map(r => (
        <div
          key={r.id}
          className="absolute bg-[#2c241b] rounded-full opacity-20 animate-ink-splash"
          style={{ left: r.x, top: r.y, width: '20px', height: '20px', transform: 'translate(-50%, -50%)' }}
        />
      ))}
    </div>
  );
};

const DustMotes = ({ layer = "background" }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: layer === "background" ? 15 : 8 }).map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-float ${layer === "background" ? 'bg-[#eaddcf] opacity-30 w-1 h-1' : 'bg-[#2c241b] opacity-10 w-2 h-2'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 20}s`
          }}
        />
      ))}
    </div>
  );
};

// --- New Detailed Compass Component ---
const DetailedCompass = ({ rotation }) => (
  <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
    {/* Outer Ring */}
    <div className="absolute inset-0 border-2 border-[#4a3b2a] rounded-full opacity-80 shadow-sm bg-[#eaddcf]"></div>
    <div className="absolute inset-0.5 border border-dashed border-[#4a3b2a] rounded-full opacity-50"></div>
    
    {/* Cardinal Directions */}
    <div className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#8b0000] font-serif">N</div>
    <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#2c241b] font-serif">S</div>
    <div className="absolute right-0.5 top-1/2 -translate-y-1/2 text-[8px] font-bold text-[#2c241b] font-serif">E</div>
    <div className="absolute left-0.5 top-1/2 -translate-y-1/2 text-[8px] font-bold text-[#2c241b] font-serif">W</div>

    {/* Decorative Inner Star/Rose (Static Background) */}
    <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 p-2 opacity-20">
       <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="#2c241b" />
    </svg>

    {/* Rotating Needle */}
    <div 
      className="absolute w-full h-full transition-transform duration-700 ease-out"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
       {/* North Needle (Red) */}
       <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-b-[25px] border-l-transparent border-r-transparent border-b-[#8b0000] origin-bottom transform"></div>
       
       {/* South Needle (Dark) */}
       <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[25px] border-l-transparent border-r-transparent border-t-[#2c241b] origin-top transform"></div>
       
       {/* Center Pin */}
       <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[#d4af37] rounded-full -translate-x-1/2 -translate-y-1/2 border border-[#2c241b] z-10"></div>
    </div>
  </div>
);

const InkButton = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`
      group relative w-full flex items-center gap-3 px-6 py-4 transition-all duration-300 outline-none text-left
      ${active ? 'bg-[#d3c4a9]/40' : 'hover:bg-[#d3c4a9]/20'}
    `}
  >
    {active && (
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8b0000]"></div>
    )}
    <div className={`relative z-10 flex items-center gap-4 ${active ? 'text-[#8b0000] font-bold' : 'text-[#4a3b2a]'}`}>
      <span className={`transform transition-transform duration-300 ${active ? 'scale-125' : 'group-hover:scale-110'}`}>
        {icon}
      </span>
      <span className={`font-rye text-lg md:text-xl tracking-widest uppercase`}>
        {label}
      </span>
    </div>
  </button>
);

const MobileNavItem = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 flex-1 transition-colors relative overflow-hidden ${active ? 'text-[#8b0000]' : 'text-[#4a3b2a] opacity-70'}`}
  >
    {active && <div className="absolute inset-0 bg-[#8b0000] opacity-5"></div>}
    <div className={`${active ? 'transform -translate-y-1 scale-110' : ''} transition-transform duration-200`}>
      {icon}
    </div>
    <span className="text-[10px] font-rye mt-1 uppercase tracking-widest">{label}</span>
  </button>
);

const TechIcon = ({ name }) => {
  const iconMap = {
    "Angular": "angular",
    "ReactJS": "react",
    "Next.js": "nextdotjs",
    "TypeScript": "typescript",
    "JavaScript": "javascript",
    "HTML": "html5",
    "Tailwind CSS": "tailwindcss",
    "Bootstrap": "bootstrap",
    "RxJS": "reactivex",
    "NodeJS": "nodedotjs",
    "Python": "python",
    "NestJS": "nestjs",
    "Flask": "flask",
    "Express": "express",
    "AWS": "amazonwebservices", 
    "PostgreSQL": "postgresql",
    "MySQL": "mysql",
    "Redis": "redis",
    "Docker": "docker",
    "IIS": "microsoft", 
    "Cypress": "cypress",
    "Playwright": "playwright",
    "Git": "git",
    "HTML/CSS": "html5"
  };

  const slug = iconMap[name];
  const [imgError, setImgError] = useState(false);
  
  if (!slug || imgError) {
    let IconComponent = Code;
    if (["AWS", "Docker", "IIS"].includes(name)) IconComponent = Cpu;
    if (["HTML", "CSS", "Bootstrap", "HTML/CSS"].includes(name)) IconComponent = Globe;
    return <IconComponent className="w-5 h-5 text-[#4a3b2a]" />;
  }

  return (
    <img 
      src={`https://cdn.simpleicons.org/${slug}/2c241b`} 
      alt={name}
      className="w-5 h-5 opacity-90 group-hover:opacity-100 transition-all group-hover:scale-110"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
};

const PageSection = ({ id, children }) => {
  return (
    <section 
      id={id} 
      className="min-h-screen w-full snap-start relative flex flex-col shrink-0"
    >
      <div className="flex-1 flex flex-col justify-start md:justify-center p-6 md:p-16 max-w-7xl mx-auto w-full pt-24 md:pt-16 pb-24 md:pb-16 h-full">
        {children}
      </div>
    </section>
  );
};

// --- Sections ---

const Overview = () => (
  <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8 md:gap-16 h-full justify-center max-w-6xl mx-auto relative">
    
    {/* Decorative Background Stamp */}
    <div className="absolute right-0 top-10 opacity-10 rotate-[-15deg] border-4 border-[#8b0000] p-4 rounded-lg pointer-events-none hidden md:block">
       <div className="text-6xl font-im-fell text-[#8b0000] font-bold uppercase tracking-widest">Verified</div>
       <div className="text-2xl font-mono text-[#8b0000] text-center mt-2">CLASS A ENGINEER</div>
    </div>

    <div className="w-full flex flex-col md:flex-row items-center gap-10 md:gap-16">
      {/* Photo Frame with Tape Effect */}
      <div className="relative flex-shrink-0 transform rotate-[-2deg] transition-transform duration-500 hover:rotate-0 z-10">
        {/* Tape Strip */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#d3c4a9]/80 shadow-sm transform rotate-[-1deg] z-20 border-l border-r border-white/20"></div>
        
        <div className="w-56 h-72 md:w-72 md:h-96 bg-[#f3e9d2] p-3 shadow-[0_20px_30px_-10px_rgba(0,0,0,0.3)] border border-[#d3c4a9]">
          <div className="w-full h-full bg-black overflow-hidden relative daguerreotype-filter border border-[#2c241b]/20 grayscale-[0.3] sepia-[0.4]">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/scratches.png')] opacity-40 mix-blend-screen"></div>
             <img src={profilePic} alt="Avatar" className="w-full h-full object-cover" />
             {/* Date Stamp on Photo */}
             <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[#d4af37] opacity-80">11.20.2025</div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6 md:space-y-8 relative">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2 opacity-60">
             <Feather size={16} className="text-[#8b0000]" />
             <span className="font-im-fell text-[#4a3b2a] tracking-[0.3em] text-sm uppercase">The Profile of</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-rye text-[#2c241b] mb-4 drop-shadow-sm leading-[0.9]">
            Arokia <br className="hidden md:block" /><span className="text-[#4a3b2a]">Lijas</span>
          </h2>
          <div className="inline-flex flex-col items-start">
             <div className="h-1 w-full bg-[#8b0000]/80 mb-1 rounded-full"></div>
             <p className="text-xl md:text-3xl text-[#8b0000] font-im-fell tracking-widest uppercase font-bold">Senior Software Engineer</p>
          </div>
        </div>

        <div className="relative">
           <span className="absolute -left-4 -top-2 text-6xl text-[#d3c4a9] font-serif opacity-50">“</span>
           <p className="text-2xl md:text-4xl leading-normal font-bold text-[#4a3b2a] font-caveat pl-4 relative z-10">
             A front-end developer with strong back-end skills, passionate about technology and methodologies. 
             Always trying to learn, improve, and share knowledge.
           </p>
        </div>
        
        <div className="pt-6 border-t-2 border-dashed border-[#2c241b]/20 flex flex-wrap gap-6 justify-center md:justify-start items-center">
           <div className="flex items-center gap-3 text-lg font-im-fell text-[#4a3b2a]">
              <div className="p-2 bg-[#2c241b] text-[#f3e9d2] rounded-full"><MapPin size={16} /></div>
              <span>Chennai, India</span>
           </div>
           <div className="h-8 w-px bg-[#2c241b]/20 hidden md:block"></div>
           <div className="flex items-center gap-3 text-lg font-im-fell text-[#4a3b2a]">
              <div className="p-2 bg-[#2c241b] text-[#f3e9d2] rounded-full"><Scroll size={16} /></div>
              <span>Exp: 6+ Years</span>
           </div>

           <div className="ml-auto mt-4 md:mt-0 font-caveat text-3xl text-[#8b0000] rotate-[-5deg] opacity-80">
              Arokia L.
           </div>
        </div>
      </div>
    </div>
  </div>
);

const OriginsSection = () => (
  <div className="flex flex-col items-center justify-center min-h-full max-w-4xl mx-auto text-center md:text-left">
    <div className="mb-6 md:mb-8 w-full">
      <h2 className="text-4xl md:text-7xl font-rye text-[#2c241b] mb-2">The Origin Story</h2>
      <p className="text-lg md:text-xl text-[#8b0000] font-im-fell tracking-[0.2em] uppercase border-b-2 border-[#8b0000]/20 inline-block pb-2">From Gears to Git</p>
    </div>

    <div className="bg-[#eaddcf] p-6 md:p-12 border-2 border-[#d3c4a9] shadow-[0_10px_30px_rgba(44,36,27,0.1)] relative w-full">
      <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#8b0000] opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#8b0000] opacity-20"></div>

      <div className="space-y-6 md:space-y-8 font-caveat text-2xl md:text-3xl leading-loose text-[#4a3b2a]">
        <p>
          <span className="text-6xl md:text-7xl float-left font-rye text-[#8b0000] mr-3 mt-[-10px]">I</span>
          started my journey in <strong className="text-[#8b0000]">Mechanical Engineering</strong>. I was fascinated by how things worked in the physical world—gears, levers, and machines. But something was missing.
        </p>
        <p>
          One day, I watched a friend write a simple function to add two numbers. It seemed trivial, but it sparked something in me. It wasn't just math; it was <em className="text-[#2c241b] font-bold bg-[#d3c4a9]/30 px-2 rounded">creation</em>. Seeing logic turn into action instantly was a feeling gears couldn't give me.
        </p>
        <p>
          That moment changed everything. I dove into coding, teaching myself everything I could. I'm driven by a simple goal: to make things better. Whether it's optimizing code or refining a user experience, I'm always looking for the next improvement.
        </p>
      </div>
      
      <div className="mt-8 md:mt-12 flex justify-center md:justify-end">
        <div className="flex items-center gap-2 text-[#8b0000] opacity-60 font-im-fell text-sm">
          <Feather size={16} />
          <span>Ex Animo</span>
        </div>
      </div>
    </div>
  </div>
);

const JourneySection = () => {
  const [viewMode, setViewMode] = useState('map'); 

  const experiences = [
    {
      id: 1,
      company: "Infosys Limited",
      role: "Systems Engineer",
      period: "05/2019 - 07/2021",
      icon: <Tent size={24} />,
      desc: "Developed Infosys Meridian platforms & onboarding portals.",
      tasks: ["Led Infosys Meridian & Grace Meridian Platforms.", "Built employee onboarding project portal.", "Mentored three concurrent projects."],
      x: 15, y: 75
    },
    {
      id: 2,
      company: "Hashedin",
      role: "Software Engineer - I",
      period: "07/2021 - 12/2021",
      icon: <Castle size={24} />,
      desc: "Led UI team for Banking Domain. Top 6 in product demo.",
      tasks: ["Led UI team for Banking Domain.", "Team ranked top 6 in product demo."],
      x: 38, y: 45
    },
    {
      id: 3,
      company: "Lumiq.ai",
      role: "Fullstack Developer",
      period: "12/2021 - 04/2022",
      icon: <Ship size={24} />,
      desc: "Specialized in Insurance domain solutions.",
      tasks: ["Developed solutions for the Insurance domain."],
      x: 62, y: 65
    },
    {
      id: 4,
      company: "Siemens",
      role: "Senior Software Engineer",
      period: "04/2022 - Present",
      icon: <Landmark size={24} />,
      desc: "Productized 2 PoCs & optimized fleet charging.",
      tasks: ["Designed fleet charging optimization algorithms.", "Productized a Hackathon PoC successfully.", "Implemented smart charging strategies.", "Optimized memory with lazy loading.", "Conducted code reviews."],
      current: true,
      x: 85, y: 30
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 border-b-2 border-[#2c241b] pb-2 shrink-0 gap-4">
        <div className="w-full md:w-auto">
          <h2 className="text-4xl md:text-6xl font-rye text-[#2c241b]">The Journey</h2>
          <div className="text-[#8b0000] font-im-fell mt-1 tracking-widest uppercase text-lg md:text-xl">Career Expedition</div>
        </div>
        
        <div className="flex items-center gap-2 bg-[#eaddcf] border border-[#4a3b2a] rounded p-1 shadow-sm self-end">
          <button 
            onClick={() => setViewMode('map')}
            className={`p-2 rounded transition-colors ${viewMode === 'map' ? 'bg-[#2c241b] text-[#eaddcf]' : 'text-[#4a3b2a] hover:bg-[#d3c4a9]'}`}
            title="Map View"
          >
            <MapIcon size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-[#2c241b] text-[#eaddcf]' : 'text-[#4a3b2a] hover:bg-[#d3c4a9]'}`}
            title="List View"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <div className="relative flex-1 w-full overflow-hidden min-h-[500px] md:min-h-0 flex flex-col">
        
        {viewMode === 'map' && (
          <div className="relative w-full h-[500px] md:h-[600px] border-4 border-[#4a3b2a] bg-[#eaddcf] rounded-sm overflow-hidden shadow-inner p-4">
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'radial-gradient(#4a3b2a 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* DECORATIVE MAP & PATH LAYER */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              width="100%" height="100%"
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
               {/* Terrain Decor */}
               <g stroke="#4a3b2a" strokeWidth="0.5" fill="none" opacity="0.4">
                  <path d="M 78 25 L 82 10 L 86 25 M 84 25 L 88 5 L 92 25" /> {/* Mountains */}
                  <path d="M 10 85 Q 20 80 30 90" /> {/* Coastline */}
                  <path d="M 70 90 Q 80 85 90 90" />
               </g>

               {/* Path Dashed Line */}
               <path 
                 d="M 15 75 Q 30 85 38 45 T 62 65 T 85 30" 
                 fill="none" 
                 stroke="#8b0000" 
                 strokeWidth="0.8" 
                 strokeDasharray="2 1"
               />
            </svg>
    
            {experiences.map((exp) => (
              <div 
                key={exp.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                style={{ left: `${exp.x}%`, top: `${exp.y}%` }}
                onClick={() => setViewMode('list')} 
              >
                <div className={`
                  relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-[#4a3b2a] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110
                  ${exp.current ? 'bg-[#8b0000] text-[#eaddcf]' : 'bg-[#f3e9d2] text-[#4a3b2a]'}
                `}>
                  {exp.icon}
                  {exp.current && (
                    <div className="absolute -top-3 -right-3 text-[10px] bg-[#d4af37] text-[#2c241b] px-2 py-0.5 font-bold rounded shadow-sm animate-bounce font-sans border border-[#2c241b]">Here</div>
                  )}
                </div>
                
                <div className="absolute top-14 md:top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-im-fell font-bold text-xs md:text-base text-[#2c241b] bg-[#eaddcf]/90 px-3 py-1 rounded border border-[#d3c4a9] shadow-sm backdrop-blur-sm">
                  {exp.company}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'list' && (
          <div className="h-full overflow-y-auto custom-scrollbar pr-2 pb-4">
             <div className="relative border-l-4 border-[#8b0000] border-dashed ml-4 md:ml-12 my-4 md:my-8 pl-6 md:pl-12 space-y-12">
              <div className="absolute -left-[2px] top-0 bottom-0 w-1 bg-[#8b0000] opacity-20"></div>
      
              {[...experiences].reverse().map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[40px] md:-left-[62px] top-0 w-8 h-8 md:w-8 md:h-8 bg-[#eaddcf] border-4 border-[#8b0000] rounded-full z-10 group-hover:scale-125 transition-transform shadow-sm flex items-center justify-center">
                    {index === 0 && <div className="w-3 h-3 bg-[#8b0000] rounded-full animate-pulse"></div>}
                  </div>
      
                  <div className="relative bg-[#eaddcf] p-6 md:p-8 border border-[#d3c4a9] shadow-[4px_4px_0px_rgba(44,36,27,0.2)] transform group-hover:-translate-y-1 transition-transform">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-[#d3c4a9] pb-2 gap-2">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-rye text-[#2c241b]">{exp.company}</h3>
                        <div className="text-[#8b0000] font-bold font-im-fell uppercase text-sm md:text-lg tracking-wide">{exp.role}</div>
                      </div>
                      <div className="bg-[#2c241b] text-[#f3e9d2] px-3 md:px-4 py-1 text-xs md:text-sm font-mono rounded-sm shadow-sm tracking-wider">
                        {exp.period}
                      </div>
                    </div>
      
                    <ul className="space-y-2">
                      {exp.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-3 text-xl md:text-2xl text-[#4a3b2a] font-caveat">
                          <span className="mt-1 text-[#8b0000] text-lg">✦</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

const AchievementSection = () => {
  const awards = [
    {
      title: "Path Finder",
      org: "Siemens",
      desc: "Awarded for going beyond expectations to create a Proof of Concept (PoC) that evolved into a commercial product sold to customers.",
      icon: <CompassIcon size={32} />
    },
    {
      title: "Value Creator",
      org: "Siemens",
      desc: "Recognized for developing a PoC that demonstrated high business value and was subsequently integrated into the core application.",
      icon: <Gem size={32} />
    },
    {
      title: "Awards for Excellence",
      org: "Infosys",
      desc: "Outstanding achievement in Systems and Process optimization for the Live Enterprise - Infosys Meridian Platform.",
      icon: <Star size={32} />
    }
  ];

  return (
    <div className="h-full flex flex-col justify-center max-w-6xl mx-auto w-full">
      <div className="text-center mb-8 md:mb-12 shrink-0">
        <h2 className="text-4xl md:text-6xl font-rye text-[#2c241b]">Hall of Records</h2>
        <p className="text-[#8b0000] font-im-fell mt-2 tracking-widest text-xl">Honors & Achievements</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          {awards.map((award, idx) => (
            <div key={idx} className="relative bg-[#eaddcf] p-6 border-[6px] border-double border-[#4a3b2a] shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
              {/* Frame Corner Decor */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#8b0000]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#8b0000]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#8b0000]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#8b0000]"></div>

              <div className="mb-4 p-4 rounded-full bg-[#2c241b] text-[#f3e9d2] shadow-lg group-hover:bg-[#8b0000] transition-colors">
                {award.icon}
              </div>
              
              <h3 className="text-2xl font-rye text-[#2c241b] mb-1">{award.title}</h3>
              <div className="text-sm font-bold text-[#8b0000] uppercase tracking-widest mb-4 font-im-fell">{award.org}</div>
              
              <div className="w-full h-px bg-[#4a3b2a]/30 mb-4"></div>
              
              <p className="text-xl font-caveat leading-relaxed text-[#4a3b2a]">
                "{award.desc}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Arsenal = () => {
  const skillCategories = [
    {
      id: "frontend",
      title: "Frontline Gear",
      icon: <Crosshair size={24} className="text-[#8b0000]" />,
      desc: "User Interface & Experience",
      skills: [
        { name: "Angular", level: 5 },
        { name: "ReactJS", level: 5 },
        { name: "TypeScript", level: 5 },
        { name: "Next.js", level: 4 },
        { name: "Tailwind", level: 5 },
        { name: "RxJS", level: 4 },
      ]
    },
    {
      id: "backend",
      title: "Heavy Artillery",
      icon: <Anchor size={24} className="text-[#8b0000]" />,
      desc: "Server & Infrastructure",
      skills: [
        { name: "NodeJS", level: 4 },
        { name: "Python", level: 3 },
        { name: "NestJS", level: 4 },
        { name: "PostgreSQL", level: 4 },
        { name: "AWS", level: 3 },
        { name: "Docker", level: 3 },
      ]
    },
    {
      id: "tools",
      title: "Tactical Tools",
      icon: <CompassIcon size={24} className="text-[#8b0000]" />,
      desc: "Testing & Version Control",
      skills: [
        { name: "Git", level: 5 },
        { name: "Cypress", level: 4 },
        { name: "Playwright", level: 3 },
        { name: "HTML/CSS", level: 5 },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col justify-center max-w-6xl mx-auto w-full">
      <div className="text-center mb-8 md:mb-10 shrink-0">
        <h2 className="text-4xl md:text-6xl font-rye text-[#2c241b]">The Arsenal</h2>
        <p className="text-[#8b0000] font-im-fell mt-2 tracking-widest text-xl uppercase border-b border-[#8b0000]/30 inline-block pb-1">
          Field Equipment & Power Ratings
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {skillCategories.map((cat) => (
            <div key={cat.id} className="relative bg-[#eaddcf] border-4 border-[#4a3b2a] p-6 shadow-[5px_5px_0px_rgba(44,36,27,0.3)]">
              {/* Rivets */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#2c241b]/40 shadow-inner"></div>
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#2c241b]/40 shadow-inner"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#2c241b]/40 shadow-inner"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#2c241b]/40 shadow-inner"></div>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6 border-b-2 border-dashed border-[#4a3b2a]/30 pb-3">
                <div className="p-3 bg-[#2c241b] rounded-sm text-[#eaddcf] shadow-sm">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-rye text-2xl md:text-3xl text-[#2c241b]">{cat.title}</h3>
                  <div className="font-im-fell text-xs text-[#8b0000] uppercase tracking-[0.2em]">{cat.desc}</div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="space-y-4">
                {cat.skills.map((skill, i) => (
                  <div key={i} className="flex flex-col gap-1 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#4a3b2a]">
                        <div className="w-8 h-8 rounded-full bg-[#d3c4a9]/50 flex items-center justify-center border border-[#4a3b2a]/20 group-hover:border-[#8b0000] group-hover:bg-[#eaddcf] transition-colors">
                           <TechIcon name={skill.name} />
                        </div>
                        <span className="font-rye text-lg group-hover:text-[#8b0000] transition-colors">{skill.name}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#8b0000] opacity-0 group-hover:opacity-100 transition-opacity">LVL {skill.level}</span>
                    </div>
                    
                    {/* Vintage Gauge Style Bar */}
                    <div className="relative h-3 w-full bg-[#2c241b] border border-[#4a3b2a]/50 rounded-sm overflow-hidden p-[1px]">
                      {/* Ruler Ticks Background */}
                      <div className="absolute inset-0 w-full h-full z-10 opacity-20" 
                           style={{ backgroundImage: 'linear-gradient(90deg, transparent 19%, #eaddcf 20%, transparent 21%)', backgroundSize: '10% 100%' }}></div>
                      
                      {/* Liquid Fill */}
                      <div 
                         className="h-full bg-gradient-to-r from-[#b8860b] to-[#d4af37] relative transition-all duration-1000 ease-out group-hover:brightness-110"
                         style={{ width: `${(skill.level / 5) * 100}%` }}
                      >
                         <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:8px_8px] opacity-30"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* "Coming Soon" / Research Crate */}
          <div className="relative bg-[#4a3b2a] p-6 shadow-[5px_5px_0px_rgba(0,0,0,0.3)] border-4 border-[#2c241b] flex flex-col items-center justify-center text-center opacity-90">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-noise.png')] opacity-10"></div>
             <Hammer size={48} className="text-[#f3e9d2] mb-4 opacity-50" />
             <h3 className="font-rye text-3xl text-[#eaddcf] mb-2">R & D Lab</h3>
             <p className="font-im-fell text-[#8b0000] uppercase tracking-widest text-sm bg-[#eaddcf] px-2 py-1 mb-4">Research in Progress</p>
             <p className="font-caveat text-[#f3e9d2] text-xl opacity-80">
               Currently experimenting with Three.js, WebGL, and Rust integration.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

const Courier = () => (
  <div className="h-full flex flex-col justify-center items-center max-w-4xl mx-auto w-full">
    <div className="w-full bg-[#eaddcf] p-6 md:p-16 shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-[#d3c4a9] relative transform rotate-[-1deg]">
      
      {/* Wax Seal */}
      <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-20 h-20 md:w-24 md:h-24 bg-[#8b0000] rounded-full shadow-lg flex items-center justify-center text-[#bd2c2c] border-4 border-[#6d1010] z-20">
         <div className="border-2 border-[#bd2c2c] rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-dashed">
            <span className="font-im-fell text-xs md:text-sm text-[#eaddcf] font-bold">OFFICIAL</span>
         </div>
      </div>

      <h2 className="text-4xl md:text-6xl font-rye text-[#2c241b] mb-6 md:mb-8 text-center">Send a Courier</h2>
      
      <div className="mb-8 md:mb-12 text-center">
        <p className="text-2xl md:text-3xl mb-4 font-caveat text-[#4a3b2a]">Open to new quests, alliances, and technical challenges.</p>
        <a href="mailto:arockiyalijas.al@gmail.com" className="font-bold text-[#8b0000] text-xl md:text-3xl hover:underline font-rye break-all">arockiyalijas.al@gmail.com</a>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 border-t-2 border-[#d3c4a9] pt-8 md:pt-12 border-dashed">
        <a href="https://www.linkedin.com/in/arokia-lijas-322259196" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 group">
           <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2c241b] text-[#eaddcf] flex items-center justify-center rounded-full group-hover:bg-[#0077b5] transition-colors shadow-lg transform group-hover:scale-110 duration-300">
             <Linkedin size={24} className="md:w-8 md:h-8" />
           </div>
           <span className="font-rye text-base md:text-lg text-[#2c241b]">LinkedIn Guild</span>
        </a>
        <a href="https://medium.com/@arokia-lijas" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 group">
           <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2c241b] text-[#eaddcf] flex items-center justify-center rounded-full group-hover:bg-black transition-colors shadow-lg transform group-hover:scale-110 duration-300">
             <BookOpen size={24} className="md:w-8 md:h-8" />
           </div>
           <span className="font-rye text-base md:text-lg text-[#2c241b]">Medium Scrolls</span>
        </a>
      </div>
    </div>
  </div>
);

export default function AdventurePortfolio() {
  const [activeSection, setActiveSection] = useState('overview');
  const scrollRef = useRef(null);

  // Rotation for compass based on active section
  const getCompassRotation = () => {
    const sections = ['overview', 'origins', 'journey', 'achievements', 'skills', 'contact'];
    const index = sections.indexOf(activeSection);
    return index * 60; // Rotate 60deg per section
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Rye&family=Caveat:wght@400;700&family=IM+Fell+English+SC&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.4 } 
    );

    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-screen w-screen bg-[#f3e9d2] font-caveat overflow-hidden flex flex-col md:flex-row selection:bg-[#8b0000] selection:text-[#eaddcf]">
      <InkRipple />
      
      <PaperBackground className="flex flex-col md:flex-row w-full h-full">
        
        {/* Sidebar (Desktop) */}
        <div className="hidden md:flex w-80 border-r border-[#d3c4a9] flex-col z-30 relative bg-[#eaddcf]/50 backdrop-blur-sm h-full flex-shrink-0">
           <div className="p-8 border-b border-[#d3c4a9]">
              <div className="text-center">
                <div className="text-5xl text-[#8b0000] mb-2 opacity-20">❝</div>
                <h1 className="font-rye text-3xl text-[#2c241b] mt-[-20px]">The Journal</h1>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="h-px w-8 bg-[#8b0000]"></div>
                  <p className="text-[#8b0000] font-im-fell text-sm uppercase tracking-[0.2em]">Vol. V</p>
                  <div className="h-px w-8 bg-[#8b0000]"></div>
                </div>
              </div>
           </div>

           <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
              <InkButton active={activeSection === 'overview'} onClick={() => scrollToId('overview')} label="Overview" icon={<Anchor size={22} />} />
              <InkButton active={activeSection === 'origins'} onClick={() => scrollToId('origins')} label="Origins" icon={<BookOpen size={22} />} />
              <InkButton active={activeSection === 'journey'} onClick={() => scrollToId('journey')} label="The Journey" icon={<MapIcon size={22} />} />
              <InkButton active={activeSection === 'achievements'} onClick={() => scrollToId('achievements')} label="Achievements" icon={<Trophy size={22} />} />
              <InkButton active={activeSection === 'skills'} onClick={() => scrollToId('skills')} label="Arsenal" icon={<Gem size={22} />} />
              <InkButton active={activeSection === 'contact'} onClick={() => scrollToId('contact')} label="Courier" icon={<Feather size={22} />} />
           </nav>

           <div className="p-6 border-t border-[#d3c4a9] bg-[#d3c4a9]/10 flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#4a3b2a] opacity-70">
                <Mountain size={16} />
                <span className="text-xs font-im-fell tracking-widest">EST. 2019</span>
              </div>
              
              {/* Dynamic Compass */}
              <DetailedCompass rotation={getCompassRotation()} />
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden h-full flex flex-col w-full">
            
            {/* Mobile Header */}
            <div className="md:hidden p-4 border-b border-[#d3c4a9] bg-[#eaddcf] flex justify-between items-center z-40 shadow-sm absolute top-0 w-full">
              <div>
                <div className="font-rye text-xl text-[#2c241b]">The Journal</div>
                <div className="font-im-fell text-xs text-[#8b0000]">Arokia Lijas</div>
              </div>
              <div className="transform scale-50 origin-right">
                 <DetailedCompass rotation={getCompassRotation()} />
              </div>
            </div>

            {/* Scroll Container */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto custom-scrollbar relative z-10 scroll-smooth snap-y snap-proximity h-full"
            >
               <DustMotes layer="foreground" />
               
               <div className="w-full pb-20 md:pb-0">
                 <PageSection id="overview">
                   <Overview />
                 </PageSection>

                 <PageSection id="origins">
                    <OriginsSection />
                 </PageSection>

                 <PageSection id="journey">
                   <JourneySection />
                 </PageSection>

                 <PageSection id="achievements">
                   <AchievementSection />
                 </PageSection>

                 <PageSection id="skills">
                   <Arsenal />
                 </PageSection>

                 <PageSection id="contact">
                   <Courier />
                 </PageSection>
               </div>
            </div>

            {/* Mobile Nav */}
            <div className="md:hidden bg-[#eaddcf] border-t border-[#d3c4a9] flex justify-around items-center pb-safe z-30 shadow-[0_-5px_10px_rgba(0,0,0,0.1)] h-16 fixed bottom-0 w-full">
              <MobileNavItem active={activeSection === 'overview'} onClick={() => scrollToId('overview')} icon={<Anchor size={20} />} label="Home" />
              <MobileNavItem active={activeSection === 'journey'} onClick={() => scrollToId('journey')} icon={<MapIcon size={20} />} label="Map" />
              <MobileNavItem active={activeSection === 'achievements'} onClick={() => scrollToId('achievements')} icon={<Trophy size={20} />} label="Awards" />
              <MobileNavItem active={activeSection === 'skills'} onClick={() => scrollToId('skills')} icon={<Gem size={20} />} label="Skills" />
              <MobileNavItem active={activeSection === 'contact'} onClick={() => scrollToId('contact')} icon={<Feather size={20} />} label="Mail" />
            </div>

            {/* Corner Decoration */}
            <div className="hidden md:block absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#2c241b]/5 to-transparent pointer-events-none z-20"></div>
        </div>

      </PaperBackground>

      {/* CSS */}
      <style>{`
        .font-rye { font-family: 'Rye', serif; }
        .font-caveat { font-family: 'Caveat', cursive; font-size: 1.3rem; }
        .font-im-fell { font-family: 'IM Fell English SC', serif; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(211, 196, 169, 0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #8b0000; border-radius: 4px; border: 2px solid transparent; background-clip: content-box; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #5c0000; }
        
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }

        @keyframes ink-splash {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        .animate-ink-splash { animation: ink-splash 0.6s ease-out forwards; }

        @keyframes float {
          0% { transform: translate(0,0); opacity: 0; }
          50% { transform: translate(-10px, -20px); opacity: 0.5; }
          100% { transform: translate(0,0); opacity: 0; }
        }
        .animate-float { animation-name: float; animation-timing-function: ease-in-out; iteration-count: infinite; }

        .daguerreotype-filter {
          filter: sepia(0.6) contrast(1.2) brightness(0.9) grayscale(0.2);
          box-shadow: inset 0 0 50px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}