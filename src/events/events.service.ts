import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import {fsTools } from 'eschew-materials';
@Injectable()
export class EventsService {
    LIMIT = 20;
    public parseResult(beacon:string) {
        const date = new Date();
        return `${date.getTime()}\t\t${moment(date).format('MM-DD HH:mm:ss')}\t\t${beacon}`;;
    }
        
    public async create(result: string) {
        console.log(result);
        const current = await fsTools.readFilePlus('temp.db');
        const finalResult: Array<String> = Array.from(current.split('\n').filter(str => !!str));
        if (finalResult.length > this.LIMIT) {
            finalResult.shift();
        }
        finalResult.push(result);
        await fsTools.writeFilePlus('temp.db', finalResult.filter(str => !!str).join('\n'));
    }

    public async retrieveAll() {
        const result = await fsTools.readFilePlus('temp.db');
        console.log(result);
        return !!result? result.split('\n').map(item => {
            const temp = item.split('\t').filter(it => !!it);
            return {
                timestrap: temp[0],
                date: temp[1],
                event: JSON.parse(temp[2]),
            };
        }): [];
    }
}
