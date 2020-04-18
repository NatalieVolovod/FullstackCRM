const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function(req, res) {
    const query = {
        user: req.user.id
    };

    if(req.query.start) {  // start date
        query.date = {
            // greater then or equal
            $gte: req.query.start
        }
    }

    if(req.query.end) {  // end date
        if(!query.date) {
            query.date = {};
        }

        // less then or equal
        query.date['$lte'] = req.query.end;
    }

    if(req.query.order) {
        query.order = +req.query.order;
    }

    try {
        const orders = await Order
            .find(query)
            .sort({date: -1})  // in decreasing order
            .skip(+req.query.offset)
            .limit(+req.query.limit);

        res.status(200).json(orders);
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function(req, res) {
    try{
        const lastOrder = await Order
            .findOne({user: req.user.id})
            .sort({date: -1});  // in decreasing order

        const maxOrder = lastOrder ? lastOrder.order : 0;

        const order = await new Order({
            order: maxOrder + 1,
            list: req.body.list,
            user: req.usr.id
        }).save();
        res.status(201).json(order);
    } catch(e) {
        errorHandler(res, e);
    }
}