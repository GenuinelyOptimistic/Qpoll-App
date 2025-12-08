export const CATEGORIES = [
  'Business',
  'Sport',
  'Shopping',
  'Art',
  'Science',
  'Technology',
  'Education',
  'Politics',
] as const;

export type Category = typeof CATEGORIES[number];
