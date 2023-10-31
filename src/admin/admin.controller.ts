import { Controller, Get } from '@nestjs/common'

@Controller({
  host: 'admin.localhost',
})
export class AdminController {
  @Get()
  index(): string {
    return 'Admin Page'
  }
}
