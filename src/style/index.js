import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'html': {
    'background': '#EEE',
    'color': '#444',
    'WebkitFontSmoothing': 'antialiased',
    'MozOsxFontSmoothing': 'grayscale'
  },
  'body': {
    'background': '#EEE',
    'color': '#444',
    'WebkitFontSmoothing': 'antialiased',
    'MozOsxFontSmoothing': 'grayscale'
  },
  'form': {
    'background': '#fff',
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }]
  },
  'a': {
    'textDecoration': 'none',
    'color': '#673ab7'
  },
  'mdl-card': {
    'width': [{ 'unit': '%H', 'value': 0.45 }],
    'margin': [{ 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': 'auto' }],
    'transition': 'all .3s',
    'transform': 'translateY(100px)'
  },
  'mdl-card h3': {
    'paddingLeft': [{ 'unit': 'px', 'value': 35 }]
  },
  'error': {
    'transform': 'translateY(250px)'
  },
  'error b': {
    'color': '#C62828'
  },
  'footer': {
    'textAlign': 'center',
    'marginTop': [{ 'unit': 'px', 'value': 200 }]
  }
});
