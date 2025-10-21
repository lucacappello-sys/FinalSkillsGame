/**
 * Operator Skills Game - Main Application Component
 * 
 * An interactive educational game about Industry 5.0 technologies and their impact on operator skills.
 * Users select a role and sector, then choose skills across multiple categories to test their knowledge.
 */

import { useState } from 'react';
import { supabase } from './supabaseClient';
import { CORRECT_SKILLS_DATA, getSkillCategory } from './data/quizData';
import { simpleCanon, getCorrectSkillsForContext } from './data/dataUtils';
import WelcomeScreen from './components/WelcomeScreen';
import RoleScreen from './components/RoleScreen';
import SectorScreen from './components/SectorScreen';
import ReviewScreen from './components/ReviewScreen';
import TechnicalSkillsScreen from './components/TechnicalSkillsScreen';
import OperationalSkillsScreen from './components/OperationalSkillsScreen';
import AnalyticalSkillsScreen from './components/AnalyticalSkillsScreen';
import CollaborationSkillsScreen from './components/CollaborationSkillsScreen';
import ManagementSkillsScreen from './components/ManagementSkillsScreen';
import PersonalSkillsScreen from './components/PersonalSkillsScreen';
import InteractionSkillsScreen from './components/InteractionSkillsScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import UserInfoScreen from './components/UserInfoScreen';


// Type definition for all possible screens in the application flow
type Screen = 'welcome' | 'role' | 'sector' | 'review' | 'technical' | 'operational' | 'analytical' | 'collaboration' | 'management' | 'personal' | 'interaction' | 'loading' | 'results' | 'userinfo';

// --- Data Definitions (to map IDs to titles for the DB and Quiz Data) ---
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

// Helper function to format the final score string as your database expects
const formatFinalScoreText = (score: number) => `Final score: ${score}% correct answers`;

export default function App() {
  // Current screen state - controls which screen is displayed
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [sessionId, setSessionId] = useState<number | null>(null);
  // User selections state
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  
  // Skills selections for each category
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [operationalSkills, setOperationalSkills] = useState<string[]>([]);
  const [analyticalSkills, setAnalyticalSkills] = useState<string[]>([]);
  const [collaborationSkills, setCollaborationSkills] = useState<string[]>([]);
  const [managementSkills, setManagementSkills] = useState<string[]>([]);
  const [personalSkills, setPersonalSkills] = useState<string[]>([]);
  const [interactionSkills, setInteractionSkills] = useState<string[]>([]);

  // --- Skill Categories Mapping for easy data processing ---
  const allSelectedSkills = {
    "Personal/Soft": personalSkills,
    "Management": managementSkills,
    "Collab/Comm": collaborationSkills,
    "Interaction/UX": interactionSkills,
    "Analytical": analyticalSkills,
    "Operational": operationalSkills,
    "Technical": technicalSkills,
  };
  /**
   * Navigation Handlers - Control the flow between screens
   */
  
  // Start the game from welcome screen
  const handleStart = () => {
    setCurrentScreen('role');
  };

  // Continue from role selection to sector selection (only if role is selected)
  const handleRoleContinue = () => {
    if (selectedRole !== null) {
      setCurrentScreen('sector');
    }
  };

  // Continue from sector selection to review screen (only if sector is selected)
  const handleSectorContinue = () => {
    if (selectedSector !== null) {
      setCurrentScreen('review');
    }
  };

  // Start the skills selection phase
  const handleReviewContinue = () => {
    setCurrentScreen('technical');
  };

  // Navigate through skill selection screens
  const handleTechnicalContinue = () => {
    setCurrentScreen('operational');
  };

  const handleOperationalContinue = () => {
    setCurrentScreen('analytical');
  };

  const handleAnalyticalContinue = () => {
    setCurrentScreen('collaboration');
  };

  const handleCollaborationContinue = () => {
    setCurrentScreen('management');
  };

  const handleManagementContinue = () => {
    setCurrentScreen('personal');
  };

  const handlePersonalContinue = () => {
    setCurrentScreen('interaction');
  };

  // Show loading screen after all skills are selected
  const handleInteractionContinue = () => {
    setCurrentScreen('loading');
  };

  // Display results after loading completes
  const handleLoadingComplete = () => {
    setCurrentScreen('results');
  };

  const handleResultsPage = () => {
    setCurrentScreen('userinfo');
  }
  const formatSkillsPayload = (skills: Record<string, string[]>) => {
		return {
			"Personal/Soft": (skills["Personal/Soft"] || []).join(', '),
			"Management": (skills["Management"] || []).join(', '),
			"Collab/Comm": (skills["Collab/Comm"] || []).join(', '),
			"Interaction/UX": (skills["Interaction/UX"] || []).join(', '),
			"Analytical": (skills["Analytical"] || []).join(', '),
			"Technical": (skills["Technical"] || []).join(', '),
			"Operational": (skills["Operational"] || []).join(', '),
		};
	};

  // Navigate to user info collection form
  const handleGoToUserInfo = async () => {
    const roleTitle = roles.find(r => r.id === selectedRole)?.title || 'N/A';
        const sectorTitle = sectors.find(s => s.id === selectedSector)?.title || 'N/A';
    
        const dataToInsert = {
          Timestamp: new Date().toISOString(),
          Role: roleTitle,
          Scenario: sectorTitle,
          "Final Score": formatFinalScoreText(finalScore),
          
          // INSERIMENTO CORRETTO DEI DATI SKILL:
          ...formatSkillsPayload(allSelectedSkills)
        };
    
        try {
          const { data, error } = await supabase
            .from('game_sessions')
            .insert([dataToInsert])
            .select('id'); // Importante: recupera l'ID della riga appena creata
    
          if (error || !data || data.length === 0) {
            console.error('Supabase insert error (Phase 1):', error?.message || 'No data returned.');
            alert('Errore nel salvataggio iniziale dei risultati. Riprova.');
            return;
          }
    
          // Salva l'ID della nuova riga
          setSessionId(data[0].id);
          
          // Naviga alla schermata successiva (UserInfo)
          setCurrentScreen('userinfo');
    
        } catch (e) {
          console.error('Network error during Phase 1 save:', e);
          alert('Si è verificato un errore di comunicazione.');
        }
  };


/**
 * Score Calculation
 * * Calcola i punteggi per ciascuna categoria di skill.
 */
  const calculateScores = () => {
    const roleTitle = roles.find(r => r.id === selectedRole)?.title;
    const sectorTitle = sectors.find(s => s.id === selectedSector)?.title;

    if (!roleTitle || !sectorTitle) {
        // ... (gestione stato nullo) ...
        return { 
            technical: 0, operational: 0, analytical: 0, collaboration: 0, management: 0, personal: 0, interaction: 0,
            totalCorrectInAllCategories: 0,
            userCorrectCount: 0
        };
    }

    const rawCorrectContextSkills = getCorrectSkillsForContext(sectorTitle, roleTitle);
    console.log('Skill Corrette:', rawCorrectContextSkills);
    
    // 1. Crea un Set di tutte le selezioni UTENTE per una ricerca veloce
    // Usiamo simpleCanon per pulire solo gli spazi iniziali/finali, se necessario.
    const userSelectionsSet = new Set<string>();
    Object.values(allSelectedSkills).flat().forEach(skill => {
        userSelectionsSet.add(simpleCanon(skill));
    });
    console.log('Skill Utente:', userSelectionsSet);
    // 2. Raggruppa le risposte corrette per CATEGORIA (per ottenere il denominatore per categoria)
    const correctSkillsByCategory: Record<string, string[]> = {};
    rawCorrectContextSkills.forEach(skill => {
        // Filtra le skill che non riesci a mappare a una categoria (potenziali errori nei dati)
        const category = getSkillCategory(skill);
        if (category) {
            if (!correctSkillsByCategory[category]) {
                correctSkillsByCategory[category] = [];
            }
            correctSkillsByCategory[category].push(skill);
        }
    });

    // 3. Esegui il calcolo dei punteggi
    const results: Record<string, number> = {};
    let totalCorrectInAllCategories = 0;
    let userCorrectCount = 0;
    
    const categories = Object.keys(allSelectedSkills);

    for (const category of categories) {
        const correctInCat = correctSkillsByCategory[category] || [];
        const totalCorrectForCategory = correctInCat.length;
        let correctMatches = 0;
        
        if (totalCorrectForCategory > 0) {
            correctInCat.forEach(correctSkill => {
                // Confronto diretto: verifica se la stringa corretta (pulita dagli spazi)
                // è presente nell'insieme delle selezioni utente (anch'esse pulite).
                if (userSelectionsSet.has(simpleCanon(correctSkill))) { 
                    correctMatches++;
                }
            });
        }
        
        const score = totalCorrectForCategory > 0 
            ? Math.round((correctMatches / totalCorrectForCategory) * 100) 
            : 0;

        const resultKey = category.split('/')[0].toLowerCase();
        results[resultKey] = score;

        totalCorrectInAllCategories += totalCorrectForCategory;
        userCorrectCount += correctMatches;
    }
    
    return {
        technical: results.technical || 0,
        operational: results.operational || 0,
        analytical: results.analytical || 0,
        collaboration: results.collab || 0,
        management: results.management || 0,
        personal: results.personal || 0,
        interaction: results.interaction || 0,
        
        totalCorrectInAllCategories,
        userCorrectCount
    };
};
  // Calculate all skill category scores
  const calculationResults = calculateScores();
  

  // Calculate overall final score: (Total User Correct / Total Possible Correct)
  const finalScore = calculationResults.totalCorrectInAllCategories > 0
    ? Math.round((calculationResults.userCorrectCount / calculationResults.totalCorrectInAllCategories) * 100)
    : 0;

  // Extract category scores for the ResultsScreen
  const scores = {
    technical: calculationResults.technical,
    operational: calculationResults.operational,
    analytical: calculationResults.analytical,
    collaboration: calculationResults.collaboration,
    management: calculationResults.management,
    personal: calculationResults.personal,
    interaction: calculationResults.interaction,
  };

  /**
   * Final step: save user info to Supabase table 'game_sessions'
   */
  const handleUserInfoSave = async (data: { jobTitle: string; industry: string; country: string }) => {
    
    // 1. Map Role/Sector IDs back to their titles
    const roleTitle = roles.find(r => r.id === selectedRole)?.title || 'N/A';
    const sectorTitle = sectors.find(s => s.id === selectedSector)?.title || 'N/A';
    
    // 2. Build the data payload exactly as your game_sessions table expects
    const dataToInsert = {
      Timestamp: new Date().toISOString(),
      Job: data.jobTitle,
      Country: data.country,
      Context: data.industry, // User's Input Industry
      Role: roleTitle,
      Scenario: sectorTitle, // Game Sector
      "Final Score": formatFinalScoreText(finalScore), // Final score in the expected string format
      
      // Map skills arrays to comma-separated strings as per your old server.js logic
      "Personal/Soft": (allSelectedSkills["Personal/Soft"] || []).join(', '),
      "Management": (allSelectedSkills["Management"] || []).join(', '),
      "Collab/Comm": (allSelectedSkills["Collab/Comm"] || []).join(', '),
      "Interaction/UX": (allSelectedSkills["Interaction/UX"] || []).join(', '),
      "Analytical": (allSelectedSkills["Analytical"] || []).join(', '),
      "Technical": (allSelectedSkills["Technical"] || []).join(', '),
      "Operational": (allSelectedSkills["Operational"] || []).join(', '),
    };
    
    // 3. Save data to Supabase
    try {
      const { error } = await supabase
        .from('game_sessions') // <-- Correct table name
        .insert([dataToInsert]);

      if (error) {
        console.error('Supabase insert error:', error.message);
        alert(`Error saving results: ${error.message}`);
        return;
      }

      console.log('Game Complete! Results saved to Supabase.');
      alert('Thank you! Your results have been saved.');
      handleHome();
      
    } catch (e) {
      console.error('Network or unexpected error during save:', e);
      alert('An unexpected error occurred while saving your data.');
    }
  };

  /**
   * Reset Handler - Returns to welcome screen and clears all selections
   * Can be called from any screen via the Home button
   */
  const handleHome = () => {
    setCurrentScreen('welcome');
    setSelectedRole(null);
    setSelectedSector(null);
    setTechnicalSkills([]);
    setOperationalSkills([]);
    setAnalyticalSkills([]);
    setCollaborationSkills([]);
    setManagementSkills([]);
    setPersonalSkills([]);
    setInteractionSkills([]);
  };

  /**
   * Back Navigation Handler
   * Navigates to the previous screen based on current screen
   * Maintains the linear flow of the application
   */
  const handleBack = () => {
    if (currentScreen === 'sector') {
      setCurrentScreen('role');
    } else if (currentScreen === 'review') {
      setCurrentScreen('sector');
    } else if (currentScreen === 'technical') {
      setCurrentScreen('review');
    } else if (currentScreen === 'operational') {
      setCurrentScreen('technical');
    } else if (currentScreen === 'analytical') {
      setCurrentScreen('operational');
    } else if (currentScreen === 'collaboration') {
      setCurrentScreen('analytical');
    } else if (currentScreen === 'management') {
      setCurrentScreen('collaboration');
    } else if (currentScreen === 'personal') {
      setCurrentScreen('management');
    } else if (currentScreen === 'interaction') {
      setCurrentScreen('personal');
    } else if (currentScreen === 'results') {
      setCurrentScreen('loading');
    }
  };
 
  console.log(finalScore)
  /**
   * Render Logic
   * 
   * Conditionally renders the appropriate screen component based on currentScreen state.
   * Each screen receives the necessary props for data and navigation.
   */
  return (
    <div className="size-full bg-[#E8EBF0]">
      {/* Welcome/Introduction Screen */}
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {/* Role Selection Screen - Choose from 3 operator roles */}
      {currentScreen === 'role' && (
        <RoleScreen
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          onContinue={handleRoleContinue}
          onHome={handleHome}
        />
      )}
      {/* Sector Selection Screen - Choose industry sector */}
      {currentScreen === 'sector' && (
        <SectorScreen
          selectedSector={selectedSector}
          onSelectSector={setSelectedSector}
          onContinue={handleSectorContinue}
          onHome={handleHome}
          onBack={handleBack}
        />
      )}
      {/* Review Screen - Displays selected role and sector before starting game */}
      {currentScreen === 'review' && (
        <ReviewScreen
          selectedRole={selectedRole}
          selectedSector={selectedSector}
          onContinue={handleReviewContinue}
          onHome={handleHome}
          onBack={handleBack}
        />
      )}
      {/* Skills Selection Screens - User selects relevant skills for each category */}
      {currentScreen === 'technical' && (
        <TechnicalSkillsScreen
          selectedRole={selectedRole}
          selectedSector={selectedSector}
          selectedSkills={technicalSkills}
          onSkillsChange={setTechnicalSkills}
          onContinue={handleTechnicalContinue}
          onHome={handleHome}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'operational' && (
        <OperationalSkillsScreen
          selectedRole={selectedRole}
          selectedSector={selectedSector}
          selectedSkills={operationalSkills}
          onSkillsChange={setOperationalSkills}
          onContinue={handleOperationalContinue}
          onHome={handleHome}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'analytical' && (
        <AnalyticalSkillsScreen
          selectedRole={selectedRole}
          selectedSector={selectedSector}
          selectedSkills={analyticalSkills}
          onSkillsChange={setAnalyticalSkills}
          onContinue={handleAnalyticalContinue}
          onHome={handleHome}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'collaboration' && (
        <CollaborationSkillsScreen
          selectedRole={selectedRole}
          selectedSector={selectedSector}
          selectedSkills={collaborationSkills}
          onSkillsChange={setCollaborationSkills}
          onContinue={handleCollaborationContinue}
          onHome={handleHome}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'management' && (
        <ManagementSkillsScreen
          selectedRole={selectedRole}
          selectedSector={selectedSector}
          selectedSkills={managementSkills}
          onSkillsChange={setManagementSkills}
          onContinue={handleManagementContinue}
          onHome={handleHome}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'personal' && (
        <PersonalSkillsScreen
          selectedRole={selectedRole}
          selectedSector={selectedSector}
          selectedSkills={personalSkills}
          onSkillsChange={setPersonalSkills}
          onContinue={handlePersonalContinue}
          onHome={handleHome}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'interaction' && (
        <InteractionSkillsScreen
          selectedRole={selectedRole}
          selectedSector={selectedSector}
          selectedSkills={interactionSkills}
          onSkillsChange={setInteractionSkills}
          onContinue={handleInteractionContinue}
          onHome={handleHome}
          onBack={handleBack}
        />
      )}
      {/* Loading Screen - Animated progress bar while calculating results */}
      {currentScreen === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      
      {/* Results Screen - Displays scores for each skill category */}
      {currentScreen === 'results' && (
        <ResultsScreen
          selectedRole={selectedRole}
          selectedSector={selectedSector}
          scores={scores}
          finalScore={finalScore}
          onHome={handleHome}
          onBack={handleBack}
          onSave={handleResultsPage}
         
        />
      )}
      {/* User Info Screen - Collects demographic information */}
      {currentScreen === 'userinfo' && (
        <UserInfoScreen onSave={handleUserInfoSave} />
      )}
    </div>
  );
}
