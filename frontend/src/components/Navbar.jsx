import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Custom function to force dynamic smooth scroll directly to the ID element
  const scrollToSection = (id) => {
    setIsOpen(false); // Mobile menu close if open
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <BookOpen size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              SkillBridge
            </span>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden sm:ml-8 sm:flex sm:space-x-8 items-center">
            <button 
              onClick={() => scrollToSection('find-mentors')} 
              className="text-gray-500 hover:text-indigo-600 px-1 pt-1 text-sm font-medium transition cursor-pointer bg-transparent border-0"
            >
              Explore Skills
            </button>
            <button 
              onClick={() => scrollToSection('find-mentors')} 
              className="text-gray-500 hover:text-indigo-600 px-1 pt-1 text-sm font-medium transition cursor-pointer bg-transparent border-0"
            >
              Find Mentors
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-gray-500 hover:text-indigo-600 px-1 pt-1 text-sm font-medium transition cursor-pointer bg-transparent border-0"
            >
              How It Works
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:gap-4">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition cursor-pointer">
              Sign In
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm hover:shadow cursor-pointer">
              Join for Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <button 
              onClick={() => scrollToSection('find-mentors')}
              className="w-full text-left block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg cursor-pointer"
            >
              Explore Skills
            </button>
            <button 
              onClick={() => scrollToSection('find-mentors')}
              className="w-full text-left block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg cursor-pointer"
            >
              Find Mentors
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="w-full text-left block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg cursor-pointer"
            >
              How It Works
            </button>
            <div className="pt-4 pb-2 border-t border-gray-100 flex flex-col gap-2">
              <button className="w-full text-center py-2 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                Sign In
              </button>
              <button className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-base font-medium transition cursor-pointer">
                Join for Free
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}