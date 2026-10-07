import type { Exercise } from './types';

/**
 * Exercise pool. Each entry maps to one of the ten exercise photographs exported
 * from the Figma "Workout Detail" frame, so the exercise grids render real
 * artwork from the design rather than placeholders.
 */
export const exercises: Exercise[] = [
  {
    id: 'ex-barbell-squat',
    name: 'Barbell Squat',
    muscle: 'Quads · Glutes',
    sets: 4,
    reps: 8,
    restSec: 90,
    image: 'exercise1',
    description:
      'A foundational lower-body compound lift. Load the bar, brace your core, and drive through your heels.',
    instructions: [
      'Set the bar at shoulder height and step your feet just outside hip width.',
      'Brace your core, keep your chest tall, and sit your hips down and back.',
      'Drive through your whole foot to stand, locking your knees at the top.',
      'Keep your knees tracking over your toes the entire rep.',
    ],
    cues: ['Chest up', 'Knees tracking over toes', 'Full-foot pressure'],
  },
  {
    id: 'ex-bench-press',
    name: 'Bench Press',
    muscle: 'Chest · Triceps',
    sets: 4,
    reps: 10,
    restSec: 90,
    image: 'exercise2',
    description:
      'The primary horizontal press for chest development. Control the eccentric to keep the shoulder safe.',
    instructions: [
      'Lie with your eyes directly under the bar and plant your feet firmly.',
      'Grip slightly wider than shoulder width.',
      'Lower the bar to mid-chest with your elbows tucked to roughly 45°.',
      'Press up and slightly inward, finishing with a lockout over your shoulders.',
    ],
    cues: ['Shoulder blades pinned', 'Elbows at 45°', 'Controlled eccentric'],
  },
  {
    id: 'ex-pull-up',
    name: 'Pull-Up',
    muscle: 'Back · Biceps',
    sets: 4,
    reps: 8,
    restSec: 90,
    image: 'exercise3',
    description:
      'A vertical pull that trains lats, upper back and grip. Use a controlled tempo to stay tensioned.',
    instructions: [
      'Hang from the bar with palms facing away and arms fully extended.',
      'Pull your shoulder blades down before bending your elbows.',
      'Drive your elbows toward your ribs until your chin clears the bar.',
      'Lower under control to a full hang — do not swing.',
    ],
    cues: ['Start with the shoulder blades', 'No kipping', 'Full lockout at the bottom'],
  },
  {
    id: 'ex-overhead-press',
    name: 'Overhead Press',
    muscle: 'Shoulders · Triceps',
    sets: 3,
    reps: 10,
    restSec: 75,
    image: 'exercise4',
    description:
      'A strict vertical press for shoulder strength and overhead stability.',
    instructions: [
      'Set the bar at forehead height with your hands just outside shoulder width.',
      'Squeeze your glutes and brace to stop your lower back arching.',
      'Press straight up, moving your head back slightly then through the window.',
      'Lock out with the bar over your mid-foot.',
    ],
    cues: ['Ribs down', 'Move your head back', 'Lock out over mid-foot'],
  },
  {
    id: 'ex-romanian-deadlift',
    name: 'Romanian Deadlift',
    muscle: 'Hamstrings · Glutes',
    sets: 4,
    reps: 10,
    restSec: 90,
    image: 'exercise5',
    description:
      'A hip-hinge pattern that loads the posterior chain without bending the knee deeply.',
    instructions: [
      'Stand tall with the bar resting on your upper thighs.',
      'Soften your knees slightly and keep that angle fixed.',
      'Push your hips back, letting the bar graze your legs.',
      'Squeeze your glutes to return to standing.',
    ],
    cues: ['Hips back, not down', 'Flat back', 'Bar grazes the legs'],
  },
  {
    id: 'ex-dumbbell-row',
    name: 'Dumbbell Row',
    muscle: 'Lats · Mid Back',
    sets: 3,
    reps: 12,
    restSec: 60,
    image: 'exercise6',
    description:
      'A unilateral horizontal pull that balances upper-body development.',
    instructions: [
      'Place one knee on a bench and hinge your torso flat.',
      'Let the dumbbell hang, then pull it toward your hip.',
      'Keep your elbow close to your ribs and your torso still.',
      'Lower the weight to a full stretch under control.',
    ],
    cues: ['Flat torso', 'Elbow to hip', 'Pause at the top'],
  },
  {
    id: 'ex-plank',
    name: 'Plank',
    muscle: 'Core',
    sets: 3,
    durationSec: 45,
    restSec: 45,
    image: 'exercise7',
    description:
      'An isometric anti-extension hold that trains deep core stability.',
    instructions: [
      'Set your forearms directly under your shoulders.',
      'Extend your legs and squeeze your glutes.',
      'Brace your abdomen so your hips do not sag.',
      'Breathe steadily and hold the position.',
    ],
    cues: ['Hips level', 'Glutes squeezed', 'Steady breathing'],
  },
  {
    id: 'ex-burpee',
    name: 'Burpee',
    muscle: 'Full Body',
    sets: 4,
    reps: 12,
    restSec: 60,
    image: 'exercise8',
    description:
      'A full-body conditioning movement that spikes heart rate and total-body effort.',
    instructions: [
      'Stand tall with your feet under your hips.',
      'Squat down, plant your hands, and jump your feet into a plank.',
      'Complete an optional push-up from the plank.',
      'Jump the feet back in and leap up with an arm swing.',
    ],
    cues: ['Chest to floor', 'Land softly', 'Full arm extension on the jump'],
  },
  {
    id: 'ex-mountain-climber',
    name: 'Mountain Climber',
    muscle: 'Core · Cardio',
    sets: 3,
    durationSec: 40,
    restSec: 40,
    image: 'exercise9',
    description:
      'A dynamic core drill that pairs trunk stability with a raised heart rate.',
    instructions: [
      'Start in a high plank with hands under your shoulders.',
      'Drive one knee toward your chest without lifting your hips.',
      'Switch legs at a controlled pace.',
      'Keep your shoulders stacked over your wrists throughout.',
    ],
    cues: ['Hips steady', 'Fast feet, quiet shoulders', 'Full hip extension on each rep'],
  },
  {
    id: 'ex-glute-bridge',
    name: 'Glute Bridge',
    muscle: 'Glutes · Hamstrings',
    sets: 3,
    reps: 15,
    restSec: 45,
    image: 'exercise10',
    description:
      'A floor-based hip extension that wakes up the glutes with minimal spinal load.',
    instructions: [
      'Lie on your back with your knees bent and feet flat.',
      'Press through your heels and lift your hips to knee height.',
      'Squeeze your glutes hard at the top for a one-count hold.',
      'Lower slowly without letting your hips touch the floor.',
    ],
    cues: ['Ribs down', 'Squeeze at the top', 'Slow negative'],
  },
];

export const exercisesById: Record<string, Exercise> = Object.fromEntries(
  exercises.map((exercise) => [exercise.id, exercise])
);

export function getExercise(id: string): Exercise | undefined {
  return exercisesById[id];
}