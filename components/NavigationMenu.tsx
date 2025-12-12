import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
	ArrowLeft,
	ChevronRight,
	Bookmark,
	Archive,
	Activity,
	Bell,
	TimerIcon,
	Lock,
	Users,
} from "lucide-react-native";
import { Colors } from "@/constants/theme";

interface NavigationMenuProps {
	navMenuVisible: boolean;
	setNavMenuVisible: (visible: boolean) => void;
	colorScheme: "light" | "dark";
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
	navMenuVisible,
	setNavMenuVisible,
	colorScheme,
}) => {
	if (!navMenuVisible) return null;

	return (
		<TouchableOpacity
			style={styles(colorScheme).navMenuOverlay}
			activeOpacity={1}
			onPress={() => setNavMenuVisible(false)}
		>
			<TouchableOpacity
				style={styles(colorScheme).navMenuContainer}
				activeOpacity={1}
			>
				<View style={styles(colorScheme).navMenuHeader}>
					<TouchableOpacity
						onPress={() => setNavMenuVisible(false)}
						style={styles(colorScheme).navMenuClose}
					>
						<ArrowLeft size={24} color={Colors[colorScheme].text} />
					</TouchableOpacity>
					<Text style={styles(colorScheme).navMenuTitle}>
						Settings and activity
					</Text>
					<View style={{ width: 40 }} />
				</View>

				<View style={styles(colorScheme).navMenuContent}>
					<View style={styles(colorScheme).navMenuSection}>
						<Text style={styles(colorScheme).navSectionTitle}>
							How you use Qpoll
						</Text>

						<TouchableOpacity
							style={styles(colorScheme).navMenuItem}
							activeOpacity={0.7}
						>
							<View style={styles(colorScheme).navMenuItemLeft}>
								<Bookmark
									size={20}
									color={Colors[colorScheme].text}
								/>
								<Text
									style={styles(colorScheme).navMenuItemText}
								>
									Saved
								</Text>
							</View>
							<ChevronRight
								size={20}
								color={Colors[colorScheme].icon}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles(colorScheme).navMenuItem}
							activeOpacity={0.7}
						>
							<View style={styles(colorScheme).navMenuItemLeft}>
								<Archive
									size={20}
									color={Colors[colorScheme].text}
								/>
								<Text
									style={styles(colorScheme).navMenuItemText}
								>
									Archive
								</Text>
							</View>
							<ChevronRight
								size={20}
								color={Colors[colorScheme].icon}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles(colorScheme).navMenuItem}
							activeOpacity={0.7}
						>
							<View style={styles(colorScheme).navMenuItemLeft}>
								<Activity
									size={20}
									color={Colors[colorScheme].text}
								/>
								<Text
									style={styles(colorScheme).navMenuItemText}
								>
									Your activity
								</Text>
							</View>
							<ChevronRight
								size={20}
								color={Colors[colorScheme].icon}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles(colorScheme).navMenuItem}
							activeOpacity={0.7}
						>
							<View style={styles(colorScheme).navMenuItemLeft}>
								<Bell
									size={20}
									color={Colors[colorScheme].text}
								/>
								<Text
									style={styles(colorScheme).navMenuItemText}
								>
									Notifications
								</Text>
							</View>
							<ChevronRight
								size={20}
								color={Colors[colorScheme].icon}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles(colorScheme).navMenuItem}
							activeOpacity={0.7}
						>
							<View style={styles(colorScheme).navMenuItemLeft}>
								<TimerIcon
									size={20}
									color={Colors[colorScheme].text}
								/>
								<Text
									style={styles(colorScheme).navMenuItemText}
								>
									Time management
								</Text>
							</View>
							<ChevronRight
								size={20}
								color={Colors[colorScheme].icon}
							/>
						</TouchableOpacity>
					</View>

					<View style={styles(colorScheme).navMenuSection}>
						<Text style={styles(colorScheme).navSectionTitle}>
							Who can see your content
						</Text>

						<TouchableOpacity
							style={styles(colorScheme).navMenuItem}
							activeOpacity={0.7}
						>
							<View style={styles(colorScheme).navMenuItemLeft}>
								<Lock
									size={20}
									color={Colors[colorScheme].text}
								/>
								<Text
									style={styles(colorScheme).navMenuItemText}
								>
									Account privacy
								</Text>
							</View>
							<View style={styles(colorScheme).navMenuItemRight}>
								<Text
									style={styles(colorScheme).navMenuItemLabel}
								>
									Private
								</Text>
								<ChevronRight
									size={20}
									color={Colors[colorScheme].icon}
								/>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles(colorScheme).navMenuItem}
							activeOpacity={0.7}
						>
							<View style={styles(colorScheme).navMenuItemLeft}>
								<Users
									size={20}
									color={Colors[colorScheme].text}
								/>
								<Text
									style={styles(colorScheme).navMenuItemText}
								>
									Close Friends
								</Text>
							</View>
							<View style={styles(colorScheme).navMenuItemRight}>
								<Text
									style={styles(colorScheme).navMenuItemLabel}
								>
									49
								</Text>
								<ChevronRight
									size={20}
									color={Colors[colorScheme].icon}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

const styles = (colorScheme: "light" | "dark") =>
	StyleSheet.create({
		navMenuOverlay: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: colorScheme === "dark" ? "#151718" : "#ffffff",
		},
		navMenuContainer: {
			flex: 1,
			backgroundColor: colorScheme === "dark" ? "#151718" : "#ffffff",
		},
		navMenuHeader: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: 16,
			paddingVertical: 16,
			borderBottomWidth: 1,
			borderBottomColor: colorScheme === "dark" ? "#2a2a2a" : "#e0e0e0",
		},
		navMenuClose: {
			width: 40,
			height: 40,
			alignItems: "center",
			justifyContent: "center",
		},
		navMenuTitle: {
			fontSize: 18,
			fontWeight: "600",
			color: Colors[colorScheme].text,
		},
		navMenuContent: {
			flex: 1,
			paddingTop: 20,
		},
		navMenuSection: {
			marginBottom: 32,
			paddingHorizontal: 16,
		},
		navSectionTitle: {
			fontSize: 14,
			fontWeight: "600",
			color: Colors[colorScheme].icon,
			marginBottom: 16,
			paddingHorizontal: 4,
		},
		navMenuItem: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingVertical: 16,
			paddingHorizontal: 4,
		},
		navMenuItemLeft: {
			flexDirection: "row",
			alignItems: "center",
			gap: 12,
			flex: 1,
		},
		navMenuItemText: {
			fontSize: 16,
			fontWeight: "400",
			color: Colors[colorScheme].text,
		},
		navMenuItemRight: {
			flexDirection: "row",
			alignItems: "center",
			gap: 8,
		},
		navMenuItemLabel: {
			fontSize: 14,
			fontWeight: "400",
			color: Colors[colorScheme].icon,
		},
	});
