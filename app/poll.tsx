import React, { useState, useRef, useMemo } from "react";
import {
	StyleSheet,
	Text,
	View,
	Animated,
	PanResponder,
	Dimensions,
	TouchableOpacity,
	Alert,
	Share,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	Heart,
	MoreVertical,
	Check,
	Clock,
	Plus,
	Menu,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { mockPolls, Poll, PollOption } from "./mocks/polls";
import { useCategories } from "./context/CategoryContext";
import { NavigationMenu } from "@/components/NavigationMenu";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function PollScreen() {
	const router = useRouter();
	const { selectedCategories, isLoaded } = useCategories();
	const colorScheme = useColorScheme() ?? "light";
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [allPolls, setAllPolls] = useState<Poll[]>(mockPolls);
	const [menuVisible, setMenuVisible] = useState<boolean>(false);
	const [navMenuVisible, setNavMenuVisible] = useState<boolean>(false);
	const position = useRef(new Animated.ValueXY()).current;
	const rotateValue = useRef(new Animated.Value(0)).current;
	const menuAnimation = useRef(new Animated.Value(0)).current;
	const menuTranslateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

	const polls = useMemo(() => {
		if (selectedCategories.length === 0) {
			return allPolls;
		}
		return allPolls.filter((poll) =>
			selectedCategories.includes(poll.category)
		);
	}, [allPolls, selectedCategories]);

	const currentPoll = polls[currentIndex];

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (_, gesture) => {
				position.setValue({ x: gesture.dx, y: gesture.dy });
				rotateValue.setValue(gesture.dx);
			},
			onPanResponderRelease: (_, gesture) => {
				if (gesture.dx > SWIPE_THRESHOLD) {
					handleSwipeRight();
				} else if (gesture.dx < -SWIPE_THRESHOLD) {
					handleSwipeLeft();
				} else {
					Animated.spring(position, {
						toValue: { x: 0, y: 0 },
						useNativeDriver: false,
						friction: 4,
					}).start();
					Animated.spring(rotateValue, {
						toValue: 0,
						useNativeDriver: false,
						friction: 4,
					}).start();
				}
			},
		})
	).current;

	const handleSwipeRight = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		Animated.timing(position, {
			toValue: { x: SCREEN_WIDTH + 100, y: 0 },
			duration: 250,
			useNativeDriver: false,
		}).start(() => {
			moveToNext();
		});
	};

	const handleSwipeLeft = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		Animated.timing(position, {
			toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
			duration: 250,
			useNativeDriver: false,
		}).start(() => {
			moveToNext();
		});
	};

	const moveToNext = () => {
		setCurrentIndex((prev) => {
			if (prev + 1 >= polls.length) {
				return 0;
			}
			return prev + 1;
		});
		position.setValue({ x: 0, y: 0 });
		rotateValue.setValue(0);
	};

	const handleLike = () => {
		if (!currentPoll) return;
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

		const updatedPolls = allPolls.map((poll) => {
			if (poll.id === currentPoll.id) {
				return { ...poll, liked: !poll.liked };
			}
			return poll;
		});
		setAllPolls(updatedPolls);

		console.log(`Poll ${currentPoll.id} liked:`, !currentPoll.liked);
	};

	const handleFlag = () => {
		if (!currentPoll) return;
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
		closeMenu();

		Alert.alert("Flag Poll", "Report this poll as inappropriate?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Report",
				style: "destructive",
				onPress: () => {
					console.log(`Poll ${currentPoll.id} flagged`);
					moveToNext();
				},
			},
		]);
	};

	const handleEdit = () => {
		if (!currentPoll) return;
		closeMenu();

		if (!currentPoll.isOwner) {
			Alert.alert("Cannot Edit", "You can only edit polls you created.");
			return;
		}

		if (currentPoll.hasResponses) {
			Alert.alert("Cannot Edit", "This poll already has responses.");
			return;
		}

		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		Alert.alert("Edit Poll", "Edit functionality would open here.");
		console.log(`Editing poll ${currentPoll.id}`);
	};

	const handleShare = async () => {
		if (!currentPoll) return;
		closeMenu();

		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

		try {
			const result = await Share.share({
				message: `Check out this poll: "${currentPoll.question}"`,
				url: `https://pollapp.com/poll/${currentPoll.id}`,
			});

			if (result.action === Share.sharedAction) {
				console.log("Poll shared successfully");
			}
		} catch (error) {
			console.error("Error sharing poll:", error);
		}
	};

	const handleVote = (optionId: string) => {
		if (!currentPoll) return;
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

		const updatedPolls = allPolls.map((poll) => {
			if (poll.id === currentPoll.id) {
				const updatedOptions = poll.options.map((opt) => {
					if (opt.id === optionId) {
						return { ...opt, votes: opt.votes + 1 };
					}
					return opt;
				});
				return {
					...poll,
					userVoted: true,
					votes: poll.votes + 1,
					options: updatedOptions,
				};
			}
			return poll;
		});

		setAllPolls(updatedPolls);
		console.log(`Voted for option ${optionId} in poll ${currentPoll.id}`);
	};

	const handleCreatePoll = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		router.push("/create-poll");
		console.log("Creating new poll");
	};

	const closeMenu = () => {
		Animated.parallel([
			Animated.timing(menuAnimation, {
				toValue: 0,
				duration: 999,
				useNativeDriver: true,
			}),
			Animated.timing(menuTranslateX, {
				toValue: SCREEN_WIDTH,
				duration: 999,
				useNativeDriver: true,
			}),
		]).start(() => {
			setMenuVisible(false);
			menuTranslateX.setValue(-SCREEN_WIDTH);
		});
	};

	const toggleMenu = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		if (menuVisible) {
			closeMenu();
		} else {
			setMenuVisible(true);
			Animated.parallel([
				Animated.timing(menuAnimation, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
				Animated.timing(menuTranslateX, {
					toValue: 0,
					duration: 200,
					useNativeDriver: true,
				}),
			]).start();
		}
	};

	const toggleNavMenu = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setNavMenuVisible(!navMenuVisible);
	};

	if (!isLoaded) {
		return (
			<SafeAreaView style={styles(colorScheme).container}>
				<View style={styles(colorScheme).emptyContainer}>
					<Text style={styles(colorScheme).emptyText}>
						Loading...
					</Text>
				</View>
			</SafeAreaView>
		);
	}

	if (!currentPoll) {
		return (
			<SafeAreaView style={styles(colorScheme).container}>
				<View style={styles(colorScheme).emptyContainer}>
					<Text style={styles(colorScheme).emptyText}>
						{selectedCategories.length > 0
							? "No polls in selected categories"
							: "No more polls!"}
					</Text>
				</View>
			</SafeAreaView>
		);
	}

	const rotate = rotateValue.interpolate({
		inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
		outputRange: ["-10deg", "0deg", "10deg"],
		extrapolate: "clamp",
	});

	const opacity = position.x.interpolate({
		inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
		outputRange: [0.5, 1, 0.5],
		extrapolate: "clamp",
	});

	const nextCardScale = position.x.interpolate({
		inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
		outputRange: [1, 0.95, 1],
		extrapolate: "clamp",
	});

	const cardStyle = {
		transform: [
			{ translateX: position.x },
			{ translateY: position.y },
			{ rotate },
		],
		opacity,
	};

	const nextCard = polls[currentIndex + 1];

	const getSortedOptions = (poll: Poll) => {
		return [...poll.options].sort((a, b) => b.votes - a.votes);
	};

	return (
		<View style={styles(colorScheme).container}>
			<SafeAreaView edges={["top"]} style={styles(colorScheme).header}>
				<View style={styles(colorScheme).headerButton} />
				<View style={styles(colorScheme).pointsContainer}>
					<Text style={styles(colorScheme).pointsNumber}>5</Text>
					<Text style={styles(colorScheme).pointsLabel}>points</Text>
				</View>
				<TouchableOpacity
					style={styles(colorScheme).headerButton}
					onPress={toggleNavMenu}
				>
					<Menu size={24} color={Colors[colorScheme].text} />
				</TouchableOpacity>
			</SafeAreaView>

			<View style={styles(colorScheme).cardContainer}>
				{nextCard && (
					<Animated.View
						style={[
							styles(colorScheme).card,
							styles(colorScheme).nextCard,
							{
								transform: [{ scale: nextCardScale }],
							},
						]}
					>
						<Text style={styles(colorScheme).questionText}>
							{nextCard.question}
						</Text>
					</Animated.View>
				)}

				<Animated.View
					style={[styles(colorScheme).card, cardStyle]}
					{...panResponder.panHandlers}
				>
					<View style={styles(colorScheme).cardContent}>
						<View style={styles(colorScheme).pollHeader}>
							<View style={styles(colorScheme).pollHeaderTop}>
								<View
									style={styles(colorScheme).pollHeaderLeft}
								>
									<Text
										style={styles(colorScheme).questionText}
									>
										{currentPoll.question}
									</Text>
								</View>
								<TouchableOpacity
									style={styles(colorScheme).menuButton}
									onPress={toggleMenu}
									activeOpacity={0.7}
								>
									<MoreVertical
										size={20}
										color={Colors[colorScheme].icon}
									/>
								</TouchableOpacity>
							</View>
							<Text style={styles(colorScheme).pollMeta}>
								{currentPoll.votes} votes · Vote to see results
							</Text>
						</View>

						<View style={styles(colorScheme).optionsContainer}>
							{getSortedOptions(currentPoll).map(
								(option, index) => (
									<PollOptionCard
										key={option.id}
										option={option}
										totalVotes={currentPoll.votes}
										rank={index}
										showResults={currentPoll.userVoted}
										onVote={() => handleVote(option.id)}
										votingType={currentPoll.votingType}
									/>
								)
							)}
						</View>

						<View style={styles(colorScheme).pollFooter}>
							<View style={styles(colorScheme).footerItem}>
								<Clock
									size={14}
									color={Colors[colorScheme].icon}
								/>
								<Text style={styles(colorScheme).footerText}>
									{currentPoll.timeLeft}
								</Text>
							</View>
							<View style={styles(colorScheme).footerItem}>
								<Text style={styles(colorScheme).footerText}>
									{currentPoll.votingType}
								</Text>
							</View>
						</View>
					</View>
				</Animated.View>
			</View>

			<SafeAreaView
				edges={["bottom"]}
				style={styles(colorScheme).actionsContainer}
			>
				<View style={styles(colorScheme).actions}>
					<TouchableOpacity
						style={[
							styles(colorScheme).actionButton,
							styles(colorScheme).heartButton,
						]}
						onPress={handleLike}
						activeOpacity={0.7}
					>
						<Heart
							size={28}
							color={currentPoll.liked ? "#FF4458" : "#FF4458"}
							fill={currentPoll.liked ? "#FF4458" : "transparent"}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles(colorScheme).actionButton,
							styles(colorScheme).createButton,
						]}
						onPress={handleCreatePoll}
						activeOpacity={0.7}
					>
						<Plus size={32} color="#ffffff" strokeWidth={2.5} />
					</TouchableOpacity>
				</View>
			</SafeAreaView>

			{menuVisible && (
				<TouchableOpacity
					style={[
						styles(colorScheme).menuOverlay,
						{
							opacity: menuAnimation.interpolate({
								inputRange: [0, 1],
								outputRange: [0, 0.3],
							}),
						},
					]}
					activeOpacity={1}
					onPress={closeMenu}
				>
					<View
						style={[
							styles(colorScheme).menuContainer,
							{
								transform: [{ translateX: menuTranslateX }],
								opacity: menuAnimation,
							},
						]}
					>
						{currentPoll.isOwner && !currentPoll.hasResponses && (
							<TouchableOpacity
								style={styles(colorScheme).menuItem}
								onPress={handleEdit}
								activeOpacity={0.7}
							>
								<Text style={styles(colorScheme).menuItemText}>
									Edit Poll
								</Text>
							</TouchableOpacity>
						)}
						<TouchableOpacity
							style={styles(colorScheme).menuItem}
							onPress={handleShare}
							activeOpacity={0.7}
						>
							<Text style={styles(colorScheme).menuItemText}>
								Share Poll
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles(colorScheme).menuItem,
								styles(colorScheme).menuItemLast,
							]}
							onPress={handleFlag}
							activeOpacity={0.7}
						>
							<Text
								style={[
									styles(colorScheme).menuItemText,
									styles(colorScheme).menuItemDanger,
								]}
							>
								Flag Poll
							</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			)}

			<NavigationMenu
				navMenuVisible={navMenuVisible}
				setNavMenuVisible={setNavMenuVisible}
				colorScheme={colorScheme}
			/>
		</View>
	);
}

interface PollOptionCardProps {
	option: PollOption;
	totalVotes: number;
	rank: number;
	showResults: boolean;
	onVote: () => void;
	votingType: string;
}

const PollOptionCard: React.FC<PollOptionCardProps> = ({
	option,
	totalVotes,
	rank,
	showResults,
	onVote,
	votingType,
}) => {
	const colorScheme = useColorScheme() ?? "light";
	const percentage =
		totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

	const getBackgroundColor = () => {
		if (!showResults) return colorScheme === "dark" ? "#1b1d1f" : "#F5F5F5";
		if (rank === 0) return "#E9FFEA";
		if (rank === 1) return "#9DBEFF";
		return "#E0E0E0";
	};

	const getBorderColor = () => {
		if (!showResults)
			return colorScheme === "dark" ? "#161616ff" : "#F5F5F5";
		if (rank === 0) return "#95CD9C";
		if (rank === 1) return "#3278FF";
		return "#E0E0E0";
	};

	const getTextColor = () => {
		if (!showResults) return colorScheme === "dark" ? "#e0e0e0" : "#000101";
		if (rank === 0 || rank === 1) return "#272c2e";
		return "#4f5354";
	};

	return (
		<TouchableOpacity
			style={[
				styles(colorScheme).optionCard,
				{
					backgroundColor: getBackgroundColor(),
					borderColor: getBorderColor(),
				},
			]}
			onPress={onVote}
			activeOpacity={0.7}
			disabled={showResults}
		>
			<View style={styles(colorScheme).optionContent}>
				{showResults && rank === 0 && (
					<View style={styles(colorScheme).checkIconContainer}>
						<Check size={16} color="#6DD079" strokeWidth={3} />
					</View>
				)}
				<Text
					style={[
						styles(colorScheme).optionText,
						{ color: getTextColor() },
					]}
				>
					{option.text}
				</Text>
			</View>

			{showResults && (
				<View style={styles(colorScheme).optionRight}>
					{votingType === "Open Voting" &&
						option.avatars &&
						option.avatars.length > 0 && (
							<View style={styles(colorScheme).avatarsContainer}>
								{option.avatars
									.slice(0, 2)
									.map((avatar, idx) => (
										<Image
											key={idx}
											source={{ uri: avatar }}
											style={[
												styles(colorScheme).avatar,
												idx > 0 &&
													styles(colorScheme)
														.avatarOverlap,
											]}
										/>
									))}
							</View>
						)}
					<Text
						style={[
							styles(colorScheme).percentageText,
							{ color: getTextColor() },
						]}
					>
						{percentage}%
					</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = (colorScheme: "light" | "dark") =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Colors[colorScheme].background,
		},
		header: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: 20,
			paddingVertical: 12,
			backgroundColor: Colors[colorScheme].background,
		},
		headerButton: {
			width: 40,
			height: 40,
			alignItems: "center",
			justifyContent: "center",
		},
		pointsContainer: {
			flexDirection: "row",
			alignItems: "baseline",
			gap: 4,
		},
		pointsNumber: {
			fontSize: 24,
			fontWeight: "700",
			color: "#5B93FF",
		},
		pointsLabel: {
			fontSize: 16,
			fontWeight: "500",
			color: "#5B93FF",
		},
		cardContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			paddingHorizontal: 20,
		},
		card: {
			position: "absolute",
			width: SCREEN_WIDTH - 40,
			maxHeight: SCREEN_HEIGHT * 0.7,
			backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#ffffff",
			borderRadius: 24,
			padding: 24,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 8,
			},
			shadowOpacity: 0.12,
			shadowRadius: 16,
			elevation: 8,
		},
		nextCard: {
			opacity: 0.6,
			zIndex: 0,
		},
		cardContent: {
			flex: 1,
			gap: 20,
		},
		pollHeader: {
			gap: 8,
		},
		pollHeaderTop: {
			flexDirection: "row",
			alignItems: "flex-start",
			justifyContent: "space-between",
			gap: 12,
		},
		pollHeaderLeft: {
			flex: 1,
		},
		menuButton: {
			width: 32,
			height: 32,
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 16,
		},
		questionText: {
			fontSize: 20,
			fontWeight: "700",
			color: Colors[colorScheme].text,
			lineHeight: 28,
		},
		pollMeta: {
			fontSize: 13,
			color: Colors[colorScheme].icon,
			fontWeight: "500",
		},
		optionsContainer: {
			gap: 12,
			flex: 1,
		},
		optionCard: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingVertical: 16,
			paddingHorizontal: 20,
			borderRadius: 30,
			minHeight: 32,
			borderWidth: 1,
		},
		optionContent: {
			flexDirection: "row",
			alignItems: "center",
			gap: 8,
			flex: 1,
		},
		checkIconContainer: {
			width: 24,
			height: 24,
			borderRadius: 12,
			backgroundColor: "rgba(255, 255, 255, 0.5)",
			alignItems: "center",
			justifyContent: "center",
		},
		optionText: {
			fontSize: 16,
			fontWeight: "500",
			flex: 1,
		},
		optionRight: {
			flexDirection: "row",
			alignItems: "center",
			gap: 8,
		},
		avatarsContainer: {
			flexDirection: "row",
			alignItems: "center",
		},
		avatar: {
			width: 24,
			height: 24,
			borderRadius: 12,
			borderWidth: 2,
			borderColor: "#FFFFFF",
		},
		avatarOverlap: {
			marginLeft: -8,
		},
		percentageText: {
			fontSize: 15,
			fontWeight: "700",
			minWidth: 40,
			textAlign: "right",
		},
		pollFooter: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingTop: 8,
			borderTopWidth: 1,
			borderTopColor: Colors[colorScheme].border,
		},
		footerItem: {
			flexDirection: "row",
			alignItems: "center",
			gap: 4,
		},
		footerText: {
			fontSize: 12,
			color: Colors[colorScheme].icon,
			fontWeight: "500",
		},

		actionsContainer: {
			backgroundColor: Colors[colorScheme].background,
			paddingTop: 8,
		},
		actions: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: 32,
			paddingBottom: 16,
			gap: 24,
		},
		actionButton: {
			width: 56,
			height: 56,
			borderRadius: 28,
			backgroundColor: Colors[colorScheme].background,
			alignItems: "center",
			justifyContent: "center",
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.08,
			shadowRadius: 8,
			elevation: 3,
		},
		actionButtonActive: {
			backgroundColor: "#E8F1FF",
		},
		heartButton: {
			width: 64,
			height: 64,
			borderRadius: 32,
			backgroundColor: colorScheme == "dark" ? "#331313" : "#ffffff",
			shadowColor: "#FF4458",
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowOpacity: colorScheme == "dark" ? 0 : 0.15,
			shadowRadius: 12,
			elevation: colorScheme == "dark" ? 0 : 5,
		},
		createButton: {
			width: 64,
			height: 64,
			borderRadius: 32,
			backgroundColor: "#5B93FF",
			shadowColor: "#5B93FF",
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowOpacity: 0.3,
			shadowRadius: 12,
			elevation: 5,
		},
		menuOverlay: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0, 0, 0, 0.3)",
			justifyContent: "center",
			alignItems: "center",
		},
		menuContainer: {
			backgroundColor: Colors[colorScheme].background,
			borderRadius: 16,
			marginHorizontal: 40,
			overflow: "hidden",
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 8,
			},
			shadowOpacity: 0.2,
			shadowRadius: 16,
			elevation: 10,
		},
		menuItem: {
			paddingVertical: 18,
			paddingHorizontal: 24,
			borderBottomWidth: 1,
			borderBottomColor: Colors[colorScheme].border,
		},
		menuItemLast: {
			borderBottomWidth: 0,
		},
		menuItemText: {
			fontSize: 17,
			fontWeight: "600",
			color: Colors[colorScheme].text,
			textAlign: "center",
		},
		menuItemDanger: {
			color: "#FF4458",
		},
		emptyContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		emptyText: {
			fontSize: 20,
			fontWeight: "600",
			color: Colors[colorScheme].icon,
		},
	});
