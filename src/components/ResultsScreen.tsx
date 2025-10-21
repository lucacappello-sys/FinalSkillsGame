/**
 * Results Screen Component
 * 
 * Displays the assessment results with scores for each skill category.
 * Shows the selected role and sector cards along with color-coded progress bars.
 * Green (≥75%), Yellow (50-74%), Red (<50%) indicate performance levels.
 */

import { Home, ChevronLeft } from 'lucide-react';
import role1Img from '../assets/images/Smart operator.png';
import role2Img from '../assets/images/Plant.png';
import role3Img from '../assets/images/Tech.png';
import sector1Img from '../assets/images/Food.png';
import sector2Img from '../assets/images/Automotive.png';
import sector3Img from '../assets/images/Logistic.png';


interface ResultsScreenProps {
  selectedRole: number | null;         // User's selected role
  selectedSector: number | null;       // User's selected sector
  scores: {                            // Scores for each skill category (0-100)
    technical: number;
    operational: number;
    analytical: number;
    collaboration: number;
    management: number;
    personal: number;
    interaction: number;
  };
  finalScore: number;                  // Overall average score
  onHome: () => void;                  // Return to welcome screen
  onBack: () => void;                  // Go back to loading screen
  onSave: () => void;                  // Proceed to user info form
}

const roles = [
  {
    id: 1,
    title: 'SMART LINE OPERATOR',
    color: 'bg-[#5DADE2]',
    label: 'Role 1',
    illustration: role1Img
  },
  {
    id: 2,
    title: 'PLANT FLOW-KEEPER',
    color: 'bg-[#E59866]',
    label: 'Role 2',
    illustration: role2Img
  },
  {
    id: 3,
    title: 'TECH SOLVER',
    color: 'bg-[#4A6FA5]',
    label: 'Role 3',
    illustration: role3Img
  }
];

const sectors = [
  {
    id: 1,
    title: 'FOOD SECTOR',
    color: 'bg-[#9B9EC4]',
    label: 'Sector 1',
    illustration: sector1Img
  },
  {
    id: 2,
    title: 'AUTOMOTIVE SECTOR',
    color: 'bg-[#9B9EC4]',
    label: 'Sector 2',
    illustration: sector2Img
  },
  {
    id: 3,
    title: 'LOGISTIC SECTOR',
    color: 'bg-[#9B9EC4]',
    label: 'Sector 3',
    illustration: sector3Img
  }
];

/**
 * Helper function to determine progress bar color based on score
 * @param score - The score value (0-100)
 * @returns Tailwind class for the appropriate color
 */
const getBarColor = (score: number) => {
  if (score >= 75) return 'bg-[#5AC18E]';  // Green for high scores
  if (score >= 50) return 'bg-[#E5B84B]';  // Yellow for medium scores
  return 'bg-[#E57373]';                    // Red for low scores
};

export default function ResultsScreen({ selectedRole, selectedSector, scores, finalScore, onHome, onBack, onSave }: ResultsScreenProps) {
  // Find the full role and sector objects for display
  const role = roles.find(r => r.id === selectedRole);
  const sector = sectors.find(s => s.id === selectedSector);

  return (
    <div className="size-full flex flex-col ">
      <div className="bg-[#D8DCE6] px-[29px] py-[5px] py-[9px] px-[24px]">
        <h2 className="text-[#2C3E50] text-center">Your results:</h2>
      </div>
      
      <div className="flex-1 overflow-hidden p-4 bg-white ">
        <div className="max-w-6xl mx-auto flex gap-8">
          {/* Left side - Cards and Final Score */}
          <div className="flex-align  flex-col gap-2 w-[66%] ">
            <div className="flex gap-2">
        {/* Role Card */}
        {role && (
          <div className={`${role.color} rounded-2xl p-6 shadow-lg flex-1`}> 
            <div className="text-white text-sm mb-3">{role.label}</div>
            <div className="bg-white rounded-xl p-0 mb-4 h-40 flex items-center justify-center overflow-hidden">
              <img src={role.illustration} alt={role.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-white text-center">{role.title}</h3>
          </div>
        )}
        
        {/* Sector Card */}
        {sector && (
          <div className={`${sector.color} rounded-2xl p-6 shadow-lg flex-1`}>
            {/* Aggiunto flex-1 per distribuire lo spazio equamente */}
            <div className="text-white text-sm mb-3">{sector.label}</div>
            <div className="bg-[#2C3E50] rounded-xl p-0 mb-4 h-40 flex items-center justify-center overflow-hidden">
              <img src={sector.illustration} alt={sector.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-white text-center">{sector.title}</h3>
          </div>
        )}
      </div>
      {/* FINE NUOVO CONTAINER ORIZZONTALE */}
      
      {/* Final Score (che deve rimanere sotto le due card) */}
        <div className="bg-[#D4F1E8] border-4 border-[#4FB286] rounded-2xl p-6 text-center">
          <p className="text-[#2C3E50]">
            <span>Final Score: </span>
            <span>{finalScore}% Correct Answers</span>
          </p>
        </div>
      </div>
          {/* Right side - Skill Scores */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Technical Skills */}
            <div>
              <div className="text-[#2C3E50] mb-2">Technical Skills:</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#D8DCE6] rounded-full h-6 overflow-hidden">
                  <div 
                    className={`h-full ${getBarColor(scores.technical)} transition-all duration-500`}
                    style={{ width: `${scores.technical}%` }}
                  />
                </div>
                <span className="text-[#2C3E50] w-12 text-right">{scores.technical}%</span>
              </div>
            </div>
            
            {/* Operational Skills */}
            <div>
              <div className="text-[#2C3E50] mb-2">Operational Skills:</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#D8DCE6] rounded-full h-6 overflow-hidden">
                  <div 
                    className={`h-full ${getBarColor(scores.operational)} transition-all duration-500`}
                    style={{ width: `${scores.operational}%` }}
                  />
                </div>
                <span className="text-[#2C3E50] w-12 text-right">{scores.operational}%</span>
              </div>
            </div>
            
            {/* Analytical Skills */}
            <div>
              <div className="text-[#2C3E50] mb-2">Analytical Skills:</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#D8DCE6] rounded-full h-6 overflow-hidden">
                  <div 
                    className={`h-full ${getBarColor(scores.analytical)} transition-all duration-500`}
                    style={{ width: `${scores.analytical}%` }}
                  />
                </div>
                <span className="text-[#2C3E50] w-12 text-right">{scores.analytical}%</span>
              </div>
            </div>
            
            {/* Collaboration and Communication Skills */}
            <div>
              <div className="text-[#2C3E50] mb-2">Collaboration and Communication Skills:</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#D8DCE6] rounded-full h-6 overflow-hidden">
                  <div 
                    className={`h-full ${getBarColor(scores.collaboration)} transition-all duration-500`}
                    style={{ width: `${scores.collaboration}%` }}
                  />
                </div>
                <span className="text-[#2C3E50] w-12 text-right">{scores.collaboration}%</span>
              </div>
            </div>
            
            {/* Management Skills */}
            <div>
              <div className="text-[#2C3E50] mb-2">Management Skills:</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#D8DCE6] rounded-full h-6 overflow-hidden">
                  <div 
                    className={`h-full ${getBarColor(scores.management)} transition-all duration-500`}
                    style={{ width: `${scores.management}%` }}
                  />
                </div>
                <span className="text-[#2C3E50] w-12 text-right">{scores.management}%</span>
              </div>
            </div>
            
            {/* Personal/Soft Skills */}
            <div>
              <div className="text-[#2C3E50] mb-2">Personal/Soft Skills:</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#D8DCE6] rounded-full h-6 overflow-hidden">
                  <div 
                    className={`h-full ${getBarColor(scores.personal)} transition-all duration-500`}
                    style={{ width: `${scores.personal}%` }}
                  />
                </div>
                <span className="text-[#2C3E50] w-12 text-right">{scores.personal}%</span>
              </div>
            </div>
            
            {/* Interaction UX Skills */}
            <div>
              <div className="text-[#2C3E50] mb-2">Interaction UX Skills:</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#D8DCE6] rounded-full h-6 overflow-hidden">
                  <div 
                    className={`h-full ${getBarColor(scores.interaction)} transition-all duration-500`}
                    style={{ width: `${scores.interaction}%` }}
                  />
                </div>
                <span className="text-[#2C3E50] w-12 text-right">{scores.interaction}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[rgb(234,239,246)] py-4 px-8 flex items-center justify-between px-[32px] py-[9px]">
        <div className="flex items-center gap-4">
          <button
            onClick={onHome}
            className="bg-[#B8BCC9] hover:bg-[#A0A5B3] text-white p-3 rounded-full transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={onSave}
          className="bg-[#6B7CCC] hover:bg-[#5A6BB5] text-white px-8 py-3 rounded-full transition-colors px-[22px] py-[9px]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
