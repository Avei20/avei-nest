import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ChatService {
  private logger = new Logger(ChatService.name)

  constructor() {}

  async getAvailableModelResponse() {
    return {
      success: true,
      message: 'This available Gemini Models',
      data: [
        {
          key: 'gemini-pro-vision',
          name: 'Gemini Pro Vision',
        },
        {
          key: 'gemini-pro',
          name: 'Gemini Pro',
        },
      ],
    }
  }

  
}
