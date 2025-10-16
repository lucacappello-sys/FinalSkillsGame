import { Home, ChevronRight } from 'lucide-react';

import role1Img from '../assets/images/Smart operator.png';
import role2Img from '../assets/images/Plant.png';
import role3Img from '../assets/images/Tech.png';

interface RoleScreenProps {
  selectedRole: number | null;
  onSelectRole: (role: number) => void;
  onContinue: () => void;
  onHome: () => void;
}

const roles = [
  {
    id: 1,
    label: 'Role 1',
    title: 'SMART LINE OPERATOR',
    description: 'Works alongside robots in shared areas, supervises their operations, and performs basic troubleshooting. As robots handle the most manual and repetitive tasks, ...',
    color: 'bg-[#5DADE2]',
    illustration: role1Img
  },
  {
    id: 2,
    label: 'Role 2',
    title: 'PLANT FLOW-KEEPER',
    description: 'Manages and coordinates the team and work area, supervises production flows, supports operators and robots and ensures process efficiency. The role combines strong management, technical, operational, and analytical skills ...',
    color: 'bg-[#E59866]',
    illustration: role2Img
  },
  {
    id: 3,
    label: 'Role 3',
    title: 'TECH SOLVER',
    description: 'Acts as the reference for programming robots, configuring systems to optimise production processes, performing maintenance, and solving technical issues... ',
    color: 'bg-[#4A6FA5]',
    illustration: role3Img
  }
];

export default function RoleScreen({ selectedRole, onSelectRole, onContinue, onHome }: RoleScreenProps) {
  return (
    <div className="size-full flex flex-col ">
      <div className="bg-[#D8DCE6] px-[29px] py-[5px] py-[9px] px-[24px]">
        <h2 className="text-[rgb(0,0,0)] text-center font-bald">Choose the role:</h2>
        <p className="text-[rgb(0,0,0)] text-center mt-1">Select the role you want to analyse.</p>
      </div>
      
     <div className="flex-1 flex items-center justify-center p-4 bg-white overflow-hidden">
        <div className="flex gap-6 max-w-6xl">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`${role.color} rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 ${
                selectedRole === role.id ? 'ring-4 ring-gray shadow-2xl' : 'shadow-lg'
              } flex-1`}
            >
              <div className="text-white text-sm mb-2">{role.label}</div>
              <div className="bg-white rounded-xl p-0 mb-2 h-25 flex items-center justify-center overflow-hidden">
                <img src={role.illustration} alt={role.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-white text-center mb-3">{role.title}</h3>
              <p className="text-white text-xs leading-relaxed text-left">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-[rgb(234,239,246)] flex items-center justify-between px-[32px] py-[9px]">
        <button
          onClick={onHome}
          className="bg-[#B8BCC9] hover:bg-[#A0A5B3] text-white p-3 rounded-full transition-colors"
        >
          <Home className="w-5 h-5" />
        </button>
        
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot, index) => (
            <div
              key={dot}
              className={`h-2 rounded-full ${
                index === 0 ? 'w-8 bg-[#5DADE2]' : 'w-2 bg-[#D8DCE6]'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={onContinue}
          disabled={selectedRole === null}
          className="bg-[#2E5A9E] hover:bg-[#234780] disabled:bg-[#B8BCC9] text-white px-6 py-3 rounded-full transition-colors flex items-center gap-2 px-[22px] py-[9px]"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
