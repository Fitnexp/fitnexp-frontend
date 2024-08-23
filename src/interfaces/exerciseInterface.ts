export type Muscle =
    | 'abdominals'
    | 'hamstrings'
    | 'calves'
    | 'shoulders'
    | 'adductors'
    | 'glutes'
    | 'quadriceps'
    | 'biceps'
    | 'forearms'
    | 'abductors'
    | 'triceps'
    | 'chest'
    | 'lower back'
    | 'traps'
    | 'middle back'
    | 'lats'
    | 'neck';

export type Force = 'pull' | 'push' | 'static';

export type Level = 'beginner' | 'intermediate' | 'expert';

export type Mechanic = 'compound' | 'isolation';

export type Equipment =
    | 'body only'
    | 'machine'
    | 'kettlebells'
    | 'dumbbell'
    | 'cable'
    | 'barbell'
    | 'bands'
    | 'medicine ball'
    | 'exercise ball'
    | 'e-z curl bar'
    | 'foam roll'
    | 'other';

export type Category =
    | 'strength'
    | 'stretching'
    | 'plyometrics'
    | 'strongman'
    | 'powerlifting'
    | 'cardio'
    | 'olympic weightlifting'
    | 'crossfit'
    | 'weighted bodyweight'
    | 'assisted bodyweight';

export interface IExercise {
    _id: string;
    name: string;
    aliases?: string[];
    primaryMuscles: Muscle[];
    secondaryMuscles: Muscle[];
    force?: Force | null;
    level: Level;
    mechanic?: Mechanic | null;
    equipment?: Equipment | null;
    category: Category;
    instructions: string[];
    description?: string;
    tips?: string[];
    photo?: string;
}

export interface Set {
    repetitions: number;
    weight: number;
}

export interface ICompletedExercise {
    exercise_name: string;
    username: string;
    rest: number;
    sets: Set[];
}
