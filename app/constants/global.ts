
import { Platform } from 'react-native';

export const globalStyles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    paddingBottom: 20,
  },
  customBackButton: {
    zIndex: 1,
    paddingVertical: 10,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#292929ff',
    textAlign: 'center' as const,
    marginTop: 10,
    marginBottom: 20,
  },
};
