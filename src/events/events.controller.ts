import { Controller, Post, Body, Get,Options } from '@nestjs/common';
import { CreateEventsDto } from './create-events.dto';
import { EventsService } from './events.service';
@Controller('v1/events')
export class EventsController {
    constructor(
        private service: EventsService
    ){}
    @Post('/beacon')
    async createEventsByBeancon(@Body() dto:any) {
        if(typeof dto === 'object') {
            for(const key of Object.keys(dto)) {
                const result = this.service.parseResult(key);
                this.service.create(result);
                return result;
            }
        }
        return 'error'
    }


    @Post()
    async createEvents( @Body() dto:CreateEventsDto) {
        const result = this.service.parseResult(dto.eventStr);
        await this.service.create(result);
        return result;
    }

    @Get()
    async getEvents() {
        const items = await this.service.retrieveAll();
        return items.reverse();
    }

    
}
