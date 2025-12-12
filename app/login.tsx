import React, { useState } from "react";
import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Alert,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Typography } from "@/constants/theme";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = () => {
		if (!email || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		// For now, just simulate login and navigate to main app
		// In a real app, you'd validate credentials here
		router.replace("/welcome");
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<Stack.Screen options={{ headerShown: false }} />

			<ThemedView style={styles.content}>
				<ThemedText type="title" style={styles.title}>
					Welcome to Qpoll
				</ThemedText>
				<ThemedText type="subtitle" style={Typography.subtitle}>
					Quickly crowd source information to make more informed
					decisions
				</ThemedText>

				<ThemedView style={styles.form}>
					<ThemedText style={styles.label}>Email</ThemedText>
					<TextInput
						style={styles.input}
						value={email}
						onChangeText={setEmail}
						placeholder="Enter your email"
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
					/>

					<ThemedText style={styles.label}>Password</ThemedText>
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={setPassword}
						placeholder="Enter your password"
						secureTextEntry
						autoCapitalize="none"
						autoCorrect={false}
					/>

					<TouchableOpacity
						style={styles.button}
						onPress={handleLogin}
					>
						<ThemedText
							type="defaultSemiBold"
							style={styles.buttonText}
						>
							Sign In
						</ThemedText>
					</TouchableOpacity>
				</ThemedView>
			</ThemedView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	title: {
		textAlign: "center",
		marginBottom: 40,
	},
	form: {
		gap: 16,
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
	},
	input: {
		borderBottomWidth: 1,
		borderColor: "#ccc",
		padding: 12,
		fontSize: 16,
		backgroundColor: "#fff",
	},
	button: {
		backgroundColor: "#007AFF",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
});
