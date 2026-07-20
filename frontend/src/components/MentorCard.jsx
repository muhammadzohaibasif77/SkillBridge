import React from 'react';

const MentorCard = ({ mentor, onBookClick }) => {
  const { name, role, company, skills, rating, image, bio } = mentor;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 p-6 flex flex-col justify-between h-full">
      <div>
        {/* Top Section: Avatar & Info */}
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={image || "https://via.placeholder.com/150"} 
            alt={name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600"
          />
          <div>
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{role} at <span className="text-indigo-600 font-medium">{company}</span></p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-sm font-semibold text-gray-700">{rating}</span>
        </div>

        {/* Bio */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {bio}
        </p>

        {/* Skills Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2.5 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button - Dynamic click call handle */}
      <button 
        onClick={() => {
    console.log("Clicked mentor object:", mentor);
    onBookClick();
  }}
  className="w-full bg-indigo-600 text-white py-2.5 rounded-xl cursor-pointer"
>
  View Profile & Book
      </button>
    </div>
  );
};

export default MentorCard;