import { Platform } from "react-native";
import { Colors } from "@/constants/theme";

export const globalStyles = (theme: "light" | "dark") => ({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		marginTop: 50,
		fontSize: 24,
		fontWeight: "bold" as const,
		marginBottom: 10,
		color: Colors[theme].text,
	},
	subtitle: {
		fontSize: 12,
		color: Colors[theme].text,
		lineHeight: 18,
		marginBottom: 20,
	},
	customBackButton: {
		zIndex: 1,
		paddingTop: Platform.OS === "ios" ? 40 : 10,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold" as const,
		color: Colors[theme].text,
		textAlign: "center" as const,
		marginTop: 10,
		marginBottom: 20,
	},
	content: {
		flex: 1,
		justifyContent: "center" as const,
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
		lineHeight: 21,
	},
	bold: {
		fontWeight: "bold" as const,
		fontSize: 14,
		lineHeight: 21,
	},
	italic: {
		fontStyle: "italic" as const,
		fontSize: 14,
		lineHeight: 21,
	},

	inputContainer: {
		flexDirection: "row" as const,
		alignItems: "center" as const,
		marginBottom: 20,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: Colors[theme].icon,
		borderRadius: 8,
		padding: 15,
		fontSize: 18,
		color: Colors[theme].text,
	},
	buttonContainer: {
		width: "100%" as const,
		resizeMode: "contain" as const,
		backgroundColor: Colors[theme].tint,
		padding: 14,
		borderRadius: 10,
		alignItems: "center" as const,
		shadowColor: Colors[theme].tint,
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
		fontWeight: "500" as const,
		color: theme === "light" ? "#ffffff" : Colors[theme].text,
		letterSpacing: 0.3,
	},
	linkText: {
		fontSize: 14,
		color: "#5B93FF",
	},
	center: {
		textAlign: "center" as const,
	},
});
