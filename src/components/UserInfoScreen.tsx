/**
 * User Info Screen Component
 * 
 * Final screen that collects demographic information from the user.
 * This data can be used for analytics and research purposes.
 * All fields are required before submission.
 */

import { useState } from 'react';

interface UserInfoScreenProps {
  onSave: (data: { jobTitle: string; industry: string; country: string }) => void; // Callback with user info
}

export default function UserInfoScreen({ onSave }: UserInfoScreenProps) {
  // Form field states
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('');

  // Handle form submission - validates required fields and passes data to parent
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ jobTitle, industry, country });
  };

  return (
    <div className="size-full flex items-center justify-center bg-white p-4 overflow-hidden">
      <div className="bg-[#E1EBF5] rounded-3xl p-12 max-w-lg w-full">
        <h2 className="text-[#2C3E50] text-center mb-8">Tell us about you!</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-[#2C3E50] block mb-2">
              Job title / Role <span className="text-[#E57373]">*</span>
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Input"
              required
              className="w-full px-4 py-2 rounded-lg border border-[#B8BCC9] bg-white text-[#2C3E50] placeholder:text-[#B8BCC9] focus:outline-none focus:ring-2 focus:ring-[#5DADE2]"
            />
          </div>
          
          <div>
            <label className="text-[#2C3E50] block mb-2">
              Industry / Sector <span className="text-[#E57373]">*</span>
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Input"
              required
              className="w-full px-4 py-2 rounded-lg border border-[#B8BCC9] bg-white text-[#2C3E50] placeholder:text-[#B8BCC9] focus:outline-none focus:ring-2 focus:ring-[#5DADE2]"
            />
          </div>
          
          <div>
            <label className="text-[#2C3E50] block mb-2">
              Country in which you work <span className="text-[#E57373]">*</span>
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Input"
              required
              className="w-full px-4 py-2 rounded-lg border border-[#B8BCC9] bg-white text-[#2C3E50] placeholder:text-[#B8BCC9] focus:outline-none focus:ring-2 focus:ring-[#5DADE2]"
            />
          </div>
          
          <button
            type="submit"
            className="bg-[#2E5A9E] hover:bg-[#234780] text-white px-12 py-3 rounded-full transition-colors self-center mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
