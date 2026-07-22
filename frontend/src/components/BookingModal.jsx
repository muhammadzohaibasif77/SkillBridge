import React, { useState } from 'react';

const BookingModal = ({ mentor, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Live env variable se URL uthayega, warna fallback localhost
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mentorId: mentor._id || mentor.id,
          mentorName: mentor.name,
          date,
          time,
          note,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit booking");
      }

      alert(`Booking Request Sent to ${mentor.name} for ${date} at ${time}!`);
      onClose(); // Close modal on success
    } catch (err) {
      console.error("Booking Error:", err);
      setError(err.message || "Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
        >
          ✕
        </button>

        {/* Mentor Info Header */}
        <div className="text-center mb-6">
          <img 
            src={mentor.image} 
            alt={mentor.name} 
            className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-indigo-50 mb-3"
          />
          <h2 className="text-xl font-bold text-gray-800">Book a Session</h2>
          <p className="text-sm text-gray-500">with <span className="font-semibold text-indigo-600">{mentor.name}</span></p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Select Date</label>
            <input 
              type="date" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Select Time Slot</label>
            <input 
              type="time" 
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Message / Topic of Discussion</label>
            <textarea 
              rows="3" 
              placeholder="E.g., I need help reviewing my MERN stack API routes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-colors duration-200 cursor-pointer shadow-md shadow-indigo-100 disabled:opacity-50"
          >
            {loading ? "Sending Request..." : "Confirm Booking Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;