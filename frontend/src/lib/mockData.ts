import { Blog, Comment } from '@/types/blog';

export const mockBlogs: Blog[] = [
  {
    id: '1',
    slug: 'the-ultimate-guide-to-full-body-workouts',
    title: 'The Ultimate Guide to Full-Body Workouts',
    excerpt: 'Discover the most effective full-body workout routines that will help you build strength, increase endurance, and achieve your fitness goals.',
    body: `Full-body workouts are an excellent way to maximize your time at the gym while building overall strength and endurance. Whether you're a beginner or an experienced athlete, incorporating full-body exercises into your routine can lead to impressive results.

## Why Full-Body Workouts?

Full-body workouts engage multiple muscle groups simultaneously, leading to:
- Increased calorie burn
- Improved functional strength
- Better time efficiency
- Enhanced cardiovascular health
- Balanced muscle development

## Essential Full-Body Exercises

### 1. Squats
Squats are the king of lower body exercises. They work your quads, hamstrings, glutes, and core. Start with bodyweight squats and progress to weighted variations.

### 2. Deadlifts
Deadlifts target your entire posterior chain - back, glutes, and hamstrings. They're essential for building overall strength and power.

### 3. Push-ups
A classic upper body exercise that works your chest, shoulders, and triceps. Modify as needed and progress to more challenging variations.

### 4. Pull-ups
Pull-ups are excellent for building back and arm strength. Use assistance bands if needed and work your way up to unassisted reps.

### 5. Planks
Core stability is crucial for all movements. Planks strengthen your entire core and improve posture.`,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    author: {
      name: 'Alex Cooper',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    category: 'Fitness',
    date: '2024-01-15',
  },
  {
    id: '2',
    slug: '10-tips-for-better-cardio-stamina',
    title: '10 Tips for Better Cardio Stamina',
    excerpt: 'Boost your cardiovascular endurance with these proven strategies and training techniques used by professional athletes.',
    body: 'Building cardiovascular stamina is essential for overall fitness and health...',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
    author: {
      name: 'Sarah Mitchell',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    category: 'Cardio',
    date: '2024-01-20',
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    blogId: '1',
    author: 'John Smith',
    comment: 'This is exactly what I needed! The workout routine is clear and easy to follow. I\'ve been doing this for 2 weeks and already seeing results.',
    rating: 5,
    createdAt: '2024-01-16',
  },
  {
    id: '2',
    blogId: '1',
    author: 'Emily Davis',
    comment: 'Great article! Very comprehensive and well-structured. Would love to see more content like this.',
    rating: 5,
    createdAt: '2024-01-17',
  },
];
