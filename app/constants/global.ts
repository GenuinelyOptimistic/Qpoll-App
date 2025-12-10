
import { Platform } from 'react-native';

export const globalStyles = {
  container: {
    flex: 1,
    padding: 20,
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
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#292929ff',
    textAlign: 'center' as const,
    marginTop: 10,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center' as const,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 24,
  },
  textContent: {
    gap: 24,
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 21
  },
  bold: {
    fontWeight: 'bold' as const,
    fontSize: 14,
    lineHeight: 21,
  },
  italic: {
    fontStyle: 'italic' as const,
    fontSize: 14,
    lineHeight: 21,
  },
  buttonContainer: {
    width: '100%' as const,
    resizeMode: 'contain' as const,
    backgroundColor: '#5B93FF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center' as const,
    shadowColor: '#5B93FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  linkText: {
    fontSize: 14,
    color: '#5B93FF',
  },
  center: {
    textAlign: 'center' as const,
  },
};
