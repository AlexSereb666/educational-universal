import { Controller, Post, Body, Get } from '@nestjs/common';
import { QueryService } from './query.service';

@Controller('query')
export class QueryController {
    constructor(private readonly queryService: QueryService) {}

    @Post('execute')
    async executeQuery(@Body('sql') sql: string) {
        return this.queryService.executeQuery(sql);
    }

    @Get('schema')
    async getSchema() {
        return this.queryService.getSchema();
    }
}
