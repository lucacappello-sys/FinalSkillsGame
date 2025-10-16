/**
 * Review Screen Component
 * 
 * Displays the user's selected role and sector cards before starting the skills assessment.
 * Allows users to review their choices and either proceed to the game or go back to change selections.
 */

import { Home, ChevronLeft, ChevronRight } from 'lucide-react';
import role1Img from '../assets/images/Smart operator.png';
import role2Img from '../assets/images/Plant.png';
import role3Img from '../assets/images/Tech.png';
import sector1Img from '../assets/images/Food.png';
import sector2Img from '../assets/images/Automotive.png';
import sector3Img from '../assets/images/Logistic.png';

interface ReviewScreenProps {
  selectedRole: number | null;      // ID of the selected role
  selectedSector: number | null;    // ID of the selected sector
  onContinue: () => void;           // Proceed to skills assessment
  onHome: () => void;               // Return to welcome screen
  onBack: () => void;               // Go back to sector selection
}

// Role data with descriptions and styling
const roles = [
 {
    id: 1,
    label: 'Role 1',
    title: 'SMART LINE OPERATOR',
    description: 'Works with collaborative robots which supervises their operations, and performs basic (repetitive) work or robots but requires most manual and repetitive tasks, this role requires broader skills than before, especially technical, analytical, and collaboration skills.',
    color: 'bg-[#5DADE2]',
    illustration: role1Img
  },
  {
    id: 2,
    label: 'Role 2',
    title: 'PLANT FLOW-KEEPER',
    description: 'Manages production flows in smart factories and supervises production flows, supports and alerts and robots and ensures process efficiency. This role combines strong management, technical, operational, and analytical skills to plan activities, resolve medium level issues, and maintain smooth and safe production operations.',
    color: 'bg-[#E59866]',
    illustration: role2Img
  },
  {
    id: 3,
    label: 'Role 3',
    title: 'TECH SOLVER',
    description: 'Acts as key role in designing, programming robots, configuring systems to optimise production processes, performing maintenance, and solving technical issues. Requires strong technical skills and advanced programming codes and solid analytical skills.',
    color: 'bg-[#4A6FA5]',
    illustration: role3Img
  }
];

const sectors = [
  {
    id: 1,
    label: 'Sector 1',
    title: 'FOOD SECTOR',
    description: 'In the agrifood sector, products are sourced directly from the field in various sized boxes and bins. These items need to be sorted gently based on dimensions, and then packed to meet market requirements. The new Industry 5.0 technologies enable automated sorting and packing by using new gripping concepts, increasing efficiency and ensuring product quality.',
    color: 'bg-[#A7A8D4]',
    illustration: sector1Img
  },
  {
    id: 2,
    label: 'Sector 2',
    title: 'AUTOMOTIVE SECTOR',
    description: 'In the automotive sector, complex assemblies include order preparation for part delivery, kitting, and assembly. Robotics technologies aim to enhance productivity by performing tasks like sorting, identifying, and packing parts for shipment, while also reducing errors.',
    color: 'bg-[#8182B6]',
    illustration: sector2Img
  },
  {
    id: 3,
    label: 'Sector 3',
    title: 'LOGISTIC SECTOR',
    description: 'The logistic sector deals with a challenging variety of products. The new Industry 5.0 technologies aim at streamlining the order preparation process and stock management by using AI-enhanced cameras, capable of handling diverse product characteristics.',
    color: 'bg-[#6563AA]',
    illustration: sector3Img
  }
];

export default function ReviewScreen({ selectedRole, selectedSector, onContinue, onHome, onBack }: ReviewScreenProps) {
  const role = roles.find(r => r.id === selectedRole);
  const sector = sectors.find(s => s.id === selectedSector);

  return (
    <div className="size-full flex flex-col">
      <div className="bg-[#D8DCE6] px-[29px] py-[5px] py-[9px] px-[24px]">
        <h2 className="text-[rgb(0,0,0)] text-center font-bald">Review your choices:</h2>
        <p className="text-[rgb(0,0,0)] text-center mt-1">Review your selections before starting the game</p>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4 bg-white overflow-hidden">
        <div className="flex gap-6 max-w-4xl">
          {role && (
            <div className={`${role.color} rounded-2xl p-6 shadow-lg flex-1 min-h-[520px] max-w-sm`}>
              <div className="text-white text-sm mb-2">{role.label}</div>
              <div className="bg-white rounded-xl p-0 mb-4 h-25 flex items-center justify-center overflow-hidden">
               <img src={role.illustration} alt={role.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-white text-center mb-3">{role.title}</h3>
              <p className="text-white text-xs leading-relaxed">{role.description}</p>
            </div>
          )}
          
          {sector && (
            <div className={`${sector.color} rounded-2xl p-6 shadow-lg flex-1`}>
              <div className="text-white text-sm mb-2">{sector.label}</div>
              <div className="bg-[#2C3E50] rounded-xl p-0 mb-4 h-25 flex items-center justify-center overflow-hidden">
                <img src={sector.illustration} alt={sector.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-white text-center mb-3">{sector.title}</h3>
              <p className="text-white text-xs leading-relaxed">{sector.description}</p>
            </div>
          )}
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot, index) => (
            <div
              key={dot}
              className={`h-2 rounded-full ${
                index === 2 ? 'w-8 bg-[#5DADE2]' : 'w-2 bg-[#D8DCE6]'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={onContinue}
          className="bg-[#6B7CCC] hover:bg-[#5A6BB5] text-white px-6 py-3 rounded-full transition-colors flex items-center gap-2 px-[22px] py-[9px]"
        >
          Start game
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
