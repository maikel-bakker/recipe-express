import * as mongoose from 'mongoose';
import { ScheduleWeekDaySchema } from './scheduleWeekDayModel';

const Schema = mongoose.Schema;

export const ScheduleSchema = new Schema({
    weekNumber: {
        type: Number,
        required: 'Enter a weeknumber'
    },
    weekDays: [ScheduleWeekDaySchema]
});

export const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);
