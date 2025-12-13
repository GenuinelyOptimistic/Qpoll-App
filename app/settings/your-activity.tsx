import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function YourActivity() {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const colorScheme = useColorScheme() ?? "light";

	const handleBack = () => {
		router.back();
	};

	return (
		<View
			style={[styles(colorScheme).container, { paddingTop: insets.top }]}
		>
			<View style={styles(colorScheme).header}>
				<TouchableOpacity
					onPress={handleBack}
					style={styles(colorScheme).backButton}
				>
					<ArrowLeft size={24} color={Colors[colorScheme].text} />
				</TouchableOpacity>
				<Text style={styles(colorScheme).title}>Your Activity</Text>
				<View style={{ width: 40 }} />
			</View>

			<ScrollView style={styles(colorScheme).content}>
				<Text style={styles(colorScheme).contentText}>
					This is the Your Activity settings page. Here you can view
					and manage your activity history.
				</Text>
				<View style={styles(colorScheme).dummyContent}>
					<Text style={styles(colorScheme).sectionTitle}>
						Recent Activity
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						View your recent posts, comments, and interactions.
					</Text>

					<Text style={styles(colorScheme).sectionTitle}>
						Activity Settings
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						Control what activity is visible to others and manage
						your activity preferences.
					</Text>
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
	});
