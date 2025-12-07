import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#191B1F',
    secondary: '#414757',
    error: '#f13a59',
    success: '#00B386',
    surface: '#ffffff',
  },
  pullRight: {
    textAlign: 'right',
  },
  mb: {
    marginButtom: 10,
  },
  warning: {
    color: '#feac33',
  },
  danger: {
    color: '#ff5862',
  },
  focus: {
    color: '#4B4E53',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 35,
    paddingVertical: 35,
  },
}
