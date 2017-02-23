# Creates some dummy data for use in development.
puts 'Development configuration'

user = User.create(
  email: '123',
  password: '123',
  password_confirmation: '123'
)

chest_press = Exercise.create(user: user, name: 'Chest Press', repetitions: true, weight: true)
Exercise.create(user: user, name: 'Rowing', repetitions: true, weight: true)
Exercise.create(user: user, name: 'Biceps Curls', repetitions: true, weight: true)
Exercise.create(user: user, name: 'Lateral Raise', repetitions: true, weight: true)
Exercise.create(user: user, name: 'Barbell Bench Press', repetitions: true, weight: true)
Exercise.create(user: user, name: 'Barbell Incline Bench Press', repetitions: true, weight: true)
Exercise.create(user: user, name: 'Barbell Decline Bench Press', repetitions: true, weight: true)
Exercise.create(user: user, name: 'Shoulder Press Machine', repetitions: true, weight: true)
Exercise.create(user: user, name: 'Diverging Shoulder Press Machine', repetitions: true, weight: true)
Exercise.create(user: user, name: 'Abs Workout')
a = Exercise.create(user: user, name: 'Shoulder Press', weight: true)
b = Exercise.create(user: user, name: 'Stepper', time: true, distance: true)

WorkoutSet.create(user: user, exercise: a, repetitions: 12, weight: 36_000)
WorkoutSet.create(user: user, exercise: b, time: '00:08:00', distance: 880)

WorkoutSet.create(user: user, exercise: chest_press, repetitions: 12, weight: 30_000, executed_at: '2017-01-01 13:00:00')
WorkoutSet.create(user: user, exercise: chest_press, repetitions: 12, weight: 32_000, executed_at: '2017-01-01 13:02:00')
WorkoutSet.create(user: user, exercise: chest_press, repetitions: 12, weight: 34_000, executed_at: '2017-01-01 13:04:00')
WorkoutSet.create(user: user, exercise: chest_press, repetitions: 12, weight: 36_000, executed_at: '2017-01-01 13:06:00')
