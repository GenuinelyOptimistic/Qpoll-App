export interface Poll {
  id: string;
  question: string;
  votes: number;
  timeLeft: string;
  isOwner: boolean;
  hasResponses: boolean;
  liked: boolean;
}

export const mockPolls: Poll[] = [
  {
    id: '1',
    question: 'Which Trinidad and Tobago politician would you let watch your children?',
    votes: 4,
    timeLeft: '23 hours left',
    isOwner: false,
    hasResponses: true,
    liked: false,
  },
  {
    id: '2',
    question: 'What is the best street food in Port of Spain?',
    votes: 12,
    timeLeft: '18 hours left',
    isOwner: true,
    hasResponses: false,
    liked: false,
  },
  {
    id: '3',
    question: 'Which beach in Trinidad is most overrated?',
    votes: 8,
    timeLeft: '15 hours left',
    isOwner: false,
    hasResponses: true,
    liked: true,
  },
  {
    id: '4',
    question: 'Best time to visit Maracas Beach?',
    votes: 20,
    timeLeft: '22 hours left',
    isOwner: false,
    hasResponses: true,
    liked: false,
  },
  {
    id: '5',
    question: 'Which carnival band has the best costumes this year?',
    votes: 35,
    timeLeft: '12 hours left',
    isOwner: true,
    hasResponses: true,
    liked: false,
  },
  {
    id: '6',
    question: 'What is the most underrated doubles spot?',
    votes: 16,
    timeLeft: '20 hours left',
    isOwner: false,
    hasResponses: true,
    liked: false,
  },
];
