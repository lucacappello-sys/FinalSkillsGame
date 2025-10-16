/**
 * Welcome Screen Component
 * 
 * The initial landing screen that introduces the Operator Skills Game.
 * Explains the purpose and invites users to start the assessment.
 */

interface WelcomeScreenProps {
  onStart: () => void; // Callback to navigate to role selection screen
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="size-full flex items-center justify-center p-4 bg-white overflow-hidden">
      <div className="bg-[rgb(212,235,247)] rounded-3xl p-12 max-w-2xl w-full text-center">
        <h1 className="text-[rgb(35,47,102)] mb-6 text-[30px] font-bold">Operator Skills Game</h1>
        
        <p className="text-[#2C3E50] mb-4 text-[20px]">
          Are you curious to learn more about the impact of Industry 5.0 technologies on people?
        </p>
        
        <p className="text-[#2C3E50] mb-4 text-[20px]">
          The role of humans will evolve, and new skills will be required.
        </p>
        
        <p className="text-[#2C3E50] mb-8 text-[20px]">
          Press Start and discover how much you know about this topic.
        </p>
        
        <button
          onClick={onStart}
          className="bg-[#2E5A9E] hover:bg-[#234780] text-white px-12 py-3 rounded-full uppercase tracking-wider transition-colors"
        >
          START
        </button>
      </div>
    </div>
  );
}
