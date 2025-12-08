import { Category } from '@/constants/categories';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  avatars?: string[];
}

export interface Poll {
  id: string;
  question: string;
  votes: number;
  timeLeft: string;
  isOwner: boolean;
  hasResponses: boolean;
  liked: boolean;
  category: Category;
  options: PollOption[];
  userVoted: boolean;
  votingType: 'Open Voting' | 'Anonymous Voting';
}

export const mockPolls: Poll[] = [
  {
    id: '1',
    question: 'Where should we eat lunch tomorrow?',
    votes: 45,
    timeLeft: '3 days remaining',
    isOwner: false,
    hasResponses: true,
    liked: false,
    category: 'Shopping',
    userVoted: false,
    votingType: 'Open Voting',
    options: [
      {
        id: 'opt1',
        text: 'A New Place!',
        votes: 21,
        avatars: ['https://i.pravatar.cc/150?img=1', 'https://i.pravatar.cc/150?img=2'],
      },
      {
        id: 'opt2',
        text: 'At Office',
        votes: 6,
        avatars: ['https://i.pravatar.cc/150?img=3', 'https://i.pravatar.cc/150?img=4'],
      },
      {
        id: 'opt3',
        text: 'Regular Place',
        votes: 15,
        avatars: ['https://i.pravatar.cc/150?img=5', 'https://i.pravatar.cc/150?img=6'],
      },
      {
        id: 'opt4',
        text: 'Any will do',
        votes: 3,
        avatars: ['https://i.pravatar.cc/150?img=7'],
      },
    ],
  },
  {
    id: '2',
    question: 'Which Trinidad and Tobago politician would you let watch your children?',
    votes: 28,
    timeLeft: '2 days remaining',
    isOwner: false,
    hasResponses: true,
    liked: false,
    category: 'Politics',
    userVoted: false,
    votingType: 'Anonymous Voting',
    options: [
      { id: 'opt1', text: 'Politician A', votes: 12 },
      { id: 'opt2', text: 'Politician B', votes: 8 },
      { id: 'opt3', text: 'Politician C', votes: 5 },
      { id: 'opt4', text: 'None of them', votes: 3 },
    ],
  },
  {
    id: '3',
    question: 'What is the best street food in Port of Spain?',
    votes: 42,
    timeLeft: '4 days remaining',
    isOwner: true,
    hasResponses: false,
    liked: false,
    category: 'Shopping',
    userVoted: false,
    votingType: 'Open Voting',
    options: [
      {
        id: 'opt1',
        text: 'Doubles',
        votes: 25,
        avatars: ['https://i.pravatar.cc/150?img=8', 'https://i.pravatar.cc/150?img=9'],
      },
      {
        id: 'opt2',
        text: 'Bake and Shark',
        votes: 10,
        avatars: ['https://i.pravatar.cc/150?img=10'],
      },
      {
        id: 'opt3',
        text: 'Roti',
        votes: 5,
        avatars: ['https://i.pravatar.cc/150?img=11'],
      },
      { id: 'opt4', text: 'Pelau', votes: 2 },
    ],
  },
  {
    id: '4',
    question: 'Which beach in Trinidad is most overrated?',
    votes: 33,
    timeLeft: '1 day remaining',
    isOwner: false,
    hasResponses: true,
    liked: true,
    category: 'Sport',
    userVoted: false,
    votingType: 'Anonymous Voting',
    options: [
      { id: 'opt1', text: 'Maracas Beach', votes: 18 },
      { id: 'opt2', text: 'Las Cuevas', votes: 8 },
      { id: 'opt3', text: 'Tyrico Bay', votes: 5 },
      { id: 'opt4', text: 'Blanchisseuse', votes: 2 },
    ],
  },
  {
    id: '5',
    question: 'Best time to visit Maracas Beach?',
    votes: 50,
    timeLeft: '5 days remaining',
    isOwner: false,
    hasResponses: true,
    liked: false,
    category: 'Education',
    userVoted: false,
    votingType: 'Open Voting',
    options: [
      {
        id: 'opt1',
        text: 'Early Morning',
        votes: 28,
        avatars: ['https://i.pravatar.cc/150?img=12', 'https://i.pravatar.cc/150?img=13'],
      },
      {
        id: 'opt2',
        text: 'Afternoon',
        votes: 15,
        avatars: ['https://i.pravatar.cc/150?img=14'],
      },
      { id: 'opt3', text: 'Evening', votes: 5 },
      { id: 'opt4', text: 'Night', votes: 2 },
    ],
  },
];
