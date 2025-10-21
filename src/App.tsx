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
type Screen =
  | 'welcome'
  | 'role'
  | 'sector'
  | 'review'
  | 'technical'
  | 'operational'
  | 'analytical'
  | 'collaboration'
  | 'management'
  | 'personal'
  | 'interaction'
  | 'loading'
  | 'results'
  | 'userinfo';

// --- Data Definitions (to map IDs to titles for the DB and Quiz Data) ---
const roles = [
  { id: 1, title: 'SMART LINE OPERATOR' },
  { id: 2, title: 'PLANT FLOW-KEEPER' },
  { id: 3, title: 'TECH SOLVER' },
];

const sectors = [
  { id: 1, title: 'FOOD SECTOR' },
  { id: 2, title: 'AUTOMOTIVE SECTOR' },
  { id: 3, title: 'LOGISTIC SECTOR' },
];

// Helper function to format the final score string as your database expects
const formatFinalScoreText = (score: number) =>
  `Final score: ${score}% correct answers`;

export default function App() {
  // Current screen state - controls which screen is displayed
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  // 🔑 Chiave condivisa tra Results e UserInfo: usiamo il Timestamp della riga inserita
  const [sessionTimestamp, setSessionTimestamp] = useState<string | null>(null);

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
  const allSelectedSkills: Record<string, string[]> = {
    'Personal/Soft': personalSkills,
    Management: managementSkills,
    'Collab/Comm': collaborationSkills,
    'Interaction/UX': interactionSkills,
    Analytical: analyticalSkills,
    Operational: operationalSkills,
    Technical: technicalSkills,
  };

  /**
   * Navigation Handlers - Control the flow between screens
   */

  const handleStart = () => {
    setCurrentScreen('role');
  };

  const handleRoleContinue = () => {
    if (selectedRole !== null) setCurrentScreen('sector');
  };

  const handleSectorContinue = () => {
    if (selectedSector !== null) setCurrentScreen('review');
  };

  const handleReviewContinue = () => setCurrentScreen('technical');
  const handleTechnicalContinue = () => setCurrentScreen('operational');
  const handleOperationalContinue = () => setCurrentScreen('analytical');
  const handleAnalyticalContinue = () => setCurrentScreen('collaboration');
  const handleCollaborationContinue = () => setCurrentScreen('management');
  const handleManagementContinue = () => setCurrentScreen('personal');
  const handlePersonalContinue = () => setCurrentScreen('interaction');
  const handleInteractionContinue = () => setCurrentScreen('loading');
  const handleLoadingComplete = () => setCurrentScreen('results');

  /**
   * Score Calculation
   * * Calcola i punteggi per ciascuna categoria di skill.
   */
  const calculateScores = () => {
    const roleTitle = roles.find((r) => r.id === selectedRole)?.title;
    const sectorTitle = sectors.find((s) => s.id === selectedSector)?.title;

    if (!roleTitle || !sectorTitle) {
      return {
        technical: 0,
        operational: 0,
        analytical: 0,
        collaboration: 0,
        management: 0,
        personal: 0,
        interaction: 0,
        totalCorrectInAllCategories: 0,
        userCorrectCount: 0,
      };
    }

    const rawCorrectContextSkills = getCorrectSkillsForContext(
      sectorTitle,
      roleTitle
    );

    const userSelectionsSet = new Set<string>();
    Object.values(allSelectedSkills)
      .flat()
      .forEach((skill) => {
        userSelectionsSet.add(simpleCanon(skill));
      });

    const correctSkillsByCategory: Record<string, string[]> = {};
    rawCorrectContextSkills.forEach((skill) => {
      const category = getSkillCategory(skill);
      if (category) {
        if (!correctSkillsByCategory[category]) {
          correctSkillsByCategory[category] = [];
        }
        correctSkillsByCategory[category].push(skill);
      }
    });

    const results: Record<string, number> = {};
    let totalCorrectInAllCategories = 0;
    let userCorrectCount = 0;

    const categories = Object.keys(allSelectedSkills);

    for (const category of categories) {
      const correctInCat = correctSkillsByCategory[category] || [];
      const totalCorrectForCategory = correctInCat.length;
      let correctMatches = 0;

      if (totalCorrectForCategory > 0) {
        correctInCat.forEach((correctSkill) => {
          if (userSelectionsSet.has(simpleCanon(correctSkill))) {
            correctMatches++;
          }
        });
      }

      const score =
        totalCorrectForCategory > 0
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
      userCorrectCount,
    };
  };

  // Calculate all skill category scores
  const calculationResults = calculateScores();

  // Calculate overall final score: (Total User Correct / Total Possible Correct)
  const finalScore =
    calculationResults.totalCorrectInAllCategories > 0
      ? Math.round(
        (calculationResults.userCorrectCount /
          calculationResults.totalCorrectInAllCategories) *
        100
      )
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
   * Utils: mappa gli array a stringhe CSV con i NOMI COLONNE ESATTI del DB.
   * ⚠️ La tua colonna per Analytical è chiamata "Analytica".
   */
  const formatSkillsPayload = (skills: Record<string, string[]>) => {
    return {
      'Personal/Soft': (skills['Personal/Soft'] || []).join(', '),
      Management: (skills['Management'] || []).join(', '),
      'Collab/Comm': (skills['Collab/Comm'] || []).join(', '),
      'Interaction/UX': (skills['Interaction/UX'] || []).join(', '),
      Analytical: (skills['Analytical'] || []).join(', '), // 👈 nome colonna esatto
      Technical: (skills['Technical'] || []).join(', '),
      Operational: (skills['Operational'] || []).join(', '),
    };
  };

  /**
   * 1) Results → INSERT iniziale su Supabase + vai a UserInfo
   */
  const handleResultsPage = async () => {
    const roleTitle = roles.find((r) => r.id === selectedRole)?.title || 'N/A';
    const sectorTitle = sectors.find((s) => s.id === selectedSector)?.title || 'N/A';

    // Chiave condivisa tra le due fasi
    const ts = new Date().toISOString();

    // 1) INSERT di base
    const baseInsert = {
      Timestamp: ts,
      Role: roleTitle,
      Scenario: sectorTitle,
      'Final Score': formatFinalScoreText(finalScore),
      Job: '',
      Context: '',
      Country: '',
    };

    try {
      const { error: insertErr } = await supabase
        .from('game_sessions')
        .insert([baseInsert]);

      if (insertErr) {
        console.error('[Supabase INSERT error]', insertErr);
        alert(`Errore nel salvataggio iniziale dei risultati.\nDettagli: ${insertErr.message || insertErr.details || 'N/D'}`);
        return;
      }

      // 2) UPDATE delle colonne skill
      const skillPayload = formatSkillsPayload(allSelectedSkills);

      const { error: updateSkillsErr } = await supabase
        .from('game_sessions')
        .update(skillPayload)
        .eq('Timestamp', ts);

      if (updateSkillsErr) {
        console.error('[Supabase UPDATE skills error]', updateSkillsErr);
        alert(`Riga creata ma aggiornamento skills fallito.\nDettagli: ${updateSkillsErr.message || updateSkillsErr.details || 'N/D'}`);
      }

      setSessionTimestamp(ts);
      setCurrentScreen('userinfo');
    } catch (e) {
      console.error('[Network/Unexpected error during INSERT/UPDATE]', e);
      alert('Si è verificato un errore di comunicazione durante il salvataggio iniziale.');
    }
  };

  /**
   * 2) UserInfo → UPDATE della stessa riga (match su Timestamp)
   */
  const handleUserInfoSave = async (data: { jobTitle: string; industry: string; country: string }) => {
    if (!sessionTimestamp) {
      alert('Sessione non valida: non trovo la riga precedente. Torna ai risultati e riprova.');
      return;
    }

    try {
      const { error } = await supabase
        .from('game_sessions')
        .update({
          Job: data.jobTitle,
          Context: data.industry,
          Country: data.country,
        })
        .eq('Timestamp', sessionTimestamp);

      if (error) {
        console.error('[Supabase UPDATE user info error]', error);
        alert(`Errore nel salvataggio delle informazioni utente.\nDettagli: ${error.message || error.details || 'N/D'}`);
        return;
      }

      alert('Thank you! Your results have been saved.');
      handleHome();
    } catch (e) {
      console.error('[Network/Unexpected error during UPDATE user info]', e);
      alert('Si è verificato un errore di comunicazione durante il salvataggio dei dati utente.');
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
    setSessionTimestamp(null);
  };

  /**
   * Back Navigation Handler
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

  /**
   * Render
   */
  return (
    <div className="size-full bg-[#E8EBF0]">
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}

      {currentScreen === 'role' && (
        <RoleScreen
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          onContinue={handleRoleContinue}
          onHome={handleHome}
        />
      )}

      {currentScreen === 'sector' && (
        <SectorScreen
          selectedSector={selectedSector}
          onSelectSector={setSelectedSector}
          onContinue={handleSectorContinue}
          onHome={handleHome}
          onBack={handleBack}
        />
      )}

      {currentScreen === 'review' && (
        <ReviewScreen
          selectedRole={selectedRole}
          selectedSector={selectedSector}
          onContinue={handleReviewContinue}
          onHome={handleHome}
          onBack={handleBack}
        />
      )}

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
          onSave={handleResultsPage} // 👈 ora fa INSERT + naviga a userinfo
        />
      )}

      {/* User Info Screen - Collects demographic information */}
      {currentScreen === 'userinfo' && (
        <UserInfoScreen onSave={handleUserInfoSave} />
      )}
    </div>
  );
}
