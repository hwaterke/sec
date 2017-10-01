MUSCLES = JSON.parse File.read 'models/muscles.json'

MUSCLE_NAMES_WITH_CARDIO = MUSCLES.map { |m| m['name'] }.push('Cardio')
