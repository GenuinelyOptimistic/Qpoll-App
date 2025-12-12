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
	ArrowLeft,
	Check,
	Clock,
	Plus,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { mockPolls, Poll, PollOption } from "./mocks/polls";
import { useCategories } from "./context/CategoryContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function PollScreen() {
	const router = useRouter();
	const { selectedCategories, isLoaded } = useCategories();
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [allPolls, setAllPolls] = useState<Poll[]>(mockPolls);
	const [menuVisible, setMenuVisible] = useState<boolean>(false);
	const position = useRef(new Animated.ValueXY()).current;
	const rotateValue = useRef(new Animated.Value(0)).current;

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
		setMenuVisible(false);

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
		setMenuVisible(false);

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
		setMenuVisible(false);

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

	const handleBack = () => {
		router.back();
	};

	const handleCreatePoll = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		router.push("/create-poll");
		console.log("Creating new poll");
	};

	const toggleMenu = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setMenuVisible(!menuVisible);
	};

	if (!isLoaded) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>Loading...</Text>
				</View>
			</SafeAreaView>
		);
	}

	if (!currentPoll) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>
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
		<View style={styles.container}>
			<SafeAreaView edges={["top"]} style={styles.header}>
				<TouchableOpacity
					style={styles.headerButton}
					onPress={handleBack}
				>
					<ArrowLeft size={24} color="#1a1a1a" />
				</TouchableOpacity>
				<View style={styles.pointsContainer}>
					<Text style={styles.pointsNumber}>5</Text>
					<Text style={styles.pointsLabel}>points</Text>
				</View>
				<View style={styles.headerButton} />
			</SafeAreaView>

			<View style={styles.cardContainer}>
				{nextCard && (
					<Animated.View
						style={[
							styles.card,
							styles.nextCard,
							{
								transform: [{ scale: nextCardScale }],
							},
						]}
					>
						<Text style={styles.questionText}>
							{nextCard.question}
						</Text>
					</Animated.View>
				)}

				<Animated.View
					style={[styles.card, cardStyle]}
					{...panResponder.panHandlers}
				>
					<View style={styles.cardContent}>
						<View style={styles.pollHeader}>
							<View style={styles.pollHeaderTop}>
								<View style={styles.pollHeaderLeft}>
									<Text style={styles.questionText}>
										{currentPoll.question}
									</Text>
								</View>
								<TouchableOpacity
									style={styles.menuButton}
									onPress={toggleMenu}
									activeOpacity={0.7}
								>
									<MoreVertical size={20} color="#666" />
								</TouchableOpacity>
							</View>
							<Text style={styles.pollMeta}>
								{currentPoll.votes} votes · Vote to see results
							</Text>
						</View>

						<View style={styles.optionsContainer}>
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

						<View style={styles.pollFooter}>
							<View style={styles.footerItem}>
								<Clock size={14} color="#999" />
								<Text style={styles.footerText}>
									{currentPoll.timeLeft}
								</Text>
							</View>
							<View style={styles.footerItem}>
								<Text style={styles.footerText}>
									{currentPoll.votingType}
								</Text>
							</View>
						</View>
					</View>
				</Animated.View>
			</View>

			<SafeAreaView edges={["bottom"]} style={styles.actionsContainer}>
				<View style={styles.actions}>
					<TouchableOpacity
						style={[styles.actionButton, styles.heartButton]}
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
						style={[styles.actionButton, styles.createButton]}
						onPress={handleCreatePoll}
						activeOpacity={0.7}
					>
						<Plus size={32} color="#ffffff" strokeWidth={2.5} />
					</TouchableOpacity>
				</View>
			</SafeAreaView>

			{menuVisible && (
				<TouchableOpacity
					style={styles.menuOverlay}
					activeOpacity={1}
					onPress={() => setMenuVisible(false)}
				>
					<View style={styles.menuContainer}>
						{currentPoll.isOwner && !currentPoll.hasResponses && (
							<TouchableOpacity
								style={styles.menuItem}
								onPress={handleEdit}
								activeOpacity={0.7}
							>
								<Text style={styles.menuItemText}>
									Edit Poll
								</Text>
							</TouchableOpacity>
						)}
						<TouchableOpacity
							style={styles.menuItem}
							onPress={handleShare}
							activeOpacity={0.7}
						>
							<Text style={styles.menuItemText}>Share Poll</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.menuItem, styles.menuItemLast]}
							onPress={handleFlag}
							activeOpacity={0.7}
						>
							<Text
								style={[
									styles.menuItemText,
									styles.menuItemDanger,
								]}
							>
								Flag Poll
							</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			)}
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
	const percentage =
		totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

	const getBackgroundColor = () => {
		if (!showResults) return "#F5F5F5";
		if (rank === 0) return "#E9FFEA";
		if (rank === 1) return "#9DBEFF";
		return "#E0E0E0";
	};

	const getBorderColor = () => {
		if (!showResults) return "#F5F5F5";
		if (rank === 0) return "#95CD9C";
		if (rank === 1) return "#3278FF";
		return "#E0E0E0";
	};

	const getTextColor = () => {
		if (!showResults) return "#1a1a1a";
		if (rank === 0 || rank === 1) return "#272c2e";
		return "#4f5354";
	};

	return (
		<TouchableOpacity
			style={[
				styles.optionCard,
				{
					backgroundColor: getBackgroundColor(),
					borderColor: getBorderColor(),
				},
			]}
			onPress={onVote}
			activeOpacity={0.7}
			disabled={showResults}
		>
			<View style={styles.optionContent}>
				{showResults && rank === 0 && (
					<View style={styles.checkIconContainer}>
						<Check size={16} color="#6DD079" strokeWidth={3} />
					</View>
				)}
				<Text style={[styles.optionText, { color: getTextColor() }]}>
					{option.text}
				</Text>
			</View>

			{showResults && (
				<View style={styles.optionRight}>
					{votingType === "Open Voting" &&
						option.avatars &&
						option.avatars.length > 0 && (
							<View style={styles.avatarsContainer}>
								{option.avatars
									.slice(0, 2)
									.map((avatar, idx) => (
										<Image
											key={idx}
											source={{ uri: avatar }}
											style={[
												styles.avatar,
												idx > 0 && styles.avatarOverlap,
											]}
										/>
									))}
							</View>
						)}
					<Text
						style={[
							styles.percentageText,
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f9fa",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 12,
		backgroundColor: "#f8f9fa",
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
		backgroundColor: "#ffffff",
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
		backgroundColor: "#F5F5F5",
	},
	questionText: {
		fontSize: 20,
		fontWeight: "700",
		color: "#1a1a1a",
		lineHeight: 28,
	},
	pollMeta: {
		fontSize: 13,
		color: "#999",
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
		fontWeight: "600",
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
		borderTopColor: "#F0F0F0",
	},
	footerItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	footerText: {
		fontSize: 12,
		color: "#999",
		fontWeight: "500",
	},

	actionsContainer: {
		backgroundColor: "#f8f9fa",
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
		backgroundColor: "#ffffff",
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
		backgroundColor: "#fff",
		shadowColor: "#FF4458",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 5,
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
		backgroundColor: "#ffffff",
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
		borderBottomColor: "#F0F0F0",
	},
	menuItemLast: {
		borderBottomWidth: 0,
	},
	menuItemText: {
		fontSize: 17,
		fontWeight: "600",
		color: "#1a1a1a",
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
		color: "#999",
	},
});
