import { FeedbackEntity } from "src/v1/feedback/feedback.entity"

export const FirestoreDatabaseProvider = 'firestoreDb'
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProvider: string[] = [
  FeedbackEntity.collectionName,
]
