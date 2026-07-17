/**
 * Social and Multiplayer Features Types
 */

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  displayName: string;
  avatar?: string;
  status: 'pending' | 'accepted' | 'blocked';
  connectedAt?: Date;
  lastSeen?: Date;
  competitiveMode: boolean;
}

export interface FriendshipRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  createdAt: Date;
  respondedAt?: Date;
}

export interface Competition {
  id: string;
  type: 'friendly' | 'tournament' | 'seasonal' | 'weekly-challenge';
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  participants: CompetitionParticipant[];
  rules: CompetitionRule[];
  prizes: Prize[];
  status: 'upcoming' | 'active' | 'completed';
  winner?: string;
  secondPlace?: string;
  thirdPlace?: string;
}

export interface CompetitionParticipant {
  participantId: string;
  displayName: string;
  avatar?: string;
  score: number;
  rank: number;
  joinedAt: Date;
  progress: {
    jokesLaughed: number;
    pointsEarned: number;
    challengesCompleted: number;
  };
}

export interface CompetitionRule {
  id: string;
  name: string;
  description: string;
  scoringMethod: 'jokes' | 'points' | 'challenges' | 'mixed';
  weightage: number;
}

export interface Prize {
  rank: number;
  title: string;
  reward: number; // Points
  badge?: string;
  specialReward?: string;
}

export interface HeadToHeadChallenge {
  id: string;
  player1Id: string;
  player1Name: string;
  player1Avatar?: string;
  player2Id: string;
  player2Name: string;
  player2Avatar?: string;
  challengeType: 'jokes' | 'categories' | 'mixed';
  duration: number; // minutes
  startTime: Date;
  endTime?: Date;
  status: 'pending' | 'active' | 'completed' | 'declined';
  player1Score: number;
  player2Score: number;
  winner?: string;
  winnerReward: number;
  loserReward: number;
}

export interface TeamCompetition {
  id: string;
  name: string;
  description: string;
  teams: Team[];
  maxPlayersPerTeam: number;
  startDate: Date;
  endDate: Date;
  status: 'registration' | 'active' | 'completed';
  totalScore: number;
  winner?: string;
}

export interface Team {
  id: string;
  name: string;
  leader: string;
  members: TeamMember[];
  avatar?: string;
  totalScore: number;
  createdAt: Date;
}

export interface TeamMember {
  memberId: string;
  displayName: string;
  avatar?: string;
  role: 'leader' | 'moderator' | 'member';
  joinedAt: Date;
  score: number;
}

export interface SocialProfile {
  userId: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  totalFriends: number;
  totalFollowers: number;
  totalFollowing: number;
  publicStats: {
    totalJokesLaughed: number;
    totalPoints: number;
    bestStreak: number;
    level: number;
  };
  achievements: string[]; // Achievement IDs
  socialLinks?: {
    twitter?: string;
    discord?: string;
    tiktok?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface GameSession {
  id: string;
  type: 'solo' | 'pvp' | 'team' | 'tournament';
  players: GamePlayer[];
  startTime: Date;
  endTime?: Date;
  duration: number; // minutes
  status: 'active' | 'completed' | 'paused';
  rounds: GameRound[];
  winner?: string;
  spectators?: string[];
}

export interface GamePlayer {
  playerId: string;
  displayName: string;
  avatar?: string;
  score: number;
  rank: number;
}

export interface GameRound {
  roundNumber: number;
  startTime: Date;
  endTime?: Date;
  results: RoundResult[];
}

export interface RoundResult {
  playerId: string;
  score: number;
  action: string;
  timestamp: Date;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  registrationDeadline: Date;
  maxParticipants: number;
  entryFee?: number;
  bracket: TournamentBracket[];
  status: 'registration' | 'active' | 'completed';
  prizePool: number;
  prizes: Prize[];
  rules: CompetitionRule[];
}

export interface TournamentBracket {
  round: number;
  matches: TournamentMatch[];
}

export interface TournamentMatch {
  id: string;
  player1Id?: string;
  player2Id?: string;
  player1Score?: number;
  player2Score?: number;
  winner?: string;
  status: 'pending' | 'active' | 'completed';
  scheduledTime?: Date;
}

export interface LeaderboardComparison {
  profileId: string;
  displayName: string;
  globalRank: number;
  friendRank: number;
  pointsAhead: number;
  pointsBehind: number;
  friends: ComparisonEntry[];
}

export interface ComparisonEntry {
  friendId: string;
  displayName: string;
  score: number;
  rank: number;
  difference: number;
}

export interface SocialNotification {
  id: string;
  recipientId: string;
  type: 'friend-request' | 'challenge-invite' | 'tournament' | 'achievement' | 'leaderboard' | 'team-invite';
  from: string;
  fromName: string;
  fromAvatar?: string;
  title: string;
  message: string;
  icon: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  condition: string;
  unlockedAt?: Date;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  email?: string;
  ageGroup?: string;
  preferences: UserPreferences;
  stats: UserStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  competitiveMode: boolean;
  allowFriendRequests: boolean;
  allowChallenges: boolean;
  showProgressPublic: boolean;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
}

export interface UserStats {
  totalPoints: number;
  totalJokesLaughed: number;
  currentLevel: number;
  bestStreak: number;
  totalFriends: number;
  totalCompetitionsWon: number;
  averageGameScore: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'emoji' | 'challenge-invite' | 'achievement-share';
}

export interface Conversation {
  id: string;
  participants: string[];
  type: 'direct' | 'group' | 'team';
  name?: string;
  lastMessage?: ChatMessage;
  lastUpdated: Date;
  unreadCount: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: Date;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredLevel: number;
  reward: {
    points: number;
    badge?: string;
    specialReward?: string;
  };
}
