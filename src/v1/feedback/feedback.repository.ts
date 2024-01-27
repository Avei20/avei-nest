import { Inject, Injectable, Logger } from '@nestjs/common'
import { FeedbackEntity } from './feedback.entity'
import { CollectionReference, Timestamp } from '@google-cloud/firestore'

@Injectable()
export class FeedbackRepository {
  private logger: Logger = new Logger(FeedbackRepository.name)

  constructor(
    @Inject(FeedbackEntity.collectionName)
    private feedbackCollection: CollectionReference<FeedbackEntity>,
  ) {}

  async create(data: FeedbackEntity) {
    const doc = await this.feedbackCollection.add({
      message: data.message,
      timestamp: data.timestamp,
    })
    return doc
  }

  async findAll() {
    const docList = await this.feedbackCollection.listDocuments()
    return docList
  }
}
