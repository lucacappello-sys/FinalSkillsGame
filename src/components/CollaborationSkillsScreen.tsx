/**
 * Collaboration and Communication Skills Screen Component
 * 
 * Allows users to select relevant collaboration and communication skills.
 * These skills are essential for working in team-based Industry 5.0 environments.
 * Part of the multi-step skills assessment process.
 */

import { Home, ChevronLeft, ChevronRight } from 'lucide-react';

interface CollaborationSkillsScreenProps {
  selectedRole: number | null;
  selectedSector: number | null;
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  onContinue: () => void;
  onHome: () => void;
  onBack: () => void;
}

const roles = [
  { id: 1, title: 'SMART LINE OPERATOR' },
  { id: 2, title: 'PLANT FLOW-KEEPER' },
  { id: 3, title: 'TECH SOLVER' }
];

const sectors = [
  { id: 1, title: 'FOOD SECTOR' },
  { id: 2, title: 'AUTOMOTIVE SECTOR' },
  { id: 3, title: 'LOGISTIC SECTOR' }
];

const collaborationSkills = [
  'Quality assessment',
  'Use of the Robot controller',
  'Setting up the robot',
  'Digital systems usage',
  'Machine/Robot maintenance',
  'Turning on machines/robot',
  'Data processing',
  'Know how to interact with robots',
  'Technical inspection'
];

export default function CollaborationSkillsScreen({ selectedRole, selectedSector, selectedSkills, onSkillsChange, onContinue, onHome, onBack }: CollaborationSkillsScreenProps) {
  const role = roles.find(r => r.id === selectedRole);
  const sector = sectors.find(s => s.id === selectedSector);
  
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter(s => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  return (
    <div className="size-full flex flex-col">
      <div className="bg-[#D8DCE6] px-[29px] py-[24px] py-[9px] px-[24px]">
        <h2 className="text-[rgb(0,0,4)] text-center text-[30px] font-bold">Select skills:</h2>
        <p className="text-[#2C3E50] text-center mt-1 text-[15px]">
          Choose the skills that, in your opinion, allow {role?.title || '[roles]'} to work in {sector?.title || '[scenario]'}.
        </p>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden bg-[rgb(255,255,255)]">
        <div className="max-w-4xl w-full">
          <h3 className="text-[rgb(0,0,4)] text-center mb-4 text-[20px] font-bold">Collaboration and Communication skills</h3>
          
          <div className="bg-[rgb(226,228,230)] rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              {collaborationSkills.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                    className="w-4 h-4 rounded border-2 border-[#B8BCC9] text-white focus:ring-2 focus:ring-[#5DADE2] focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-[#2C3E50] group-hover:text-[#5DADE2] transition-colors">
                    {skill}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[rgb(234,239,246)] py-6 px-8 flex items-center justify-between px-[32px] py-[9px]">
        <div className="flex items-center gap-4">
          <button
            onClick={onHome}
            className="bg-[#B8BCC9] hover:bg-[#A0A5B3] text-white p-3 rounded-full transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            onClick={onBack}
            className="bg-white rounded-full px-6 py-3 text-[#2E5A9E] hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm px-[22px] py-[9px]"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        </div>
        
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((dot, index) => (
            <div
              key={dot}
              className={`h-2 rounded-full ${
                index === 6 ? 'w-8 bg-[#5DADE2]' : 'w-2 bg-[#D8DCE6]'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={onContinue}
          className="bg-[#2E5A9E] hover:bg-[#234780] text-white px-6 py-3 rounded-full transition-colors flex items-center gap-2 px-[22px] py-[9px]"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
