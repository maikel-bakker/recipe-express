import { Request, Response } from 'express';
import { ScheduleModel } from '../models/scheduleModel';
import { IngredientController } from './ingredientController';
import { request } from 'http';

export class ScheduleController {
    static ingredientController : IngredientController = new IngredientController();

    getSchedules(req: Request, res: Response): void {
        ScheduleModel
        .find()
        .populate('weekDays.recipe')
        .exec((err, schedule) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(schedule);
            }
        });
    }

    getSchedule(req: Request, res: Response) : void {;
        ScheduleModel
        .findOne({ weekNumber: req.params.weekNumber })
        .populate('weekDays.recipe')
        .exec((err, schedule) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (schedule) {
                    res.status(200).json(schedule);
                } else {
                    res.status(404).json({ statusText: `schedule ${req.params.weekNumber} not found`})
                }
            }
        })
    }
    
    addSchedule(req: Request, res: Response): void {
        const newSchedule = {
            weekNumber: req.body.weekNumber,
            weekDays: req.body.weekDays
        }

        ScheduleModel.findOneAndUpdate({ weekNumber: req.body.weekNumber }, 
            newSchedule, 
            { upsert: true }, 
            (err, schedule) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(schedule);
                    ScheduleController.ingredientController.addIngredientList(schedule);
                }
            });
    }
}