import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import Header from "@/components/Header";

export default function Following() {
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
			<Header title="Following" onBack={handleBack} />

			<ScrollView style={styles(colorScheme).content}>
				<Text style={styles(colorScheme).contentText}>
					This is the Following settings page. Here you can manage who
					you follow and your following settings.
				</Text>
				{/* Add dummy content here */}
				<View style={styles(colorScheme).dummyContent}>
					<Text style={styles(colorScheme).sectionTitle}>
						Followed Accounts
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						You are currently following 42 accounts.
					</Text>

					<Text style={styles(colorScheme).sectionTitle}>
						Following Preferences
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						Configure your following notifications and privacy
						settings.
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
