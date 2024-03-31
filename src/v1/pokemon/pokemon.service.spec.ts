import { Test, TestingModule } from '@nestjs/testing'
import { PokemonService } from './pokemon.service'
import { HttpModule } from '@nestjs/axios'
import { BadRequestException } from '@nestjs/common'

describe('PokemonService', () => {
  let pokemonService: PokemonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PokemonService],
    }).compile()

    pokemonService = module.get<PokemonService>(PokemonService)
  })

  it('should be defined', () => {
    expect(pokemonService).toBeDefined()
  })

  describe('getPokemon', () => {
    it('Pokemon ID less than 1 should throw error', async () => {
      const getPokemon = pokemonService.getPPokemon(0)

      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException)
    })

    it('pokemon ID greater than 151 should throw error', async () => {
      const getPokemon = pokemonService.getPPokemon(152)
      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException)
    })

    it('valid Pokemon ID to return the pokemon name', async () => {
      const getPokemon = pokemonService.getPPokemon(1)

      await expect(getPokemon).resolves.toBe('bulbasaur')
    })
  })
})
