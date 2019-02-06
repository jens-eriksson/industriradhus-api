import { Unit } from '../models/unit';

export class UnitController {

    public add(req, res) {
        if (req.user.role == "admin") {
            let unit = new Unit(req.body);

            unit.save((err, project) => {
                if (err) {
                    res.send(err);
                }
                res.json(project);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    }

    public getAll(req, res) {
        Unit.find({}, (err, units) => {
            if (err) {
                res.send(err);
            }
            res.json(units);
        });
    }

    public getByKey(req, res) {
        Unit.findOne({ key: req.params.id }, (err, unit) => {
            if (err) {
                res.send(err);
            }
            res.json(unit);
        });
    }

    public update(req, res) {
        if (req.user.role == "admin") {
            Unit.findOneAndUpdate({ key: req.params.id }, req.body, { new: true }, (err, unit) => {
                if (err) {
                    res.send(err);
                }
                res.json(unit);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    }

    public delete(req, res) {
        if (req.user.role == "admin") {
            Unit.remove({ key: req.params.id }, (err, unit) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted unit!' });
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }

    }

}