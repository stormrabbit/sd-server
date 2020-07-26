import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateEventsDto } from './create-events.dto';
import {fsTools } from 'eschew-materials';
import { json } from 'express';
@Controller('v1/events')
export class EventsController {

    @Post()
    async createEvents( @Body() dto:CreateEventsDto) {
        const result = CreateEventsDto.toResult(dto);
        console.log(result);
        const current = await fsTools.readFilePlus('.log');
        const finalResult:Array<String> = Array.from (current.split('\n').filter(str => !!str));
        if(finalResult.length > 50) {
            finalResult.shift();
        }
        finalResult.push(result);
        await fsTools.writeFilePlus('.log', finalResult.filter(str => !!str).join('\n'));
        return result;
    }

    @Get()
    async getEvents() {
        const result = await fsTools.readFilePlus('.log');
        const items = result.split('\n').map(item => {
            const temp = item.split('\t').filter( it => !!it);
            return {
                timestrap : temp[0],
                date: temp[1],
                event: JSON.parse(temp[2]),
            }
        });

        return items;
        // return result.split('\n').filter(str => !!str).map(str => `<p>${str}</p>`).join('');
    }
}
