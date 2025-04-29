export interface User {
  id: string;
  email: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  createdBy: string;
  createdAt: Date;
}

export interface SessionNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionReplay {
  id: string;
  userId: string;
  userEmail: string;
  time: string;
  date: Date;
  sessionLength: string;
  country: string;
  tags: Tag[];
  notes: SessionNote[];
  category?: string;
  hasWarning?: boolean;
}

export type TagColor = 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';

export interface TagColorOption {
  name: TagColor;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export const TAG_COLORS: Record<TagColor, TagColorOption> = {
  gray: {
    name: 'gray',
    bgClass: 'bg-gray-100',
    textClass: 'text-gray-800',
    borderClass: 'border-gray-200'
  },
  red: {
    name: 'red',
    bgClass: 'bg-red-100',
    textClass: 'text-red-800',
    borderClass: 'border-red-200'
  },
  yellow: {
    name: 'yellow',
    bgClass: 'bg-yellow-100',
    textClass: 'text-yellow-800',
    borderClass: 'border-yellow-200'
  },
  green: {
    name: 'green',
    bgClass: 'bg-green-100',
    textClass: 'text-green-800',
    borderClass: 'border-green-200'
  },
  blue: {
    name: 'blue',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    borderClass: 'border-blue-200'
  },
  indigo: {
    name: 'indigo',
    bgClass: 'bg-indigo-100',
    textClass: 'text-indigo-800',
    borderClass: 'border-indigo-200'
  },
  purple: {
    name: 'purple',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-800',
    borderClass: 'border-purple-200'
  },
  pink: {
    name: 'pink',
    bgClass: 'bg-pink-100',
    textClass: 'text-pink-800',
    borderClass: 'border-pink-200'
  }
};