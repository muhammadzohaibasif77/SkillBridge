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
    name: "Hamza Imran",
    role: "Backend Architect",
    company: "CloudCore",
    rating: "4.9",
    bio: "Expert in building microservices, REST APIs, and securing Express endpoints.",
    skills: ["Node.js", "Express", "Docker", "Cybersecurity"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 5,
    name: "Ayesha Khan",
    role: "UI/UX Designer",
    company: "StudioFigma",
    rating: "4.6",
    bio: "Designing interactive prototypes and high-fidelity wireframes for modern web apps.",
    skills: ["Figma", "UI/UX", "Tailwind"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 6,
    name: "Bilal Ahmed",
    role: "Data Scientist",
    company: "AI Labs",
    rating: "4.8",
    bio: "Specialized in Python data models, automation scripting, and clear analytics dashboards.",
    skills: ["Python", "Data Science", "Linear Algebra"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

function Explore({ selectedCategory, setSelectedCategory }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMentors = mentorsData.filter(mentor => {
    return mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
           mentor.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="w-full bg-transparent space-y-12">
      
      {/* Search Input styled with Dark Grey (bg-slate-800) */}
      <div className="max-w-xl mx-auto">
        <div className="relative w-full">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mentors by name, role, or specific skill..." 
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-12 pr-5 text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-xl transition-all"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Cards Grid styled completely with Dark Grey (bg-slate-800) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div key={mentor.id} className="bg-slate-800 rounded-[32px] border border-slate-700/60 p-6 flex flex-col justify-between shadow-2xl hover:border-sky-500/40 transition-all duration-300">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-700" />
                <div className="text-left">
                  <h3 className="text-xl font-black text-slate-100">{mentor.name}</h3>
                  <p className="text-sm text-slate-400">{mentor.role} at <span className="text-sky-400 font-semibold">{mentor.company}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400 text-sm font-bold mb-4">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span>{mentor.rating}</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 text-left">{mentor.bio}</p>
            </div>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((skill, i) => (
                  <span key={i} className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs px-3 py-1.5 rounded-xl font-bold">{skill}</span>
                ))}
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-slate-100 font-bold py-3.5 rounded-xl transition border-0 cursor-pointer text-sm">
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
  );
}

export default Explore;