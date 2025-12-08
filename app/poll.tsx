import React, { useState, useRef } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Flag, Pencil, Share2, Menu, ArrowLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { mockPolls, Poll } from './mocks/polls';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function PollScreen() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [polls, setPolls] = useState<Poll[]>(mockPolls);
  const position = useRef(new Animated.ValueXY()).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

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
    
    const updatedPolls = [...polls];
    updatedPolls[currentIndex] = {
      ...updatedPolls[currentIndex],
      liked: !updatedPolls[currentIndex].liked,
    };
    setPolls(updatedPolls);
    
    console.log(`Poll ${currentPoll.id} liked:`, !currentPoll.liked);
  };

  const handleFlag = () => {
    if (!currentPoll) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    
    Alert.alert(
      'Flag Poll',
      'Report this poll as inappropriate?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Report',
          style: 'destructive',
          onPress: () => {
            console.log(`Poll ${currentPoll.id} flagged`);
            moveToNext();
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    if (!currentPoll) return;
    
    if (!currentPoll.isOwner) {
      Alert.alert('Cannot Edit', 'You can only edit polls you created.');
      return;
    }
    
    if (currentPoll.hasResponses) {
      Alert.alert('Cannot Edit', 'This poll already has responses.');
      return;
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Edit Poll', 'Edit functionality would open here.');
    console.log(`Editing poll ${currentPoll.id}`);
  };

  const handleShare = async () => {
    if (!currentPoll) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    try {
      const result = await Share.share({
        message: `Check out this poll: "${currentPoll.question}"`,
        url: `https://pollapp.com/poll/${currentPoll.id}`,
      });
      
      if (result.action === Share.sharedAction) {
        console.log('Poll shared successfully');
      }
    } catch (error) {
      console.error('Error sharing poll:', error);
    }
  };

  const handleRespond = () => {
    if (!currentPoll) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Respond', 'Poll response screen would open here.');
    console.log(`Responding to poll ${currentPoll.id}`);
  };

  if (!currentPoll) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No more polls!</Text>
        </View>
      </SafeAreaView>
    );
  }

  const rotate = rotateValue.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const opacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [1, 0.95, 1],
    extrapolate: 'clamp',
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

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <ArrowLeft size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsNumber}>5</Text>
          <Text style={styles.pointsLabel}>points</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Menu size={24} color="#1a1a1a" />
        </TouchableOpacity>
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
            <Text style={styles.questionText}>{nextCard.question}</Text>
          </Animated.View>
        )}

        <Animated.View
          style={[styles.card, cardStyle]}
          {...panResponder.panHandlers}
        >
          <View style={styles.cardContent}>
            <Text style={styles.questionText}>{currentPoll.question}</Text>
            
            <TouchableOpacity
              style={styles.respondButton}
              onPress={handleRespond}
              activeOpacity={0.8}
            >
              <Text style={styles.respondButtonText}>Respond</Text>
            </TouchableOpacity>
            
            <Text style={styles.voteInfo}>
              {currentPoll.votes} votes · {currentPoll.timeLeft}
            </Text>
          </View>
        </Animated.View>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.actionsContainer}>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              currentPoll.isOwner && !currentPoll.hasResponses && styles.actionButtonActive,
            ]}
            onPress={handleEdit}
            activeOpacity={0.7}
          >
            <Pencil
              size={24}
              color={currentPoll.isOwner && !currentPoll.hasResponses ? '#5B93FF' : '#666'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.heartButton]}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Heart
              size={28}
              color={currentPoll.liked ? '#FF4458' : '#FF4458'}
              fill={currentPoll.liked ? '#FF4458' : 'transparent'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Share2 size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleFlag}
            activeOpacity={0.7}
          >
            <Flag size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  pointsNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5B93FF',
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5B93FF',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.6,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  questionText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 38,
  },
  respondButton: {
    backgroundColor: '#5B93FF',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#5B93FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  respondButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  voteInfo: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  actionsContainer: {
    backgroundColor: '#f8f9fa',
    paddingTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonActive: {
    backgroundColor: '#E8F1FF',
  },
  heartButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    shadowColor: '#FF4458',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
  },
});
