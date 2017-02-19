# Creates some dummy data for use in development.
puts 'Development configuration'

chest_press = Exercise.create(name: 'Chest Press', repetitions: true, weight: true)
Exercise.create(name: 'Rowing', repetitions: true, weight: true)
Exercise.create(name: 'Biceps Curls', repetitions: true, weight: true)
Exercise.create(name: 'Lateral Raise', repetitions: true, weight: true)
Exercise.create(name: 'Barbell Bench Press', repetitions: true, weight: true)
Exercise.create(name: 'Barbell Incline Bench Press', repetitions: true, weight: true)
Exercise.create(name: 'Barbell Decline Bench Press', repetitions: true, weight: true)
Exercise.create(name: 'Shoulder Press Machine', repetitions: true, weight: true)
Exercise.create(name: 'Diverging Shoulder Press Machine', repetitions: true, weight: true)
Exercise.create(name: 'Abs Workout')
a = Exercise.create(name: 'Shoulder Press', weight: true)
b = Exercise.create(name: 'Stepper', time: true, distance: true)

WorkoutSet.create(exercise: a, repetitions: 12, weight: 36_000)
WorkoutSet.create(exercise: b, time: '00:08:00', distance: 880)

WorkoutSet.create(exercise: chest_press, repetitions: 12, weight: 30_000, executed_at: '2017-01-01 13:00:00')
WorkoutSet.create(exercise: chest_press, repetitions: 12, weight: 32_000, executed_at: '2017-01-01 13:02:00')
WorkoutSet.create(exercise: chest_press, repetitions: 12, weight: 34_000, executed_at: '2017-01-01 13:04:00')
WorkoutSet.create(exercise: chest_press, repetitions: 12, weight: 36_000, executed_at: '2017-01-01 13:06:00')
