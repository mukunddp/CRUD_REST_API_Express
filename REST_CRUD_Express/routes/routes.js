const { application } = require('express');
const express = require('express');
// imported router from express 
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Employee = require('../models/employee.js');

router.get('/', (req, resp) => {
    Employee.find((err, doc) => {
        if (err) {
            console.log('error in Post application', err);
        }
        else {
            resp.send(doc);
            // console.log(doc[0].name);
        }
    });
})

// router.get('/login', async (req, resp) => {
//     console.log(req.body.name);
//     let data = await Employee.find(
//         {
//             "$or": [
//                 { "name": { $regex: req.body.name } },
//                 // { "position": { $regex: req.body.position } },
//                 // { "dept": { $regex: req.body.dept } },
//             ],
//             // "$or": [
//             //     { "position": { $regex: req.body.position } },
//             // ],
//             // "$or": [
//             //     { "dept": { $regex: req.body.dept } },
//             // ],
//         }
//     );
//     resp.send(data);
// })

router.get('/:id', (req, resp) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log('error in Get application', err);
            }
            else {
                resp.send(doc);
                // console.log(resp.body);
            }
        })
    }
    else {
        return resp.status(400).send('No records found for - ', req.params.id)
    }
})

router.post('/', (req, resp) => {
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept,
        password: req.body.password,
        email: req.body.email,
    });

    emp.save((err, doc) => {
        if (err) {
            console.log('error in Post application', err);
        }
        else {
            resp.send(doc);
            console.log(req.body);
        }
    })
})

router.put('/:id', (req, resp) => {
    if (ObjectId.isValid(req.params.id)) {

        let emp = {
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept,
            password: req.body.password,
            email: req.body.email,
        };
        Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
            if (err) {
                console.log('error in Update application', err);
            }
            else {
                resp.send(doc);
                // console.log(resp.body);
            }
        })
    }
    else {
        return resp.status(400).send('No records found for - ', req.params.id)
    }
})

router.delete('/:id', (req, resp) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                console.log('error in Delete application', err);
            }
            else {
                resp.send(doc);
                // console.log(resp.body);
            }
        })
    }
    else {
        return resp.status(400).send('No records found for - ', req.params.id)
    }
})

module.exports = router;