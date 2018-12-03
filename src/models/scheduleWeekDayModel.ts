import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ScheduleWeekDaySchema = new Schema({
    day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        required: "Enter a day"
    },
    recipe: {
        type: Schema.Types.ObjectId,          
        ref: 'Recipe'
    }
})

export const ScheduleWeekDayModel = mongoose.model('ScheduleWeekDay', ScheduleWeekDaySchema);