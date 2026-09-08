export type CapabilityCategory = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  techList: string[];
  gradient: string;
  accentColor: string;
  iconName: string;
  demoType: 'webApp' | 'ecommerce' | 'adminErp' | 'api' | 'canvas' | 'ai';
  metrics: { label: string; value: string }[];
};

export type CaseStudyModule = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  techTags: string[];
  badge?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  isCrownJewel?: boolean;
  featuredYear: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  accent: string;
  glowColor: string;
  metrics: { label: string; val: string }[];
  languagesBreakdown?: { name: string; percent: number; color: string }[];
  imageUrl?: string;
  isConfidential?: boolean;
  confidentialNotice?: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  keyFeatures?: string[];
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  badge: string;
  accentColor: string;
  responsibilities: string[];
  technologies: string[];
  impact: string;
  highlightStat: string;
};

export type ArsenalCategory = 'Frontend' | 'Backend' | 'Database' | 'Testing & QA' | 'AI / ML' | 'DevOps & Tools';

export type ArsenalSkill = {
  name: string;
  category: ArsenalCategory;
  level: number; // 1-100
  iconTag: string;
  howUsed: string;
  projectsUsedIn: string[];
  tags: string[];
};

export type TrackItem = {
  id: number;
  title: string;
  artist: string;
  playlistCategory: 'Forever on Repeat' | 'Late Night' | 'Energy Mode' | 'Soft Hours' | 'Indie Side' | 'Pop Rotation';
  duration: string;
  vibe: string;
  spotifyUri?: string;
  bpm?: number;
  featured?: boolean;
  energyLevel?: number; // 1-100
  coverUrl?: string;
  previewUrl?: string;
  themeColor?: string;
};

export type AnimeItem = {
  id: string;
  title: string;
  japaneseTitle?: string;
  category: 'Favorites' | 'Currently Watching' | 'Completed' | 'Highly Rated';
  score: string;
  episodes: string;
  genre: string[];
  studio: string;
  synopsis: string;
  quote: string;
  posterBg: string;
  posterColor: string;
  imageUrl?: string;
};

export type MediaWatchItem = {
  id: string;
  title: string;
  type: 'Movie' | 'Series';
  year: string;
  rating: string;
  directorOrCreator: string;
  genres: string[];
  synopsis: string;
  mridulVerdict: string;
  themeColor: string;
  imageUrl?: string;
};

export type TerminalCommandOutput = {
  command: string;
  output: string | string[];
  type?: 'default' | 'success' | 'warning' | 'error' | 'cyan' | 'matrix' | 'system';
  timestamp?: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
