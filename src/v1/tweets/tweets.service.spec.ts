import { Test, TestingModule } from '@nestjs/testing'
import { TweetsService } from './tweets.service'

describe('TweetsService', () => {
  let service: TweetsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService],
    }).compile()

    service = module.get<TweetsService>(TweetsService)
  })

  describe('create twee', () => {
    it('should create a tweet', () => {
      service.tweets = []
      // Arrange      //
      const payload = 'This is a tweet'

      // Act
      const tweet = service.createTweet(payload)

      // Assert
      expect(tweet).toEqual(payload)
      expect(service.tweets).toHaveLength(1)
    })

    it('should prevent tweets created which are over 100 characters', () => {
      service.tweets = []
      // Arrange
      const payload = 'a'.repeat(101)

      // Act
      // Assert
      expect(() => service.createTweet(payload)).toThrowError()
    })
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
