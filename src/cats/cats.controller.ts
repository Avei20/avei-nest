import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import { Observable, of } from 'rxjs'
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto'
import { CatsService } from './cats.service'

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  // @HttpCode(204)
  // @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto)
    this.catsService.create(createCatDto)
    return 'this action create a new born cat'
  }

  // @Get(':id')
  // findOne(@Param() params: any): string {
  //   console.log(params.id)
  //   return `This action returns a #${params.id} cat`
  // }

  @Get(':id')
  findSpecifictId(@Param('id') id: string): string {
    return `THis is specific cat at id ${id}`
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log(updateCatDto)
    return 'This actions update cat number' + id
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return 'This Action kill cat number ' + id
  }

  // Async
  // @Get()
  // async findAllAsync(): Promise<any[]> {
  //   return []
  // }

  @Get()
  findAllAsync(): Observable<any[]> {
    return of([])
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5')
      return {
        url: 'https://docs.nestjs.com/v5',
      }
  }

  @Get(`ab*cd`)
  findAll(@Req() request: Request): string {
    console.log(request)
    return 'this action returns all cats'
  }
}
