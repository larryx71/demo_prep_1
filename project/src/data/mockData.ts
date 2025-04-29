import { SessionReplay, Tag, SessionNote } from '../types';

// Mock tags
export const mockTags: Tag[] = [
  { id: '1', name: 'Bug', color: 'red', createdBy: 'admin', createdAt: new Date('2025-04-10') },
  { id: '2', name: 'Feature Request', color: 'blue', createdBy: 'admin', createdAt: new Date('2025-04-11') },
  { id: '3', name: 'Customer Issue', color: 'yellow', createdBy: 'admin', createdAt: new Date('2025-04-12') },
  { id: '4', name: 'Onboarding', color: 'green', createdBy: 'admin', createdAt: new Date('2025-04-13') },
  { id: '5', name: 'Checkout Flow', color: 'purple', createdBy: 'admin', createdAt: new Date('2025-04-14') },
  { id: '6', name: 'High Priority', color: 'red', createdBy: 'admin', createdAt: new Date('2025-04-15') },
  { id: '7', name: 'Follow Up', color: 'indigo', createdBy: 'admin', createdAt: new Date('2025-04-16') },
  { id: '8', name: 'UI Confusion', color: 'pink', createdBy: 'admin', createdAt: new Date('2025-04-17') },
  { id: '9', name: 'Mobile', color: 'gray', createdBy: 'admin', createdAt: new Date('2025-04-18') },
  { id: '10', name: 'Desktop', color: 'gray', createdBy: 'admin', createdAt: new Date('2025-04-19') },
];

// Mock notes
export const mockNotes: SessionNote[] = [
  { 
    id: '1', 
    content: 'User encountered an error during checkout process. Needs investigation.', 
    createdBy: 'admin', 
    createdAt: new Date('2025-04-25'), 
    updatedAt: new Date('2025-04-25') 
  },
  { 
    id: '2', 
    content: 'Customer was confused by the new feature implementation. Consider updating documentation.', 
    createdBy: 'support', 
    createdAt: new Date('2025-04-26'), 
    updatedAt: new Date('2025-04-27') 
  },
  { 
    id: '3', 
    content: 'Great example of successful onboarding flow. User completed all steps in record time.', 
    createdBy: 'product', 
    createdAt: new Date('2025-04-27'), 
    updatedAt: new Date('2025-04-27') 
  },
];

// Mock session replays
export const mockSessionReplays: SessionReplay[] = [
  { 
    id: '1', 
    userId: 'user1', 
    userEmail: 'tyler@skillit.com', 
    time: 'Today, 8:37:49 AM', 
    date: new Date('2025-04-28T08:37:49'), 
    sessionLength: '9m 12s', 
    country: 'United States', 
    tags: [mockTags[3], mockTags[9]], 
    notes: [mockNotes[2]],
  },
  { 
    id: '2', 
    userId: 'user2', 
    userEmail: 'hannah.parker@calm.com', 
    time: 'Today, 8:19:11 AM', 
    date: new Date('2025-04-28T08:19:11'), 
    sessionLength: '3m 12s', 
    country: 'United States', 
    tags: [mockTags[4]], 
    notes: [],
  },
  { 
    id: '3', 
    userId: 'user3', 
    userEmail: 'jeanmarie_white@us.ibm.com', 
    time: 'Today, 8:10:01 AM', 
    date: new Date('2025-04-28T08:10:01'), 
    sessionLength: '17m 3s', 
    country: 'United States', 
    tags: [mockTags[0], mockTags[5]], 
    notes: [mockNotes[0]],
    hasWarning: true,
  },
  { 
    id: '4', 
    userId: 'user4', 
    userEmail: 'suprabathc@remitly.com', 
    time: 'Today, 8:06:11 AM', 
    date: new Date('2025-04-28T08:06:11'), 
    sessionLength: '1m 4s', 
    country: 'United States', 
    tags: [], 
    notes: [],
  },
  { 
    id: '5', 
    userId: 'user5', 
    userEmail: 'scott.newsome@imail.org', 
    time: 'Today, 7:25:53 AM', 
    date: new Date('2025-04-28T07:25:53'), 
    sessionLength: '1h 17m', 
    country: 'United States', 
    tags: [mockTags[1], mockTags[7]], 
    notes: [mockNotes[1]],
  },
  { 
    id: '6', 
    userId: 'user6', 
    userEmail: 'greeshma.puchakayala@zaxbys.com', 
    time: 'Today, 6:56:05 AM', 
    date: new Date('2025-04-28T06:56:05'), 
    sessionLength: '59m 6s', 
    country: 'United States', 
    tags: [mockTags[2], mockTags[6]], 
    notes: [],
  },
];

// Mock categories
export const mockCategories = [
  { id: 'aha-sharing', title: 'AHA Moment: Saving, Sharing or Invite', description: 'Users experiencing an AHA moment which led them to save, share or invite others', icon: 'Share2' },
  { id: 'guides-surveys', title: 'Guides and Surveys Rage Closed', description: 'Users quickly dismissing a Guide or a Survey without engaging', icon: 'AlertCircle' },
  { id: 'likely-churn', title: 'Likely to Churn', description: 'Users who are likely to stop using the product due to frustration', icon: 'AlertTriangle' },
  { id: 'save-chart', title: 'charts: save chart', description: 'Gain qualitative insights from one of your most used events', icon: 'LineChart' },
  { id: 'copy-heatmap', title: 'AHA Moment: Copy Heatmap Link', description: 'Users sharing insights discovered with heatmaps', icon: 'Flame' },
  { id: 'onboarding', title: 'Onboarding Process: Signup', description: 'Users completing the signup action', icon: 'UserPlus' },
  { id: 'invite-users', title: 'AHA Moment: Invite Users', description: 'Users inviting teammates to the product', icon: 'Users' },
  { id: 'high-activity', title: 'High Activity', description: 'Users demonstrating high engagement with the product', icon: 'Zap' },
];