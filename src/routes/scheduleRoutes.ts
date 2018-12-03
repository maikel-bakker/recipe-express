import { ScheduleController } from '../controllers/scheduleController';

export class ScheduleRoutes {
    scheduleController : ScheduleController = new ScheduleController();  
        
    public routes(app): void {          
        app.route('/get-schedules').get(this.scheduleController.getSchedules);
        app.route('/get-schedule/:weekNumber').get(this.scheduleController.getSchedule);
        app.route('/add-schedule').post(this.scheduleController.addSchedule);
    }
}