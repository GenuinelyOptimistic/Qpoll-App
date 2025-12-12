import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { CATEGORIES, Category } from "./constants/categories";
import { useCategories } from "./context/CategoryContext";

export default function InterestScreen() {
	const { selectedCategories, toggleCategory, isLoaded } = useCategories();
	const router = useRouter();

	const handleToggleCategory = (category: Category) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		toggleCategory(category);
	};

	const handleSubmit = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		router.push("/(main)");
	};

	if (!isLoaded) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.loadingContainer}>
					<Text style={styles.loadingText}>Loading...</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<View style={styles.container}>
			<SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.header}>
						<Text style={styles.title}>CATEGORY</Text>
						<Text style={styles.subtitle}>
							What type of polls are you interested in{"\n"}
							participating in?
						</Text>
					</View>

					<View style={styles.categoriesContainer}>
						{CATEGORIES.map((category) => {
							const isSelected =
								selectedCategories.includes(category);
							return (
								<TouchableOpacity
									key={category}
									style={[
										styles.categoryButton,
										isSelected &&
											styles.categoryButtonSelected,
									]}
									onPress={() =>
										handleToggleCategory(category)
									}
									activeOpacity={0.7}
								>
									<Text
										style={[
											styles.categoryText,
											isSelected &&
												styles.categoryTextSelected,
										]}
									>
										#{category}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</ScrollView>

				<View style={styles.submitContainer}>
					<TouchableOpacity
						style={styles.submitButton}
						onPress={handleSubmit}
						activeOpacity={0.8}
					>
						<Text style={styles.submitButtonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	safeArea: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 24,
		paddingBottom: 120,
	},
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	loadingText: {
		fontSize: 16,
		fontWeight: "500",
		color: "#999",
	},
	header: {
		alignItems: "center",
		marginTop: 60,
		marginBottom: 60,
	},
	title: {
		fontSize: 26,
		fontWeight: "800",
		color: "#1a1a1a",
		letterSpacing: 1,
		marginBottom: 16,
	},
	subtitle: {
		fontSize: 15,
		fontWeight: "400",
		color: "#999",
		textAlign: "center",
		lineHeight: 22,
	},
	categoriesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 12,
	},
	categoryButton: {
		paddingHorizontal: 28,
		paddingVertical: 14,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: "#5B93FF",
		backgroundColor: "#ffffff",
	},
	categoryButtonSelected: {
		backgroundColor: "#5B93FF",
		borderColor: "#5B93FF",
	},
	categoryText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#5B93FF",
	},
	categoryTextSelected: {
		color: "#ffffff",
	},
	submitContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 24,
		paddingBottom: 40,
		backgroundColor: "transparent",
	},
	submitButton: {
		backgroundColor: "#5B93FF",
		paddingVertical: 20,
		borderRadius: 30,
		alignItems: "center",
		shadowColor: "#5B93FF",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.4,
		shadowRadius: 20,
		elevation: 10,
	},
	submitButtonText: {
		fontSize: 20,
		fontWeight: "600",
		color: "#ffffff",
		letterSpacing: 0.5,
	},
});
