import { Home, ChevronLeft, ChevronRight } from 'lucide-react';
import sector1Img from '../assets/images/Food.png';
import sector2Img from '../assets/images/Automotive.png';
import sector3Img from '../assets/images/Logistic.png';

interface SectorScreenProps {
  selectedSector: number | null;
  onSelectSector: (sector: number) => void;
  onContinue: () => void;
  onHome: () => void;
  onBack: () => void;
}

const sectors = [
  {
    id: 1,
    label: 'Sector 1',
    title: 'FOOD SECTOR',
    description: 'In the food sector, products are received directly from the field in various-sized boxes and bins. These items need to be sorted gently based on dimensions, and then packed to meet market requirements. The new Industry 5.0 technologies enable automated sorting and packing by using new gripping concepts, increasing efficiency and ensuring product quality.',
    color: 'bg-[#A7A8D4]',
    illustration: sector1Img
  },
  {
    id: 2,
    label: 'Sector 2',
    title: 'AUTOMOTIVE SECTOR',
    description: 'In the automotive sector, common activities include order preparation for part delivery, kitting, and assembly. Robotics technologies aim to enhance productivity by performing tasks like sorting, identifying, and packing parts for shipment, while also reducing errors.',
    color: 'bg-[#8182B6]',
    illustration: sector2Img
  },
  {
    id: 3,
    label: 'Sector 3',
    title: 'LOGISTIC SECTOR',
    description: 'The logistics sector deals with a challenging variety of products. The new Industry 5.0 technologies aim at streamlining the order preparation process and stock management by using AI-enhanced robots, capable of handling diverse product characteristics. ',
    color: 'bg-[#6563AA]',
    illustration: sector3Img
  }
];

export default function SectorScreen({ selectedSector, onSelectSector, onContinue, onHome, onBack }: SectorScreenProps) {
  return (
    <div className="size-full flex flex-col">
      <div className="bg-[#D8DCE6] px-[29px] py-[5px] py-[9px] px-[24px]">
        <h2 className="text-[rgb(0,0,0)] text-center font-bald">Choose the sector:</h2>
        <p className="text-[rgb(0,0,0)] text-center mt-1">Select the industry sector you want to refer to.</p>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4 bg-white overflow-hidden">
        <div className="flex gap-6 max-w-6xl">
          {sectors.map((sector) => (
            <div
              key={sector.id}
              onClick={() => onSelectSector(sector.id)}
              className={`${sector.color} rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 ${
                selectedSector === sector.id ? 'ring-4 ring-white shadow-2xl' : 'shadow-lg'
              } flex-1`}
            >
              <div className="text-white text-sm mb-2">{sector.label}</div>
              <div className="bg-[#2C3E50] rounded-xl p-0 mb-2 h-30 flex items-center justify-center overflow-hidden">
                <img src={sector.illustration} alt={sector.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-white text-center mb-3">{sector.title}</h3>
              <p className="text-white text-xs leading-relaxed">{sector.description}</p>
            </div>
          ))}
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
                index === 1 ? 'w-8 bg-[#5DADE2]' : 'w-2 bg-[#D8DCE6]'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={onContinue}
          disabled={selectedSector === null}
          className="bg-[#2E5A9E] hover:bg-[#234780] disabled:bg-[#B8BCC9] text-white px-6 py-3 rounded-full transition-colors flex items-center gap-2 px-[22px] py-[9px]"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
