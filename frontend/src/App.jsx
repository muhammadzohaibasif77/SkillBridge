import React, { useState } from 'react';

const mentorsData = [
  {
    id: 1,
    name: "Muhammad Zohaib Asif",
    role: "MERN Stack Developer",
    company: "SkillBridge Tech",
    rating: "4.9",
    bio: "Passionate about building scalable web apps and teaching React.",
    skills: ["React", "Node.js", "MongoDB"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Ali Raza",
    role: "Frontend Engineer",
    company: "DevSync",
    rating: "4.8",
    bio: "Specialized in creating high-performance React user interfaces.",
    skills: ["React", "Tailwind", "JavaScript"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Zainab Fatima",
    role: "React Specialist",
    company: "InnoTech",
    rating: "4.7",
    bio: "Helping students crack core React concepts and state management.",
    skills: ["React", "Redux", "Next.js", "Tailwind"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Sarah Ahmed",
    role: "Communication Coach",
    company: "GlobalSpeak",
    rating: "4.9",
    bio: "Specialized in professional English, interview prep, and corporate communication strategies.",
    skills: ["English & Communication", "Technical Writing", "Public Speaking"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 5,
    name: "Hamza Imran",
    role: "Backend Architect",
    company: "CloudCore",
    rating: "4.9",
    bio: "Expert in building microservices, REST APIs, and securing Express endpoints.",
    skills: ["Node.js", "Express", "Docker", "Cybersecurity"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 6,
    name: "Ayesha Khan",
    role: "UI/UX Designer",
    company: "StudioFigma",
    rating: "4.6",
    bio: "Designing interactive prototypes and high-fidelity wireframes for modern web apps.",
    skills: ["Figma", "UI/UX", "Tailwind"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 7,
    name: "Bilal Ahmed",
    role: "Data Scientist",
    company: "AI Labs",
    rating: "4.8",
    bio: "Specialized in Python data models, automation scripting, and clear analytics dashboards.",
    skills: ["Python", "Data Science", "Linear Algebra"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

function App() {
  // Navigation States: 'login' | 'join-free' | 'home'
  const [appStage, setAppStage] = useState('login'); 
  
  // Registration Form States (Added password)
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', password: '' });
  
  // Clean Alert Replacement Error State
  const [errorMsg, setErrorMsg] = useState('');
  
  // Dashboard Core States
  const [activeTab, setActiveTab] = useState('mentors'); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null); 
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const pureSkillsList = [
    "React Developer Track",
    "English & Communication",
    "Node.js Backend Architecture",
    "MongoDB Database Design",
    "UI/UX Design with Figma",
    "Tailwind CSS Mastering",
    "DevOps & Docker Containers",
    "Python Programming"
  ];

  // Dynamic Filtering System
  const filteredMentors = mentorsData.filter(mentor => {
    return mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
           mentor.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    const contentElement = document.getElementById('main-hub-content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSkillClick = (skillName) => {
    let keyword = skillName.split(' ')[0];
    if (skillName.includes("English")) keyword = "English";
    if (skillName.includes("UI/UX")) keyword = "UI/UX";
    if (skillName.includes("Tailwind")) keyword = "Tailwind";
    
    setSearchQuery(keyword);
    setActiveTab('mentors');
    
    setTimeout(() => {
      const contentElement = document.getElementById('main-hub-content');
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // --- SUBMIT HANDLER WITH VALIDATIONS & NO ALERTS ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Reset error matrix
    
    // 1. Email Validation Check (@ missing)
    if (!userData.email.includes('@')) {
      setErrorMsg("Please enter a valid email address containing '@'.");
      return;
    }

    // 2. Password Validation Check (less than 8 characters)
    if (userData.password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    if (userData.name && userData.email && userData.phone && userData.password) {
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (result.success) {
          console.log("Database Entry Confirmed:", result.user);
          setAppStage('join-free');
        } else {
          setErrorMsg("Database Registration Error: " + result.message);
        }
      } catch (error) {
        console.error("Connection matrix failed:", error);
        setErrorMsg("Unable to connect to the backend server (Port 5000)! Please ensure your Express server is active and running.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedMentor(null);
      setBookingSuccess(false);
    }, 2050);
  };

  // --- VIEW 1: REGISTRATION CAPTURE MODULE ---
  if (appStage === 'login') {
    return (
      <div className="w-full min-h-screen bg-[#0b1329] flex items-center justify-center p-4 antialiased text-slate-200 font-sans selection:bg-sky-500/30">
        <div className="w-full max-w-md bg-slate-800 border border-slate-700/60 p-8 rounded-[32px] shadow-2xl space-y-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-xl flex items-center justify-center text-slate-950 font-bold text-sm">S</div>
              <span className="text-lg font-bold text-slate-100 tracking-tight">Skill <span className="text-[#38bdf8]">Bridge</span></span>
            </div>
            <h2 className="text-2xl font-black text-slate-100 tracking-tight">Create Account</h2>
            <p className="text-slate-400 text-xs">Enter your details to register on our marketplace engine.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                required 
                placeholder="e.g. Muhammad Zohaib" 
                className="w-full bg-[#0b1329] border border-slate-700 rounded-xl py-3.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-sky-500 tracking-wide" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Email Address</label>
              <input 
                type="text" // Kept as text to manually test validation triggers smoothly
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required 
                placeholder="name@example.com" 
                className="w-full bg-[#0b1329] border border-slate-700 rounded-xl py-3.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-sky-500" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                required 
                placeholder="+92 300 0000000" 
                className="w-full bg-[#0b1329] border border-slate-700 rounded-xl py-3.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-sky-500" 
              />
            </div>
            
            {/* NEW PASSWORD SECTION */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Password</label>
              <input 
                type="password" 
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                required 
                placeholder="8 characters required" 
                className="w-full bg-[#0b1329] border border-slate-700 rounded-xl py-3.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-sky-500" 
              />
            </div>

            {/* INTEGRATED ERROR PANEL VALUE */}
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3.5 rounded-xl font-medium text-center leading-relaxed transition-all">
                {errorMsg}
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black py-4 rounded-xl transition-all border-0 cursor-pointer text-xs uppercase tracking-widest shadow-xl shadow-sky-500/10 mt-6"
            >
              Verify & Login &rarr;
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- VIEW 2: INTERMEDIATE SUCCESS REDIRECT VIEW ---
  if (appStage === 'join-free') {
    return (
      <div className="w-full min-h-screen bg-[#0b1329] flex items-center justify-center p-4 antialiased text-slate-200 font-sans selection:bg-sky-500/30">
        <div className="w-full max-w-xl bg-slate-800 border border-slate-700/60 p-10 rounded-[40px] shadow-2xl text-center space-y-8 relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center text-slate-950 font-bold text-2xl mx-auto shadow-lg shadow-emerald-500/20">
            ✓
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-black text-slate-100 tracking-tight">Welcome to Skill Bridge!</h2>
            <p className="text-sky-400 font-bold text-sm">Account Verified: {userData.email}</p>
            <p className="text-slate-400 text-base max-w-sm mx-auto leading-relaxed">
              Hello <span className="text-slate-100 font-bold">{userData.name}</span>, your decentralized ecosystem access profile has been compiled successfully. You are ready to join free.
            </p>
          </div>

          <div className="bg-[#0b1329]/50 border border-slate-700/40 p-4 rounded-2xl max-w-md mx-auto flex items-center justify-around text-xs text-slate-400">
            <div><span className="block text-slate-200 font-bold text-sm">Free</span> Access Tier</div>
            <div className="w-px h-8 bg-slate-700"></div>
            <div><span className="block text-slate-200 font-bold text-sm">Unlimited</span> Searches</div>
            <div className="w-px h-8 bg-slate-700"></div>
            <div><span className="block text-slate-200 font-bold text-sm">Direct</span> Booking</div>
          </div>

          <button 
            onClick={() => setAppStage('home')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-slate-100 px-10 py-4.5 rounded-2xl font-black transition-all duration-200 cursor-pointer text-sm uppercase tracking-wider shadow-xl shadow-indigo-900/50 border-0"
          >
            Access Main Dashboard Now
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW 3: CENTRAL SYSTEM APPLICATION DASHBOARD ---
  return (
    <div className="w-full min-h-screen bg-[#0b1329] flex flex-col antialiased text-slate-200 font-sans selection:bg-sky-500/30">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-[#0b1329]/95 border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Brand Identity */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-sky-500/20">
                S
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-100">
                Skill <span className="text-[#38bdf8]">Bridge</span>
              </span>
            </div>

            {/* Sliding Capsule Mechanism */}
            <div className="hidden md:flex items-center relative bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 isolate">
              <div 
                className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl transition-transform duration-300 ease-out -z-10 ${
                  activeTab === 'mentors' ? 'translate-x-full' : 'translate-x-0'
                }`}
              />

              <button 
                onClick={() => handleTabChange('explore')} 
                className={`w-36 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors duration-300 border-0 cursor-pointer ${
                  activeTab === 'explore' ? 'text-slate-950' : 'text-slate-400 hover:text-slate-200 bg-transparent'
                }`}
              >
                Explore Skills
              </button>
              
              <button 
                onClick={() => handleTabChange('mentors')} 
                className={`w-36 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors duration-300 border-0 cursor-pointer ${
                  activeTab === 'mentors' ? 'text-slate-950' : 'text-slate-400 hover:text-slate-200 bg-transparent'
                }`}
              >
                Find Mentors
              </button>
            </div>

            {/* User Profile Frame */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <span className="block text-xs font-black text-slate-200">{userData.name}</span>
                <span className="block text-[10px] text-emerald-400 font-medium">Verified Account</span>
              </div>
              <button 
                onClick={() => setAppStage('login')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide cursor-pointer transition-colors"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* --- HERO BANNER --- */}
      <header className="w-full pt-20 pb-24 border-b border-slate-800/40 bg-gradient-to-b from-[#0b1329] to-[#1c2541]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center bg-sky-500/10 border border-sky-400/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
              <span className="text-xs font-bold tracking-widest text-sky-400 uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                Global Marketplace Launch
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.15] text-slate-100">
              A Smart Market for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Every Lifestyle</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl font-medium leading-relaxed">
              Explore thousands of verified products direct from specialized stores. Fast dispatch, complete refund guarantees, and customer reviews.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => handleTabChange('explore')} className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 px-7 py-4 rounded-xl font-black transition-all duration-200 shadow-xl shadow-sky-500/10 border-0 cursor-pointer text-sm uppercase tracking-wider">
                Shop Marketplace &rarr;
              </button>
              <button onClick={() => handleTabChange('mentors')} className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 px-7 py-4 rounded-xl font-black transition-all duration-200 cursor-pointer text-sm uppercase tracking-wider">
                Register as Vendor
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-square lg:aspect-[10/9] rounded-[40px] overflow-hidden border border-slate-700/60 shadow-2xl p-2 bg-slate-800/40 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" 
                alt="Workspace Hub"
                className="w-full h-full object-cover rounded-[32px] opacity-85"
              />
            </div>
          </div>

        </div>
      </header>

      {/* --- COMPONENT MAIN SEGMENTS --- */}
      <main id="main-hub-content" className="w-full bg-[#0b1329] py-20 flex-grow scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* TAB 1: DOMAIN EXPLORATION */}
          {activeTab === 'explore' && (
            <div className="max-w-5xl mx-auto space-y-12 transition-all duration-300">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-100 tracking-tight">Structured Domain Tracks</h2>
                <p className="text-slate-500 text-sm">Select verified technology pathways without system clutter</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {pureSkillsList.map((skill, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleSkillClick(skill)}
                    className="group bg-slate-800 p-6 rounded-2xl border border-slate-700/60 hover:border-sky-500/40 hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#0b1329] border border-slate-700 flex items-center justify-center text-sky-400 font-black text-sm group-hover:bg-sky-400 group-hover:text-slate-950 transition-all duration-200">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <span className="text-slate-300 font-bold text-base group-hover:text-slate-100 transition-colors">{skill}</span>
                    </div>
                    <div className="text-slate-500 group-hover:text-sky-400 transition-colors pl-2 text-lg">
                      &rarr;
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE PEER DATASET */}
          {activeTab === 'mentors' && (
            <div className="space-y-16 transition-all duration-300">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-100 tracking-tight">Peer Experts Engine</h2>
                <p className="text-slate-500 text-sm">On-demand structural profile integrations matching filter contexts</p>
              </div>

              {/* Dynamic Filtering Frame */}
              <div className="max-w-xl mx-auto">
                <div className="relative w-full">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search mentors by name, role, or specific skill..." 
                    className="w-full bg-slate-800 border border-slate-700/80 rounded-2xl py-4.5 pl-12 pr-5 text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-2xl transition-all"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </div>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded-md border-0 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Mentors Layout Engine */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMentors.map((mentor) => (
                  <div key={mentor.id} className="bg-slate-800 rounded-[32px] border border-slate-700/60 p-7 flex flex-col justify-between shadow-2xl hover:border-sky-500/30 hover:-translate-y-1 transition-all duration-300">
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-700 shadow-md" />
                        <div className="text-left">
                          <h3 className="text-xl font-black text-slate-100 tracking-tight">{mentor.name}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {mentor.role} at <span className="text-sky-400 font-bold">{mentor.company}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="inline-flex items-center gap-1.5 bg-[#0b1329] px-2.5 py-1 rounded-lg text-amber-400 text-xs font-black mb-5 border border-slate-700/40">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        <span>{mentor.rating}</span>
                      </div>

                      <p className="text-sm text-slate-400 leading-relaxed mb-6 text-left font-medium">{mentor.bio}</p>
                    </div>

                    <div className="space-y-6 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {mentor.skills.map((skill, i) => (
                          <span key={i} className="bg-sky-500/10 text-sky-400 border border-sky-400/20 text-[11px] px-3 py-1 rounded-xl font-extrabold tracking-wide uppercase">{skill}</span>
                        ))}
                      </div>
                      <button 
                        onClick={() => setSelectedMentor(mentor)}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-slate-100 font-black py-4 rounded-xl transition-all duration-200 border-0 cursor-pointer text-xs uppercase tracking-widest shadow-lg shadow-indigo-900/40"
                      >
                        View Profile & Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredMentors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500 text-base">No active mentors found matching that query context.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* --- INFRASTRUCTURE PROCESS FLOW --- */}
      <section id="how" className="w-full bg-[#1c2541]/20 border-t border-slate-800/80 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
              How Skill Bridge Operates
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">Connect with industry specialists and level up your operational execution in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-800 border border-slate-700/60 p-8 rounded-[28px] text-left space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-black text-lg">1</div>
              <h3 className="text-lg font-black text-slate-100">Explore Categories</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Search filtered dynamic tracks matching exactly what textbook or technology stack you want to learn.</p>
            </div>

            <div className="bg-slate-800 border border-slate-700/60 p-8 rounded-[28px] text-left space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-lg">2</div>
              <h3 className="text-lg font-black text-slate-100">Select Peer Expert</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Review specialized live bios, ratings, and skills matrices to select the perfect tailored match.</p>
            </div>

            <div className="bg-slate-800 border border-slate-700/60 p-8 rounded-[28px] text-left space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-lg">3</div>
              <h3 className="text-lg font-black text-slate-100">Secure Direct Session</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Instantly request direct booking profiles with transparent schedules without complex middle layers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER FRAME --- */}
      <footer className="w-full bg-[#0b1329] border-t border-slate-800/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-500 font-medium">&copy; 2026 SkillBridge Engine Ecosystem. All rights reserved.</p>
          <div className="flex gap-6 text-xs font-semibold text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Framework</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of System</span>
          </div>
        </div>
      </footer>

      {/* --- SCHEDULING INTERACTION COMPONENT (MODAL) --- */}
      {selectedMentor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700/80 w-full max-w-md rounded-[32px] p-6 shadow-2xl space-y-6 relative text-left">
            <button onClick={() => setSelectedMentor(null)} className="absolute right-5 top-5 text-slate-400 hover:text-slate-100 bg-transparent border-0 cursor-pointer text-lg p-1">&#x2715;</button>
            
            <div className="flex items-center gap-4 border-b border-slate-700/60 pb-4">
              <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-14 h-14 rounded-full object-cover border border-slate-600" />
              <div>
                <h3 className="text-lg font-black text-slate-100">Book a Session</h3>
                <p className="text-xs text-slate-400">With <span className="text-sky-400 font-bold">{selectedMentor.name}</span></p>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl p-4 text-center text-sm font-bold animate-pulse">✓ Booking Request Submitted Successfully!</div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-400">Select Date Context</label>
                  <input type="date" required className="w-full bg-[#0b1329] border border-slate-700 rounded-xl py-3 px-4 text-sm text-slate-100 focus:outline-none focus:border-sky-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-400">Preferred Time Slot</label>
                  <select required className="w-full bg-[#0b1329] border border-slate-700 rounded-xl py-3 px-4 text-sm text-slate-100 focus:outline-none focus:border-sky-500">
                    <option value="morning">Morning (10:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (02:00 PM - 04:00 PM)</option>
                    <option value="evening">Evening (06:00 PM - 08:00 PM)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-400">Core Goal / Topic Focus</label>
                  <textarea required rows="2" placeholder="Describe what structural concepts you want to analyze..." className="w-full bg-[#0b1329] border border-slate-700 rounded-xl py-3 px-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-sky-500 resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-100 font-black py-4 rounded-xl transition-all border-0 cursor-pointer text-xs uppercase tracking-widest shadow-md">Confirm & Request Session</button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;