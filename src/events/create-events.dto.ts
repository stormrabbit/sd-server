import * as moment from 'moment';
export class CreateEventsDto {
    readonly eventStr :string;
    static toResult(dto:CreateEventsDto){
        const date = new Date();
        return `\n${date.getTime()}\t\t${moment(date).format('MM-DD hh:mm:ss')}\t\t${dto.eventStr}\n`;
    }
}