import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router } from "expo-router";

interface HeaderProps {
	title: string;
	onBack?: () => void;
}

export default function Header({ title, onBack }: HeaderProps) {
	const colorScheme = useColorScheme() ?? "light";
	const handleBack = onBack || (() => router.back());

	return (
		<View style={styles(colorScheme).header}>
			<TouchableOpacity
				onPress={handleBack}
				style={styles(colorScheme).backButton}
			>
				<ArrowLeft size={24} color={Colors[colorScheme].text} />
			</TouchableOpacity>
			<Text style={styles(colorScheme).title}>{title}</Text>
			<View style={{ width: 40 }} />
		</View>
	);
}

const styles = (colorScheme: "light" | "dark") =>
	StyleSheet.create({
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
	});
