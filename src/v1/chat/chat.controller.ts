import { Controller, Get, Logger, Version } from '@nestjs/common'
import { ChatService } from './chat.service'

@Controller('chat')
export class ChatController {
  private logger = new Logger(ChatController.name)
  constructor(private chatService: ChatService) {}

  @Get()
  @Version('1')
  async getAvailableGeminiModel() {
    return this.chatService.getAvailableModelResponse()
  }
}
