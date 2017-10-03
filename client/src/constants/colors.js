export const colors = {
  headerColor: '#80CBC4',
  headerTintColor: 'white',
  tintColor: '#2f95dc',
  backgroundColor: '#FAFAFA',
  borderColor: '#E5E5E5',
  darkPrimaryColor: '#80CBC4',
  discreteTextColor: '#999'
};

export const gradientForType = type => {
  switch (type) {
    case 'normal':
      return ['#eacda3', '#d6ae7b'];
    case 'electric':
      return ['#f1c40f', '#ffb347'];
    case 'water':
      return ['#A7BFE8', '#6190E8'];
    case 'fire':
      return ['#DE6262', '#FFB88C'];
    case 'poison':
      return ['#B993D6', '#8CA6DB'];
  }
  return ['#DAD299', '#B0DAB9'];
};
