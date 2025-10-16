export const ALL_SKILLS_UI = {
    "Personal/Soft": ['Responsiveness',
                    'Adapting to changing situations',
                    'Manual Dexterity',
                    'Meet commitments (e.g., working plan and deadlines)',
                    'Observation skills',
                    'Dealing with challenging and stressful work conditions',
                    'Physical strength'
                ],
    "Management": ['Task/Production planning',
                    'Safety checking',
                    'Conflict resolution',
                    'Team management',
                    'Supervising staff',
                    'Risk assessment',
                    'Monitoring workers\' safety on the production floor',
                    'Monitoring security procedures in warehouse operations'
                ],
    "Collab/Comm": [ 'Quality assessment',
                    'Use of the Robot controller',
                    'Setting up the robot',
                    'Digital systems usage',
                    'Machine/Robot maintenance',
                    'Turning on machines/robot',
                    'Data processing',
                    'Know how to interact with robots',
                    'Technical inspection'
                    ],
    "Interaction/UX": ['Production monitoring',
                    'Use gesture-based controls',
                    'Interact physically with cobots',
                    'Navigate and operate touchscreen-based interfaces',
                    'Use voice commands to start, stop, or adjust machinery without physical interaction.',
                    'Collaborate with robotic systems in shared workspaces',
                    'Respond to haptic (vibration) signals or tactile feedback',
                    'Utilize AR devices (such as smart glasses or tablets) to receive real-time, step-by-step assembly instructions and visual guidance.'
                    ],
    "Analytical": ["Problem solving",
                    "Data interpretation",
                    "Decision Making",
                    "Making time-critical decisions",
                    "Risk assessment",
                    "Problem identification",
                    "Predictive maintenance",
                    "Preventive maintenance",
                    ],
    "Operational": [ 'Procedures knowledge of error situation',
                    'Task knowledge',
                    'Time management',
                    'Coping with pressure',
                    'Situational awareness',
                    'Fast task execution',
                    'Procedures knowledge',
                    'Handling unexpected events and emergencies'
                    ],
    "Technical": [ 'Quality assessment',
                    'Use of the Robot controller',
                    'Data processing',
                    'Setting up the robot',
                    'Know how to interact with robots',
                    'Digital systems usage',
                    'Technical inspection',
                    'Machine/Robot maintenance',
                    'Turning on machines/robot',
                    'Statistical process control',
                    'Knowledge of robot mechanisms',
                    'Robot programming',
                    'Process awareness',
                    'Digital data management',
                    'Knowledge of Machine/Robot task',
                    'Algorithms output understanding',
                    'Setting up the activity',
                    'Understanding the Robot coding/language',
                    'General programming skills',
                    'Understand the robot feedback',
                    'Technical issues resolution',
                    'System state interpretation',
                    'Problem/Alert management',
                    'Machine/Robot setting parameters'
                ]
};

export const CORRECT_SKILLS_DATA = {
    "AUTOMOTIVE SECTOR": {
        "SMART LINE OPERATOR": ["Task knowledge","Procedures knowledge of error situation","Situational awareness","Use of the Robot controller","Process awareness","Understand the robot feedback","Know how to interact with robots","Technical issues resolution","Knowledge of Machine/Robot task","Coordination with the robot work","Collaborate with robotic systems in shared workspaces"],
        "PLANT FLOW-KEEPER": ["Know how to interact with robots","Use of the Robot controller","Understand the robot feedback","Handling unexpected events and emergencies","Coordination across operators","Conflict resolution","Team management","Supervising staff","Monitoring security procedures in warehouse operations"],
        "TECH SOLVER": ["Knowledge of robot mechanisms","Robot programming","Know how to interact with robots","Use of the Robot controller","Understand the robot feedback","Technical issues resolution","Technical inspection","Interact physically with cobots","Problem identification"]
    },
    "FOOD SECTOR": {
        "SMART LINE OPERATOR": ["System state interpretation","Turning on machines/robot","Setting up the robot","Problem / Alert management","Quality assessment","Use of the Robot controller","Understand the robot feedback","Process awareness","Digital systems usage","Know how to interact with robots","Coordination with the robot work","Situational awareness","Task knowledge","Procedures knowledge","Procedures knowledge of error situation","Production monitoring","Collaborate with robotic systems in shared workspaces"],
        "PLANT FLOW-KEEPER": ["Task/Production planning","Safety checking","Setting up the activity","Machine/Robot setting parameters","Digital systems usage","Risk assessment","Problem identification","Task knowledge","Handling unexpected events and emergencies"],
        "TECH SOLVER": ["Technical inspection","Use of the robot controller","Data interpretation","Knowledge of robot mechanisms","Know how to interact with robots","Robot programming","Technical issues resolution","Understand the robot feedback","Problem identification"]
    },
    "LOGISTIC SECTOR": {
        "SMART LINE OPERATOR": ["Task knowledge","Procedures knowledge of error situation","Use of the Robot controller","Problem / Alert management","Setting up the activity","System state interpretation","Machine/robot setting parameters","Process awareness","Know how to interact with robots","Task/Production planning","Safety checking","Decision making","Problem solving","Problem identification","Data interpretation","Coordination with the robot work"],
        "PLANT FLOW-KEEPER": ["Task/Production planning","Alert management","Safety checking","Data interpretation","Decision Making"],
        "TECH SOLVER": ["Predictive maintenance","Data interpretation","Use of the Robot controller","Setting up the robot","Machine/robot setting parameters","Understanding the Robot coding/language","Technical inspection","Algorithms output understanding","Knowledge of robot mechanisms","Digital System/Machine/Robot automatic reports understanding","Alert management","Safety checking","Interact physically with cobots","Understand the robot feedback"]
    }
};

const SKILL_TO_CATEGORY_MAP = (() => {
    const map = new Map<string, string>();
    for (const [cat, arr] of Object.entries(ALL_SKILLS_UI)) {
        for (const label of arr) {
            // Use the exact string from ALL_SKILLS_UI as the key
            map.set(label, cat);
        }
    }
    return map;
})();

export const getSkillCategory = (skill: string): string | undefined => {
    // If you need case-insensitive matching, you should convert both the map key
    // and the input skill to lowercase. Since you opted for simplified code, 
    // we use an exact match.
    return SKILL_TO_CATEGORY_MAP.get(skill);
};