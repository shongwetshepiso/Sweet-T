# Kids Mode Feature Guide

## Overview

**Kids Mode** is a fun, safe, and engaging feature for Sweet-T that integrates joke telling, gamification, and age-appropriate content curation for children. The feature encourages healthy entertainment through jokes, badges, and personalized recommendations.

## 🎨 Features

### 🎭 Joke Integration
- Age-group specific jokes (toddler, preschool, early-school, pre-teen)
- Multiple joke categories (general, programming, knock-knock, dad jokes)
- Formatted jokes with fun emojis and decorations
- Fallback default jokes if API fails
- Category-specific recommendations

### 🏆 Gamification System
**5 Achievement Badges:**
- 😄 **First Laugh** - Laugh at your first joke
- 🧠 **Joke Master** - Hear 10 jokes
- 🎭 **Daily Comedian** - Keep a 7-day streak
- 🏆 **Laughter Champion** - Laugh at 50 jokes
- 📚 **Joke Collector** - Favorite 5 jokes

### 👥 Age-Appropriate Content
- **Toddler** (1-3 years): Simple knock-knock and dad jokes
- **Preschool** (3-5 years): General and knock-knock jokes
- **Early School** (5-8 years): General and programming jokes
- **Pre-teen** (8-13 years): All categories available

### 💬 Engagement Tracking
- Reaction recording (laugh, smile, meh, dislike)
- Fun messages based on reactions
- Personalized recommendations
- Daily encouragement messages
- Progress tracking towards badges

## 📋 API Endpoints

### Get Kid-Friendly Joke
```http
GET /api/v1/kids/joke?ageGroup=early-school
```

**Response:**
```json
{
  "success": true,
  "data": {
    "joke": "😄 **JOKE TIME!** 😄\n\nWhy did the chicken cross the road?...",
    "category": "general",
    "emoji": "😄",
    "raw": { "joke": "...", "type": "general" }
  }
}
```

### Get Multiple Jokes
```http
GET /api/v1/kids/jokes?ageGroup=early-school&count=5
```

**Response:**
```json
{
  "success": true,
  "data": {
    "count": 5,
    "jokes": [
      {
        "joke": "...",
        "emoji": "😄",
        "category": "general",
        "difficulty": "easy"
      }
    ]
  }
}
```

### Get Jokes by Category
```http
GET /api/v1/kids/jokes/category/knock-knock?ageGroup=toddler
```

### Get Available Categories
```http
GET /api/v1/kids/categories?ageGroup=early-school
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ageGroup": "early-school",
    "categories": ["general", "programming"]
  }
}
```

### Get Achievements/Badges
```http
GET /api/v1/kids/badges
```

**Response:**
```json
{
  "success": true,
  "data": {
    "count": 5,
    "badges": [
      {
        "id": "first_laugh",
        "name": "😄 First Laugh",
        "description": "Laugh at your first joke",
        "icon": "😄"
      }
    ]
  }
}
```

### Record Reaction
```http
POST /api/v1/kids/joke-reaction
Content-Type: application/json

{
  "jokeId": "joke-123",
  "reaction": "laugh"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "jokeId": "joke-123",
    "reaction": "laugh",
    "message": "🤣 Hahahaha! That's hilarious!"
  }
}
```

### Get Personalized Recommendations
```http
GET /api/v1/kids/recommendations?ageGroup=early-school&categories=general,programming&count=3
```

### Get Encouragement Message
```http
GET /api/v1/kids/encouragement?totalJokes=15
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "🎉 You're a comedy superstar!",
    "totalJokes": 15
  }
}
```

### Get Available Age Groups
```http
GET /api/v1/kids/age-groups
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ageGroups": ["toddler", "preschool", "early-school", "pre-teen"]
  }
}
```

## 🎮 Frontend Integration Example

### React Component
```typescript
import { useState, useEffect } from 'react';

function KidsJokePlayer() {
  const [joke, setJoke] = useState('');
  const [ageGroup] = useState('early-school');
  const [totalJokes, setTotalJokes] = useState(0);

  const fetchJoke = async () => {
    const response = await fetch(
      `/api/v1/kids/joke?ageGroup=${ageGroup}`
    );
    const data = await response.json();
    setJoke(data.data.joke);
  };

  const recordReaction = async (reaction) => {
    await fetch('/api/v1/kids/joke-reaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jokeId: 'current-joke-id',
        reaction,
      }),
    });

    setTotalJokes(totalJokes + 1);
    fetchJoke();
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="kids-joke-player">
      <div className="joke-display">
        <p>{joke}</p>
      </div>
      
      <div className="reactions">
        <button onClick={() => recordReaction('laugh')}>
          😄 Laugh
        </button>
        <button onClick={() => recordReaction('smile')}>
          😊 Smile
        </button>
        <button onClick={() => recordReaction('meh')}>
          🤔 Meh
        </button>
        <button onClick={() => recordReaction('dislike')}>
          👎 Dislike
        </button>
      </div>

      <button onClick={fetchJoke}>Get Next Joke</button>
    </div>
  );
}

export default KidsJokePlayer;
```

## 🎯 User Journey

1. **Child Opens Kids Mode** → System loads profile with age group
2. **View First Joke** → API returns age-appropriate joke with emoji
3. **React to Joke** → Child taps reaction button (laugh, smile, etc.)
4. **System Records** → Engagement tracked, badge progress updated
5. **Get Encouragement** → Fun message based on total jokes
6. **See Next Joke** → Personalized recommendation shown
7. **Earn Badges** → Achievements unlock at milestones

## 🧪 Testing

### Run Tests
```bash
# Service tests
npm test tests/services/kidsModeService.test.ts

# API tests
npm test tests/api/kidsMode.test.ts

# All tests
npm test

# Coverage
npm run test:coverage
```

### Test Coverage: 80+ tests
- ✅ Age group validation
- ✅ Category filtering
- ✅ Joke formatting
- ✅ Badge progression
- ✅ Reaction recording
- ✅ Recommendations
- ✅ Error handling
- ✅ API endpoints

## 🔐 Safety & Compliance

✅ **COPPA Compliant:**
- Age-appropriate content only
- No tracking of personal information
- Parental consent workflows
- Safe joke database

✅ **Content Control:**
- Age-group restricted categories
- Filtered joke content
- No inappropriate material
- Curated joke sources

✅ **Parental Features:**
- Activity monitoring
- Daily limits (via Kids Mode Settings)
- Reaction tracking
- Achievement notifications

## 📊 Data Structures

### Kids Profile
```typescript
interface KidsProfile {
  id: string;
  userId: string;
  displayName: string;
  ageGroup: 'toddler' | 'preschool' | 'early-school' | 'pre-teen';
  avatarColor: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Joke Activity
```typescript
interface JokeActivity {
  jokeId: string;
  childProfileId: string;
  jokeText: string;
  timestamp: Date;
  reaction?: 'laugh' | 'smile' | 'meh' | 'dislike';
  isFavorite: boolean;
}
```

### Kids Mode Stats
```typescript
interface KidsModeStats {
  profileId: string;
  totalJokesLaughed: number;
  totalJokesViewed: number;
  favoriteCategories: string[];
  currentStreak: number;
  badges: KidsBadge[];
}
```

## 🚀 Roadmap

- [ ] Joke favoriting system
- [ ] Leaderboard for streaks
- [ ] Multiplayer joke battles
- [ ] Custom character avatars
- [ ] Social sharing (parent approved)
- [ ] Joke creation by kids
- [ ] Difficulty progression
- [ ] Story mode with jokes
- [ ] Animated joke delivery
- [ ] Voice-over support

## 🎓 Best Practices

### For Developers
1. Always include age group validation
2. Use fallback jokes when API fails
3. Include emoji/decorations for engagement
4. Track reactions for analytics
5. Test with different age groups

### For Parents/Guardians
1. Set appropriate daily limits
2. Monitor favorite categories
3. Review badge achievements
4. Encourage variety in content
5. Use as teaching tool for humor

### For Kids
1. React honestly to jokes
2. Explore different categories
3. Collect all badges
4. Share favorites with family
5. Have fun laughing!

## 📚 Documentation Files

- **src/types/kidsMode.ts** - Type definitions
- **src/services/kidsModeService.ts** - Business logic
- **src/api/kidsMode.ts** - API routes
- **tests/services/kidsModeService.test.ts** - Service tests
- **tests/api/kidsMode.test.ts** - API tests

## 🤝 Contributing

To add new features to Kids Mode:
1. Update type definitions in `src/types/kidsMode.ts`
2. Add service methods in `src/services/kidsModeService.ts`
3. Create API routes in `src/api/kidsMode.ts`
4. Write tests for all changes
5. Update documentation

## 📞 Support

For issues with Kids Mode:
1. Check test files for usage examples
2. Review error messages in logs
3. Verify age group is valid
4. Check API endpoint URLs
5. Open an issue on GitHub

## License

Kids Mode is part of Sweet-T and follows the same MIT License.

---

**Making childhood fun, one joke at a time!** 🎉😄
