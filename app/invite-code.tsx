import { useState } from "react";
import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "./constants/global";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function PhoneScreen() {
	const colorScheme = useColorScheme() ?? "light";
	const backgroundColor = useThemeColor({}, "background");
	const textColor = useThemeColor({}, "text");
	const iconColor = useThemeColor({}, "icon");

	const [inviteCode, setInviteCode] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleBackPress = () => {
		router.back();
	};

	const registerWithInviteCode = async () => {
		setLoading(true);
		// Simulate an API call
		setTimeout(() => {
			setLoading(false);
			// On success, navigate to the main app screen
			router.push("/username");
		}, 2000);
	};

	return (
		<View
			style={[globalStyles(colorScheme).container, { backgroundColor }]}
		>
			<View>
				<View>
					<TouchableOpacity
						style={globalStyles(colorScheme).customBackButton}
						onPress={handleBackPress}
					>
						<MaterialIcons
							name="arrow-back"
							size={32}
							color={iconColor}
						/>
					</TouchableOpacity>
				</View>
				<Text style={globalStyles(colorScheme).title}>Invite Code</Text>
				<Text style={globalStyles(colorScheme).subtitle}>
					Enter the invite code you recieved via email or text to
					validate your account.
				</Text>
				<View style={globalStyles(colorScheme).inputContainer}>
					<TextInput
						autoCorrect={false}
						autoComplete="off"
						spellCheck={false}
						style={globalStyles(colorScheme).input}
						value={inviteCode}
						onChangeText={(text) =>
							setInviteCode(text.toUpperCase())
						}
						placeholder="Invite code"
						autoCapitalize="characters"
					/>
				</View>

				<TouchableOpacity
					style={globalStyles(colorScheme).buttonContainer}
					onPress={registerWithInviteCode}
					disabled={loading}
				>
					<Text style={globalStyles(colorScheme).buttonText}>
						{loading ? "Sending..." : "Verify Invite Code"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
