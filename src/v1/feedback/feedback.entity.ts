import { Timestamp } from '@google-cloud/firestore'

export class FeedbackEntity {
  static collectionName = 'feedbacks'

  message: string
  timestamp: Timestamp
}
