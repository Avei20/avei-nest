import { Body, Controller, Get, Logger, Post, Version } from '@nestjs/common'
import { CreateFeedbackDTO } from './dto/create.dto'
import { FeedbackService } from './feedback.service'

@Controller('feedback')
export class FeedbackController {
  private logger: Logger = new Logger(FeedbackController.name)

  constructor(private feedbackService: FeedbackService) {}

  @Post()
  @Version('1')
  async createFeedBack(@Body() data: CreateFeedbackDTO) {
    return await this.feedbackService.createFeedbackResponse(data.message)
  }

  @Get()
  @Version('1')
  async getFeedback() {
    return
  }
}
