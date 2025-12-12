import React, { useState, useMemo } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

type AvatarStyle =
	| "avataaars"
	| "lorelei"
	| "micah"
	| "adventurer"
	| "bottts"
	| "pixel-art";

interface Avatar {
	id: string;
	uri: string;
	style: AvatarStyle;
}

const styleNames: AvatarStyle[] = [
	"avataaars",
	"lorelei",
	"micah",
	"adventurer",
	"bottts",
	"pixel-art",
];

const generateAvatarUri = (style: AvatarStyle, seed: string): string => {
	return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&size=200`;
};

export default function ProfilePhotoScreen() {
	const router = useRouter();
	const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
	const [visibleCount, setVisibleCount] = useState<number>(12);

	const avatars = useMemo(() => {
		const generatedAvatars: Avatar[] = [];

		for (let i = 0; i < visibleCount; i++) {
			const styleIndex = i % styleNames.length;
			const seed = `avatar-${i}-${Date.now()}`;
			const style = styleNames[styleIndex];

			generatedAvatars.push({
				id: seed,
				uri: generateAvatarUri(style, seed),
				style,
			});
		}

		return generatedAvatars;
	}, [visibleCount]);

	const handleAvatarPress = (avatarId: string) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setSelectedAvatar(avatarId);
	};

	const handleLoadMore = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setVisibleCount((prev) => prev + 12);
	};

	const handleNext = () => {
		if (!selectedAvatar) return;

		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		console.log("Selected avatar:", selectedAvatar);
		router.push("/(main)");
	};

	const handleUploadFromCamera = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		console.log("Upload from camera");
	};

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.main}>
					<Text style={styles.title}>PROFILE PHOTO</Text>
					<Text style={styles.subtitle}>
						If you had to create a username of Qpoll{"\n"}what it
						be?
					</Text>

					<View style={styles.avatarsGrid}>
						{avatars.map((avatar) => (
							<TouchableOpacity
								key={avatar.id}
								style={[
									styles.avatarContainer,
									selectedAvatar === avatar.id &&
										styles.avatarContainerSelected,
								]}
								onPress={() => handleAvatarPress(avatar.id)}
								activeOpacity={0.7}
							>
								<Image
									source={{ uri: avatar.uri }}
									style={styles.avatar}
									resizeMode="cover"
								/>
							</TouchableOpacity>
						))}
					</View>

					<TouchableOpacity
						onPress={handleLoadMore}
						activeOpacity={0.7}
						style={styles.loadMoreButton}
					>
						<Text style={styles.loadMoreText}>Load More</Text>
					</TouchableOpacity>

					<View style={styles.uploadButtons}>
						<TouchableOpacity
							onPress={handleUploadFromCamera}
							activeOpacity={0.7}
							style={styles.uploadButton}
						>
							<Text style={styles.uploadButtonText}>
								Upload From Camera
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleUploadFromCamera}
							activeOpacity={0.7}
							style={styles.uploadButton}
						>
							<Text style={styles.uploadButtonText}>
								Upload From Camera
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>

			<SafeAreaView edges={["bottom"]} style={styles.footer}>
				<TouchableOpacity
					style={[
						styles.nextButton,
						!selectedAvatar && styles.nextButtonDisabled,
					]}
					onPress={handleNext}
					activeOpacity={0.8}
					disabled={!selectedAvatar}
				>
					<Text style={styles.nextButtonText}>Next</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	scrollContent: {
		paddingTop: 60,
		paddingBottom: 40,
	},
	main: {
		paddingHorizontal: 24,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		color: "#1a1a1a",
		textAlign: "center",
		marginBottom: 16,
		letterSpacing: 0.5,
	},
	subtitle: {
		fontSize: 15,
		fontWeight: "400",
		color: "#999",
		textAlign: "center",
		marginBottom: 40,
		lineHeight: 22,
	},
	avatarsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: 16,
		marginBottom: 24,
	},
	avatarContainer: {
		width: "22%",
		aspectRatio: 1,
		borderRadius: 100,
		overflow: "hidden",
		borderWidth: 3,
		borderColor: "transparent",
	},
	avatarContainerSelected: {
		borderColor: "#5B93FF",
	},
	avatar: {
		width: "100%",
		height: "100%",
	},
	loadMoreButton: {
		alignSelf: "center",
		paddingVertical: 12,
		paddingHorizontal: 24,
		marginBottom: 32,
	},
	loadMoreText: {
		fontSize: 16,
		fontWeight: "500",
		color: "#5B93FF",
	},
	uploadButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 12,
		marginBottom: 24,
	},
	uploadButton: {
		flex: 1,
		paddingVertical: 14,
		alignItems: "center",
	},
	uploadButtonText: {
		fontSize: 15,
		fontWeight: "500",
		color: "#5B93FF",
	},
	footer: {
		paddingHorizontal: 24,
		paddingBottom: 16,
		paddingTop: 16,
	},
	nextButton: {
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
	nextButtonDisabled: {
		backgroundColor: "#ccc",
		shadowOpacity: 0,
		elevation: 0,
	},
	nextButtonText: {
		fontSize: 17,
		fontWeight: "600",
		color: "#ffffff",
		letterSpacing: 0.3,
	},
});
