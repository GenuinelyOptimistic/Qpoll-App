import React, { useState, useMemo } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Check } from "lucide-react-native";
import LottieView from "lottie-react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

import { globalStyles } from "./constants/global";

//TODO: Add username availability check and error handling from databse
//TODO: If user has already entered an invite code, do not show the "we'll text you" message
//TODO: Test lottie animation performance on android devices
//TODO: Improve accessibility labels and hints
//TODO: Add analytics tracking for username creation events
//TODO: IF a user gets and invite from someone greet them as that persons friend

export default function CreateUsernameScreen() {
	const router = useRouter();
	const colorScheme = useColorScheme() ?? "light";
	const backgroundColor = useThemeColor({}, "background");
	const textColor = useThemeColor({}, "text");

	const [username, setUsername] = useState<string>("");
	const [isValid, setIsValid] = useState<boolean>(false);
	const [showSuccess, setShowSuccess] = useState<boolean>(false);

	const suggestions = useMemo(() => {
		if (!username) return [];

		const baseSuggestions = [
			`${username}2`,
			`${username}3`,
			`${username}4`,
			`${username}_official`,
			`${username}_real`,
			`the_${username}`,
		];

		return baseSuggestions.slice(0, 3);
	}, [username]);

	const handleUsernameChange = (text: string) => {
		if (!text.startsWith("@")) {
			text = "@" + text;
		}
		const usernameWithoutAt = text.slice(1);
		setUsername(usernameWithoutAt);
		setIsValid(usernameWithoutAt.length >= 3);
	};

	const handleSkip = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		router.push("/(main)");
	};

	const handleSignUp = () => {
		if (!isValid) return;
		else if (showSuccess) {
			router.push("/(main)");
			return;
		}
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		console.log("Username created:", username);
		setShowSuccess(true);
	};

	const handleSuggestionPress = (suggestion: string) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setUsername(suggestion);
		setIsValid(true);
	};

	return (
		<View
			style={[globalStyles(colorScheme).container, { backgroundColor }]}
		>
			<SafeAreaView edges={["top"]} style={styles(colorScheme).header}>
				<View style={styles(colorScheme).headerLeft} />
				<View style={styles(colorScheme).headerRight}>
					{!showSuccess && (
						<TouchableOpacity
							onPress={handleSkip}
							activeOpacity={0.7}
						>
							<Text style={styles(colorScheme).skipButton}>
								Skip
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</SafeAreaView>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles(colorScheme).content}
			>
				<ScrollView
					contentContainerStyle={styles(colorScheme).scrollContent}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<View>
						{!showSuccess && (
							<>
								<Text style={globalStyles(colorScheme).title}>
									Create username
								</Text>
								<Text
									style={globalStyles(colorScheme).subtitle}
								>
									You can always change this later.
								</Text>

								<View
									style={
										globalStyles(colorScheme).inputContainer
									}
								>
									<TextInput
										style={globalStyles(colorScheme).input}
										placeholder="@Username"
										placeholderTextColor={
											colorScheme === "dark"
												? "#888"
												: "#ccc"
										}
										value={"@" + username}
										onChangeText={handleUsernameChange}
										autoCapitalize="none"
										autoCorrect={false}
										autoFocus
									/>
									{isValid && (
										<View
											style={
												styles(colorScheme).checkmark
											}
										>
											<Check
												size={24}
												color="#4CD964"
												strokeWidth={3}
											/>
										</View>
									)}
								</View>
							</>
						)}

						{suggestions.length > 0 && !showSuccess && (
							<View
								style={styles(colorScheme).suggestionsContainer}
							>
								<Text
									style={styles(colorScheme).suggestionsLabel}
								>
									Suggested
								</Text>
								<ScrollView
									horizontal
									showsHorizontalScrollIndicator={false}
									contentContainerStyle={
										styles(colorScheme).suggestionsScroll
									}
								>
									{suggestions.map((suggestion, index) => (
										<TouchableOpacity
											key={index}
											style={
												styles(colorScheme)
													.suggestionChip
											}
											onPress={() =>
												handleSuggestionPress(
													suggestion
												)
											}
											activeOpacity={0.7}
										>
											<Text
												style={
													styles(colorScheme)
														.suggestionText
												}
											>
												{suggestion}
											</Text>
										</TouchableOpacity>
									))}
								</ScrollView>
							</View>
						)}

						{showSuccess && (
							<View style={styles(colorScheme).successContainer}>
								<LottieView
									source={require("../assets/animations/success.json")}
									autoPlay
									loop={false}
									style={style.lottieAnimation}
									speed={0.5}
								/>
								<Text
									style={[
										styles(colorScheme).successTitle,
										{ marginTop: -40 },
									]}
								>
									🥳 Perfect! We've reserved @{username} for
									you!{" "}
								</Text>
								<Text
									style={[
										styles(colorScheme).successSubtitle,
										{
											paddingHorizontal: 40,
											textAlign: "center",
										},
									]}
								>
									{/* TODO: Do not show this if you already entered an invite code*/}
									We'll text you with details as soon as your
									account is ready.
								</Text>
							</View>
						)}
					</View>
				</ScrollView>

				<SafeAreaView
					edges={["bottom"]}
					style={styles(colorScheme).footer}
				>
					<TouchableOpacity
						style={[
							styles(colorScheme).signUpButton,
							!isValid &&
								styles(colorScheme).signUpButtonDisabled,
						]}
						onPress={handleSignUp}
						activeOpacity={0.8}
						disabled={!isValid}
					>
						<Text style={styles(colorScheme).signUpButtonText}>
							{!showSuccess
								? "Reserve"
								: "Start Asking Questions"}
						</Text>
					</TouchableOpacity>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = (colorScheme: "light" | "dark") =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Colors[colorScheme].background,
		},
		skipButton: {
			fontSize: 16,
			fontWeight: "400",
			color: Colors[colorScheme].icon,
		},
		suggestionsLabel: {
			fontSize: 14,
			fontWeight: "500",
			color: Colors[colorScheme].icon,
			marginBottom: 16,
		},
		suggestionChip: {
			paddingHorizontal: 20,
			paddingVertical: 12,
			backgroundColor: Colors[colorScheme].background,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: colorScheme === "dark" ? "#333" : "#e0e0e0",
		},
		suggestionText: {
			fontSize: 15,
			fontWeight: "500",
			color: Colors[colorScheme].text,
		},
		successTitle: {
			fontSize: 28,
			fontWeight: "700",
			color: Colors[colorScheme].text,
			marginBottom: 12,
			textAlign: "center",
		},
		successSubtitle: {
			fontSize: 16,
			fontWeight: "400",
			color: Colors[colorScheme].icon,
		},

		header: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: 24,
			paddingVertical: 12,
		},
		headerLeft: {
			flex: 1,
		},
		headerRight: {
			flex: 1,
			alignItems: "flex-end",
		},
		content: {
			flex: 1,
		},
		scrollContent: {
			flexGrow: 1,
		},
		checkmark: {
			marginLeft: 12,
		},
		suggestionsContainer: {
			marginTop: 20,
		},
		suggestionsScroll: {
			gap: 12,
		},
		footer: {
			paddingHorizontal: 24,
			paddingBottom: 16,
			paddingTop: 16,
		},
		signUpButton: {
			backgroundColor: "#5B93FF",
			paddingVertical: 18,
			borderRadius: 12,
			alignItems: "center",
			shadowColor: "#5B93FF",
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowOpacity: 0.2,
			shadowRadius: 8,
			elevation: 5,
		},
		signUpButtonDisabled: {
			backgroundColor: "#ccc",
			shadowOpacity: 0,
			elevation: 0,
		},
		signUpButtonText: {
			fontSize: 17,
			fontWeight: "600",
			color: "#ffffff",
			letterSpacing: 0.3,
		},
		successContainer: {
			alignItems: "center",
			justifyContent: "center",
			marginTop: 80,
		},
		successCircle: {
			width: 96,
			height: 96,
			borderRadius: 48,
			backgroundColor: "#4CD964",
			alignItems: "center",
			justifyContent: "center",
			marginBottom: 32,
		},
	});

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	lottieAnimation: {
		width: 250, // Specify width
		height: 250, // Specify height
	},
});
