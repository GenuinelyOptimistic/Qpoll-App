import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import Header from "@/components/Header";

export default function AccountPrivacy() {
	const insets = useSafeAreaInsets();
	const colorScheme = useColorScheme() ?? "light";

	return (
		<View
			style={[styles(colorScheme).container, { paddingTop: insets.top }]}
		>
			<Header title="Account Privacy" />

			<ScrollView style={styles(colorScheme).content}>
				<Text style={styles(colorScheme).contentText}>
					This is the Account Privacy settings page. Here you can
					control who can see your content and interact with your
					account.
				</Text>
				<View style={styles(colorScheme).dummyContent}>
					<Text style={styles(colorScheme).sectionTitle}>
						Profile Visibility
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						Choose who can view your profile and posts.
					</Text>

					<Text style={styles(colorScheme).sectionTitle}>
						Interaction Settings
					</Text>
					<Text style={styles(colorScheme).dummyText}>
						Control who can send you messages and interact with your
						content.
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
