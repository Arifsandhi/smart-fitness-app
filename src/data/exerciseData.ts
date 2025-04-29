import { Exercise } from '../utils/types';

export const exerciseLibrary: Exercise[] = [
  // Warm-up Exercises
  {
    id: 'warmup-1',
    name: 'Jumping Jacks',
    description: 'A classic warm-up exercise to get your heart rate up',
    category: 'warmup',
    difficulty: 'easy',
    duration: 3,
    imageUrl: 'https://images.pexels.com/photos/4498151/pexels-photo-4498151.jpeg',
    targetMuscles: ['full body'],
    instructions: [
      'Stand with your feet together and arms at your sides',
      'Jump and spread your legs while raising your arms above your head',
      'Return to the starting position in one fluid movement',
      'Repeat at a moderate pace for the duration'
    ]
  },
  {
    id: 'warmup-2',
    name: 'Arm Circles',
    description: 'Simple movement to warm up shoulders and increase mobility',
    category: 'warmup',
    difficulty: 'easy',
    duration: 2,
    imageUrl: 'https://images.pexels.com/photos/8128565/pexels-photo-8128565.jpeg',
    targetMuscles: ['shoulders', 'upper back'],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Extend your arms out to the sides at shoulder height',
      'Make small circles with your arms, gradually increasing the size',
      'Reverse direction halfway through'
    ]
  },
  
  // Arms Exercises
  {
    id: 'arms-1',
    name: 'Push-Ups',
    description: 'Effective upper body exercise for chest, shoulders, and triceps',
    category: 'arms',
    difficulty: 'medium',
    duration: 5,
    imageUrl: 'https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg',
    targetMuscles: ['chest', 'shoulders', 'triceps'],
    instructions: [
      'Start in a plank position with hands slightly wider than shoulder-width',
      'Lower your body until your chest nearly touches the floor',
      'Push back up to the starting position',
      'Keep your body in a straight line throughout the movement'
    ]
  },
  {
    id: 'arms-2',
    name: 'Tricep Dips',
    description: 'Targets the triceps using a chair or bench',
    category: 'arms',
    difficulty: 'medium',
    duration: 4,
    imageUrl: 'https://images.pexels.com/photos/4162509/pexels-photo-4162509.jpeg',
    targetMuscles: ['triceps', 'shoulders'],
    instructions: [
      'Sit on the edge of a chair or bench with hands beside your hips',
      'Slide your butt off the edge with legs extended',
      'Lower your body by bending your elbows',
      'Push back up to the starting position using your arms'
    ]
  },
  {
    id: 'arms-3',
    name: 'Bicep Curls',
    description: 'Classic arm exercise targeting the biceps',
    category: 'arms',
    difficulty: 'easy',
    duration: 4,
    imageUrl: 'https://images.pexels.com/photos/1638336/pexels-photo-1638336.jpeg',
    targetMuscles: ['biceps', 'forearms'],
    instructions: [
      'Stand with feet shoulder-width apart, holding weights at your sides',
      'Keep elbows close to your torso and rotate palms to face forward',
      'Curl the weights while contracting your biceps',
      'Lower back to the starting position with control'
    ]
  },
  
  // Legs Exercises
  {
    id: 'legs-1',
    name: 'Squats',
    description: 'Fundamental lower body exercise for overall leg strength',
    category: 'legs',
    difficulty: 'medium',
    duration: 5,
    imageUrl: 'https://images.pexels.com/photos/4498150/pexels-photo-4498150.jpeg',
    targetMuscles: ['quadriceps', 'hamstrings', 'glutes'],
    instructions: [
      'Stand with feet slightly wider than hip-width apart',
      'Lower your body as if sitting in a chair, keeping chest up',
      'Lower until thighs are parallel to the ground (or as low as comfortable)',
      'Push through heels to return to standing position'
    ]
  },
  {
    id: 'legs-2',
    name: 'Lunges',
    description: 'Excellent for leg strength and balance',
    category: 'legs',
    difficulty: 'medium',
    duration: 5,
    imageUrl: 'https://images.pexels.com/photos/2780762/pexels-photo-2780762.jpeg',
    targetMuscles: ['quadriceps', 'hamstrings', 'glutes', 'calves'],
    instructions: [
      'Stand with feet hip-width apart',
      'Step forward with one leg and lower your body until both knees are bent at 90°',
      'Push through the front heel to return to standing',
      'Repeat with the other leg and continue alternating'
    ]
  },
  {
    id: 'legs-3',
    name: 'Calf Raises',
    description: 'Isolates and strengthens the calf muscles',
    category: 'legs',
    difficulty: 'easy',
    duration: 3,
    imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
    targetMuscles: ['calves'],
    instructions: [
      'Stand with feet hip-width apart, optionally holding onto something for balance',
      'Raise your heels off the ground, standing on the balls of your feet',
      'Hold the raised position briefly',
      'Lower your heels back to the ground with control'
    ]
  },
  
  // Core Exercises
  {
    id: 'core-1',
    name: 'Plank',
    description: 'Excellent for core stability and strength',
    category: 'core',
    difficulty: 'medium',
    duration: 3,
    imageUrl: 'https://images.pexels.com/photos/6456134/pexels-photo-6456134.jpeg',
    targetMuscles: ['abs', 'lower back', 'shoulders'],
    instructions: [
      'Start in a forearm plank position with elbows aligned beneath shoulders',
      'Keep your body in a straight line from head to heels',
      'Engage your core and glutes',
      'Hold the position for the designated time'
    ]
  },
  {
    id: 'core-2',
    name: 'Russian Twists',
    description: 'Great for obliques and rotational core strength',
    category: 'core',
    difficulty: 'medium',
    duration: 4,
    imageUrl: 'https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg',
    targetMuscles: ['obliques', 'abs'],
    instructions: [
      'Sit on the floor with knees bent and feet slightly off the ground',
      'Lean back slightly to engage core, keeping back straight',
      'Clasp hands together and twist torso to right, then to left',
      'Each twist to right and left counts as one rep'
    ]
  },
  {
    id: 'core-3',
    name: 'Bicycle Crunches',
    description: 'Dynamic core exercise targeting multiple abdominal muscles',
    category: 'core',
    difficulty: 'medium',
    duration: 4,
    imageUrl: 'https://images.pexels.com/photos/6456201/pexels-photo-6456201.jpeg',
    targetMuscles: ['abs', 'obliques'],
    instructions: [
      'Lie on your back with hands behind your head and knees bent',
      'Lift shoulders off the ground and bring right elbow to left knee while extending right leg',
      'Switch sides, bringing left elbow to right knee',
      'Continue alternating in a pedaling motion'
    ]
  },
  
  // Cardio Exercises
  {
    id: 'cardio-1',
    name: 'High Knees',
    description: 'High-intensity cardio that targets core and legs',
    category: 'cardio',
    difficulty: 'medium',
    duration: 3,
    imageUrl: 'https://images.pexels.com/photos/6456297/pexels-photo-6456297.jpeg',
    targetMuscles: ['core', 'hip flexors', 'quads'],
    instructions: [
      'Stand with feet hip-width apart',
      'Run in place, bringing knees up to hip height',
      'Pump arms for added intensity',
      'Maintain a quick pace throughout'
    ]
  },
  {
    id: 'cardio-2',
    name: 'Burpees',
    description: 'Full-body, high-intensity exercise',
    category: 'cardio',
    difficulty: 'hard',
    duration: 5,
    imageUrl: 'https://images.pexels.com/photos/1153370/pexels-photo-1153370.jpeg',
    targetMuscles: ['full body'],
    instructions: [
      'Start standing, then squat and place hands on floor',
      'Jump feet back to plank position',
      'Perform a push-up (optional)',
      'Jump feet forward to hands, then explosively jump up with arms overhead'
    ]
  },
  {
    id: 'cardio-3',
    name: 'Mountain Climbers',
    description: 'Dynamic exercise for cardio and core strength',
    category: 'cardio',
    difficulty: 'medium',
    duration: 4,
    imageUrl: 'https://images.pexels.com/photos/4162495/pexels-photo-4162495.jpeg',
    targetMuscles: ['core', 'shoulders', 'hip flexors'],
    instructions: [
      'Start in a plank position with wrists under shoulders',
      'Drive right knee toward chest, then quickly switch legs',
      'Continue alternating legs in a running motion',
      'Maintain a flat back and engaged core throughout'
    ]
  },
  
  // Full Body Exercises
  {
    id: 'fullbody-1',
    name: 'Kettlebell Swings',
    description: 'Explosive full-body exercise',
    category: 'fullBody',
    difficulty: 'medium',
    duration: 5,
    imageUrl: 'https://images.pexels.com/photos/4498290/pexels-photo-4498290.jpeg',
    targetMuscles: ['hamstrings', 'glutes', 'lower back', 'shoulders'],
    instructions: [
      'Stand with feet wider than hip-width, holding kettlebell with both hands',
      'Hinge at hips and swing kettlebell back between legs',
      'Thrust hips forward to swing kettlebell up to chest height',
      'Let momentum bring kettlebell back down between legs'
    ]
  },
  {
    id: 'fullbody-2',
    name: 'Thruster',
    description: 'Compound movement combining squats and shoulder press',
    category: 'fullBody',
    difficulty: 'hard',
    duration: 5,
    imageUrl: 'https://images.pexels.com/photos/28080/pexels-photo.jpg',
    targetMuscles: ['quads', 'glutes', 'shoulders', 'triceps'],
    instructions: [
      'Hold weights at shoulder height with feet shoulder-width apart',
      'Perform a squat, keeping weights at shoulders',
      'As you stand up, press weights overhead',
      'Lower weights back to shoulders and repeat'
    ]
  },
  {
    id: 'fullbody-3',
    name: 'Bodyweight Circuit',
    description: 'Sequence of exercises performed with minimal rest',
    category: 'fullBody',
    difficulty: 'medium',
    duration: 8,
    imageUrl: 'https://images.pexels.com/photos/3763115/pexels-photo-3763115.jpeg',
    targetMuscles: ['full body'],
    instructions: [
      'Perform 10 jumping jacks',
      'Do 10 push-ups',
      'Complete 10 squats',
      'Hold plank for 30 seconds',
      'Repeat circuit 2-3 times with minimal rest'
    ]
  },
  
  // Cool-down Exercises
  {
    id: 'cooldown-1',
    name: 'Forward Fold',
    description: 'Stretches hamstrings and lower back',
    category: 'cooldown',
    difficulty: 'easy',
    duration: 2,
    imageUrl: 'https://images.pexels.com/photos/6456169/pexels-photo-6456169.jpeg',
    targetMuscles: ['hamstrings', 'lower back'],
    instructions: [
      'Stand with feet hip-width apart',
      'Slowly bend forward from the hips',
      'Let arms hang toward the floor or hold elbows',
      'Hold the stretch, allowing gravity to deepen it'
    ]
  },
  {
    id: 'cooldown-2',
    name: 'Child\'s Pose',
    description: 'Relaxing stretch for back, shoulders, and hips',
    category: 'cooldown',
    difficulty: 'easy',
    duration: 2,
    imageUrl: 'https://images.pexels.com/photos/5384538/pexels-photo-5384538.jpeg',
    targetMuscles: ['back', 'shoulders', 'hips'],
    instructions: [
      'Kneel on the floor with big toes touching and knees apart',
      'Sit back on heels and extend arms forward',
      'Rest forehead on the floor and relax into the stretch',
      'Breathe deeply and hold'
    ]
  }
];