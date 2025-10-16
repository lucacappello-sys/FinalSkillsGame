import { CORRECT_SKILLS_DATA } from '../data/quizData';

// VERSIONE PIÙ ROBUSTA DI SIMPLECANON (consigliata per i dati esistenti)
export function simpleCanon(t: string): string {
    return String(t || '').trim().toLowerCase(); // Gestisce spazi e maiuscole
}

const cleanKey = (key: string) => key.toLowerCase().replace(/[^a-z0-9]/g, '');

export function getCorrectSkillsForContext(sectorTitle: string, roleTitle: string): string[] {
    const cleanedSector = cleanKey(sectorTitle);
    const cleanedRole = cleanKey(roleTitle);

    // Get an array of all sector data keys, cleaned for comparison
    const sectorKeys = Object.keys(CORRECT_SKILLS_DATA);

    // 1. Find the matching sector key (e.g., "automotivesector")
    const matchingSectorKey = sectorKeys.find(key => cleanKey(key) === cleanedSector);

    if (!matchingSectorKey) {
        console.error(`Scoring Error: Sector key "${sectorTitle}" not found after cleaning.`);
        return [];
    }

    const roleMap = CORRECT_SKILLS_DATA[matchingSectorKey as keyof typeof CORRECT_SKILLS_DATA];
    const roleKeys = Object.keys(roleMap);

    // 2. Find the matching role key (e.g., "smartlineoperator")
    const matchingRoleKey = roleKeys.find(key => cleanKey(key) === cleanedRole);

    if (!matchingRoleKey) {
        console.error(`Scoring Error: Role key "${roleTitle}" not found after cleaning in sector "${matchingSectorKey}".`);
        return [];
    }

    // Return the skill list using the *original* keys found in the data structure
    return roleMap[matchingRoleKey as keyof typeof roleMap] || [];
}