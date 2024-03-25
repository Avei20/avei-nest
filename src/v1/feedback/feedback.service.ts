import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { FeedbackRepository } from './feedback.repository'
import { Timestamp } from '@google-cloud/firestore'

@Injectable()
export class FeedbackService {
  private logger: Logger = new Logger(FeedbackService.name)

  constructor(private feedbackRepository: FeedbackRepository) {}

  async createFeedbackResponse(message: string) {
    try {
      await this.feedbackRepository.create({
        message: message,
        timestamp: Timestamp.fromDate(new Date()),
      })
      return {
        success: true,
        message: 'Feedback submitted, thanks for your feedback',
      }
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  async getFeedbackResponse() {
    return {
      success: true,
      message: 'aeaoeu',
      data: this.feedbackRepository.findAll(),
    }
  }
}
