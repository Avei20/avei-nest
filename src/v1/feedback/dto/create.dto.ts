import { IsNotEmpty } from 'class-validator'

export class CreateFeedbackDTO {
  @IsNotEmpty({ message: 'Message is required' })
  message: string
}
