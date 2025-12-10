export const Content = {
  flex: 1,
  justifyContent: 'center' as const,
  paddingHorizontal: 20,
  paddingVertical: 16,
  gap: 24,
}

export const TextContent = {
  gap: 24,
  marginBottom: 24,
}

export const Paragraph = {
  fontSize: 14,
  lineHeight: 21
}

export const Bold = {
  fontWeight: 'bold' as const,
  fontSize: 14,
  lineHeight: 21,
}

export const Italic = {
  fontStyle: 'italic' as const,
  fontSize: 14,
  lineHeight: 21,
}   

export const ButtonContainer = {
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
  }

export const ButtonText = {
    fontSize: 17,
    fontWeight: '600' as const,
    color: '#ffffff',
    letterSpacing: 0.3,
}

export const LinkText = {
    fontSize: 14,
    color: '#5B93FF',
}

export const Center = {
    textAlign: 'center' as const,
}
