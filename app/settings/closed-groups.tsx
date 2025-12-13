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

export default function ClosedGroups() {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const colorScheme = useColorScheme() ?? "light";

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
				<Text style={styles(colorScheme).title}>Closed Groups</Text>
				<View style={{ width: 40 }} />
			</View>

			<ScrollView style={styles(colorScheme).content}>
				<Text style={styles(colorScheme).contentText}>
					This is the Closed Groups settings page. Here you can manage
					your private group memberships and settings.
				</Text>
				<View style={styles(colorScheme).dummyContent}>
					<Text style={styles(colorScheme).sectionTitle}>
						Group Memberships
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						View and manage the closed groups you belong to.
					</Text>

					<Text style={styles(colorScheme).sectionTitle}>
						Group Privacy
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						Control group visibility and membership settings.
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
