import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import Header from "@/components/Header";

export default function ManageAccount() {
	const insets = useSafeAreaInsets();
	const colorScheme = useColorScheme() ?? "light";

	return (
		<View
			style={[styles(colorScheme).container, { paddingTop: insets.top }]}
		>
			<Header title="Manage Account" />

			<ScrollView style={styles(colorScheme).content}>
				<Text style={styles(colorScheme).contentText}>
					This is the Manage Account settings page. Here you can
					update your account information and preferences.
				</Text>
				<View style={styles(colorScheme).dummyContent}>
					<Text style={styles(colorScheme).sectionTitle}>
						Personal Information
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						Update your name, email, and contact details.
					</Text>

					<Text style={styles(colorScheme).sectionTitle}>
						Account Security
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						Change password, enable two-factor authentication.
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
