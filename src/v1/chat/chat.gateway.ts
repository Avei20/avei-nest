import { Logger } from '@nestjs/common'
import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { GeminiService } from 'src/gemini/gemini.service'

@WebSocketGateway({ cors: true, upgradeTimeout: 60000 })
export class ChatGateway implements OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ChatGateway.name)

  constructor(private geminiService: GeminiService) {}

  @WebSocketServer()
  server: Server

  users: any[] = []
  messages: any[] = []

  handleDisconnect(client: Socket) {
    this.users = this.users.filter((user) => user.id !== client.id)
    this.server.emit('users', this.users)
  }

  @SubscribeMessage('join')
  join(client: Socket, payload: any) {
    this.logger.log(payload)
    client.join(payload.chatId)
    this.users.push({
      id: client.id,
      ...payload,
    })

    this.server.emit('users', this.users)
  }

  @SubscribeMessage('request-messages')
  requestMessages(client: Socket, payload: any) {
    const msg = this.messages.filter(
      (m) =>
        (m.recipient == payload.recipient && m.sender == payload.sender) ||
        (m.recipient == payload.sender && m.sender == payload.recipient),
    )
    return msg
  }

  @SubscribeMessage('new message')
  async newMessage(client: Socket, payload: any) {
    this.logger.log(payload)
    this.logger.log(client)
    this.messages.push(payload)
    const response = await this.geminiService.generateText(
      payload.aiModel,
      payload.message,
    )
    payload.message = response
    payload.isUser = false
    this.server.to(client.id).emit('new message', payload)
  }
}
