import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import Header from "@/components/Header";

export default function Notifications() {
	const insets = useSafeAreaInsets();
	const colorScheme = useColorScheme() ?? "light";

	return (
		<View
			style={[styles(colorScheme).container, { paddingTop: insets.top }]}
		>
			<Header title="Notifications" />

			<ScrollView style={styles(colorScheme).content}>
				<Text style={styles(colorScheme).contentText}>
					This is the Notifications settings page. Here you can
					customize your notification preferences.
				</Text>
				<View style={styles(colorScheme).dummyContent}>
					<Text style={styles(colorScheme).sectionTitle}>
						Push Notifications
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						Manage push notification settings for new messages,
						likes, and updates.
					</Text>

					<Text style={styles(colorScheme).sectionTitle}>
						Email Notifications
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						Control email notifications for important updates and
						activity summaries.
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
