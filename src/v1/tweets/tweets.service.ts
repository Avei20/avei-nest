import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetsService {
  tweets: string[] = []

  createTweet(tweet: string) {
    if (tweet.length > 100) {
      throw new Error('Tweet is too long')
    }

    this.tweets.push(tweet)
    return tweet
  }

  updateTweet(tweet: string, id: number) {
    const tweetToUpdate = this.tweets[id]
    if (!tweetToUpdate) {
      throw new Error('Tweet not found')
    }

    if (tweet.length > 100) {
      throw new Error('Tweet is too long')
    }

    this.tweets[id] = tweet
    return tweet
  }

  getTweets() {
    return this.tweets
  }

  deleteTweet(id: number) {
    const tweetToDelete = this.tweets[id]
    if (!tweetToDelete) {
      throw new Error('Tweet not found')
    }

    this.tweets = this.tweets.splice(id, 1)
    return tweetToDelete
  }
}
