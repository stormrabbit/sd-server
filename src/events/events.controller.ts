import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateEventsDto } from './create-events.dto';
import {fsTools } from 'eschew-materials';
@Controller('v1/events')
export class EventsController {

    @Post()
    async createEvents( @Body() dto:CreateEventsDto) {
        const result = CreateEventsDto.toResult(dto);
        await fsTools.writeFilePlus('.log', result, true);
        return result;
    }

    @Get()
    async getEvents() {
        const result = await fsTools.readFilePlus('.log');
        return result.split('\n').filter(str => !!str).map(str => `<p>${str}</p>`).join('');
    }
}
