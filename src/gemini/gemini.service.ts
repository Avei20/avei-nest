import { Injectable, Logger } from '@nestjs/common'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GeminiService {
  private logger = new Logger(GeminiService.name)
  private gemini: GoogleGenerativeAI

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
}
