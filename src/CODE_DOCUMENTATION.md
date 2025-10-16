# Operator Skills Game - Code Documentation

## Overview
An interactive educational application about Industry 5.0 technologies and their impact on operator skills. Users progress through multiple screens to select a role, sector, and various skill categories to test their knowledge.

## Application Flow

```
Welcome Screen
    ↓
Role Selection (3 roles)
    ↓
Sector Selection (3 sectors)
    ↓
Review Screen
    ↓
Technical Skills Selection
    ↓
Operational Skills Selection
    ↓
Analytical Skills Selection
    ↓
Collaboration Skills Selection
    ↓
Management Skills Selection
    ↓
Personal/Soft Skills Selection
    ↓
Interaction/UX Skills Selection
    ↓
Loading Screen (3 seconds)
    ↓
Results Screen (scores by category)
    ↓
User Info Form
    ↓
Complete (returns to Welcome)
```

## File Structure

### Main Application
- **`/App.tsx`** - Main application component with state management and routing logic

### Screen Components
- **`/components/WelcomeScreen.tsx`** - Initial landing/intro screen
- **`/components/RoleScreen.tsx`** - Select from 3 operator roles
- **`/components/SectorScreen.tsx`** - Select from 3 industry sectors
- **`/components/ReviewScreen.tsx`** - Review selected role and sector
- **`/components/TechnicalSkillsScreen.tsx`** - Technical skills selection (24 skills)
- **`/components/OperationalSkillsScreen.tsx`** - Operational skills selection (8 skills)
- **`/components/AnalyticalSkillsScreen.tsx`** - Analytical skills selection (8 skills)
- **`/components/CollaborationSkillsScreen.tsx`** - Collaboration skills selection (9 skills)
- **`/components/ManagementSkillsScreen.tsx`** - Management skills selection (8 skills)
- **`/components/PersonalSkillsScreen.tsx`** - Personal/soft skills selection (7 skills)
- **`/components/InteractionSkillsScreen.tsx`** - Interaction/UX skills selection (8 skills)
- **`/components/LoadingScreen.tsx`** - Animated loading with progress bar
- **`/components/ResultsScreen.tsx`** - Display scores with color-coded bars
- **`/components/UserInfoScreen.tsx`** - Collect demographic information

## Key Features

### State Management
The application uses React's `useState` hook to manage:
- Current screen navigation
- Selected role and sector
- Skills selections for all 7 categories
- Calculated scores

### Navigation
- **Forward Navigation**: Validated progression through screens (e.g., can't continue without selecting a role)
- **Back Navigation**: Returns to previous screen while maintaining selections
- **Home Button**: Available on most screens to reset and return to welcome

### Score Calculation
Scores are calculated based on:
- Number of skills selected in each category
- Variance added for realism (±10%)
- Color-coded display: Green (≥75%), Yellow (50-74%), Red (<50%)
- Final score is average of all 7 categories

### Progress Indicators
Most screens include:
- Dot indicators showing position in the flow
- Active dot is elongated and blue
- 9 dots total (not including welcome, loading, results, userinfo)

## Data Structure

### Roles
1. **Smart Line Operator** - Works with collaborative robots
2. **Plant Flow-Keeper** - Manages production flows
3. **Tech Solver** - Designs and programs robots

### Sectors
1. **Food Sector** - Agricultural products sorting and packing
2. **Automotive Sector** - Complex assemblies and kitting
3. **Logistic Sector** - Order preparation and stock management

### Skills Categories (72 total skills)
- Technical: 24 skills
- Operational: 8 skills
- Analytical: 8 skills
- Collaboration: 9 skills
- Management: 8 skills
- Personal/Soft: 7 skills
- Interaction/UX: 8 skills

## Props Pattern

Most skill screens follow this pattern:
```typescript
interface SkillScreenProps {
  selectedRole: number | null;         // For context display
  selectedSector: number | null;       // For context display
  selectedSkills: string[];            // Current selections
  onSkillsChange: (skills: string[]) => void; // Update selections
  onContinue: () => void;              // Next screen
  onHome: () => void;                  // Reset to start
  onBack: () => void;                  // Previous screen
}
```

## Styling

### Color Scheme
- **Background**: `#E8EBF0` (light blue-gray)
- **Headers**: `#D8DCE6` (medium gray)
- **Primary Button**: `#2E5A9E` (dark blue)
- **Secondary Button**: `#6B7CCC` (purple-blue)
- **Accent**: `#5DADE2` (light blue)

### Role Colors
- Role 1: `#3FACE2` (light blue)
- Role 2: `#E69B38` (orange)
- Role 3: `#2956A5` (dark blue)

### Score Colors
- High (≥75%): `#5AC18E` (green)
- Medium (50-74%): `#E5B84B` (yellow)
- Low (<50%): `#E57373` (red)

## Future Enhancements

To make this a production application, consider:
1. **Backend Integration**: Save results to a database
2. **Correct Answer Logic**: Implement actual skill validation against expert answers
3. **User Authentication**: Track individual user progress
4. **Analytics Dashboard**: Visualize aggregate results
5. **Multilingual Support**: Translate content
6. **Accessibility**: Add ARIA labels, keyboard navigation
7. **Mobile Optimization**: Responsive design improvements
8. **Results Export**: PDF or email results
9. **Comparison Mode**: Compare user results against benchmarks
10. **Tutorial Mode**: Guided walkthrough for first-time users
