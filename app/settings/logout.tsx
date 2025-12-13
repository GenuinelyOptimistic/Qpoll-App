import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/context/auth";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function Logout() {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const { logout } = useAuth();
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const colorScheme = useColorScheme() ?? "light";

	const handleLogout = async () => {
		Alert.alert(
			"Log Out",
			"Are you sure you want to log out of your account?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Log Out",
					style: "destructive",
					onPress: async () => {
						setIsLoggingOut(true);
						try {
							await logout();
							// Navigate to login screen after logout
							router.replace("/login");
						} catch (error) {
							console.error("Logout error:", error);
							Alert.alert(
								"Error",
								"Failed to log out. Please try again."
							);
						} finally {
							setIsLoggingOut(false);
						}
					},
				},
			]
		);
	};

	return (
		<View
			style={[styles(colorScheme).container, { paddingTop: insets.top }]}
		>
			<View style={styles(colorScheme).header}>
				<TouchableOpacity
					onPress={() => router.back()}
					style={styles(colorScheme).backButton}
				>
					<ArrowLeft size={24} color={Colors[colorScheme].text} />
				</TouchableOpacity>
				<Text style={styles(colorScheme).title}>Log Out</Text>
				<View style={{ width: 40 }} />
			</View>

			<ScrollView style={styles(colorScheme).content}>
				<Text style={styles(colorScheme).contentText}>
					You are about to log out of your StreetTalk account.
				</Text>
				<View style={styles(colorScheme).dummyContent}>
					<Text style={styles(colorScheme).sectionTitle}>
						What happens when you log out?
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						• You will be signed out of your account • You will need
						to log in again to access your account • Your data will
						remain secure
					</Text>

					<TouchableOpacity
						style={[
							styles(colorScheme).logoutButton,
							isLoggingOut &&
								styles(colorScheme).logoutButtonDisabled,
						]}
						onPress={handleLogout}
						disabled={isLoggingOut}
					>
						<Text style={styles(colorScheme).logoutButtonText}>
							{isLoggingOut ? "Logging Out..." : "Log Out"}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = (colorScheme: "light" | "dark") =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colorScheme === "dark" ? "#151718" : "#ffffff",
		},
		header: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: 16,
			paddingVertical: 16,
			borderBottomWidth: 1,
			borderBottomColor: colorScheme === "dark" ? "#2a2a2a" : "#e0e0e0",
		},
		backButton: {
			width: 40,
			height: 40,
			alignItems: "center",
			justifyContent: "center",
		},
		title: {
			fontSize: 18,
			fontWeight: "600",
			color: Colors[colorScheme].text,
		},
		content: {
			flex: 1,
			padding: 16,
		},
		contentText: {
			fontSize: 16,
			color: Colors[colorScheme].text,
			marginBottom: 20,
		},
		dummyContent: {
			marginTop: 20,
		},
		sectionTitle: {
			fontSize: 18,
			fontWeight: "600",
			color: Colors[colorScheme].text,
			marginBottom: 10,
			marginTop: 20,
		},
		dummyText: {
			fontSize: 14,
			color: Colors[colorScheme].icon,
			lineHeight: 20,
		},
		logoutButton: {
			backgroundColor: "#dc3545",
			paddingVertical: 16,
			paddingHorizontal: 24,
			borderRadius: 8,
			alignItems: "center",
			marginTop: 30,
		},
		logoutButtonDisabled: {
			opacity: 0.6,
		},
		logoutButtonText: {
			color: "#ffffff",
			fontSize: 16,
			fontWeight: "600",
		},
	});
