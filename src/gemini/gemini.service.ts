import { Injectable, Logger } from '@nestjs/common'
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  SafetySetting,
} from '@google/generative-ai'
import { ConfigService } from '@nestjs/config'
import { v4 } from 'uuid'

@Injectable()
export class GeminiService {
  private logger = new Logger(GeminiService.name)
  private gemini: GoogleGenerativeAI
  private chat: any[] = []

  constructor(private configService: ConfigService) {
    // Initialize the Gemini client with your API credentials
    this.gemini = new GoogleGenerativeAI(this.configService.get('apiKey'))
    this.logger.log('Gemini Started')
  }

  async generateText(modelName: string, prompt: string) {
    const model = this.gemini.getGenerativeModel({ model: modelName })
    this.logger.log('Gemini Generating incoming prompt')

    const result = await model.generateContent(prompt)
    this.logger.log(result)
    const response = await result.response
    this.logger.log(response)
    const text = await response.text()
    this.logger.log(text)
    return text
  }

  async createChat(safetySettings?: SafetySetting[]) {
    const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' })

    const chat = model.startChat({
      safetySettings: safetySettings
        ? safetySettings
        : [
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
          ],
    })

    this.chat.push({
      id: v4(),
      chat: chat,
    })

    return chat
  }

  async sendMessageToChat(chatId: string, prompt: string) {
    const chat = this.chat.find((c) => c.id === chatId)
    const result = await chat.chat.sendMessage(prompt)
    const response = await result.response
    const text = response.text()
    return text
  }

  
}
