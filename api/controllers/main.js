var mongoose = require('mongoose');


// Importing Model
var Herb = mongoose.model('Herb');


// Fetching all entries and sending response

module.exports.HerbReadAll = function(req, res, next) {
    Herb.find()
    .exec()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send('error occured')
    })
}

// Fetching an entry by ID  and sending response

module.exports.HerbReadOne = function(req, res, next) {
        Herb.findOne({
            _id: req.params.herbid
        }).exec()
        .then((response) => {
            res.send(response);

        }).catch((err) => {
            res.send('error occured');
        })
}

// Creating a new entry



// Fetching an entry by ID  and sending response

module.exports.HerbReadOne = function(req, res, next) {
        if (req.params.herbid) {
             Herb.findOne({
            _id: req.params.herbid
            }).exec()
            .then((response) => {
                res.json(response);
                console.log('***** Retrieved Data Successfully *****')

            }).catch((err) => {
                res.console(req.params.herbid + ' not found');
            })
        }
        else {
            console.log('check parameters')
        }
       
}


// Creating a new entry

module.exports.HerbCreate = function(req, res, next) {
    Herb.create({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        img: req.body.img,
        keywords: req.body.keywords,
    })
    .then((newHerb) => {
        res.json(newHerb)
        console.log('***** Added Entry Successful *****')
        console.log(req.body)
    })
    .catch((err) => {
        console.log('***** Failed To Create Entry  *****')
    })

    
}

// Updating entry by ID

module.exports.HerbUpdate = function(req, res, next) {
    Herb.findByIdAndUpdate(
        req.params.herbid,
        { $set: { 
                name: req.body.name,
                description: req.body.description,
                img: req.body.img,
                type: req.body.type,
                img: req.body.img,
                keywords: req.body.keywords,
             }
        },
        { new: true },
        function(err, data) {
            if (err) return handleError(err) {
            res.send(data);
            }
            if (err) {
                console.log(err);
            }
            else {
                console.log('***** Updated ' + req.params.herbid + ' Successful: *****');
                res.json(data);
            }

         }
        )
}

// Removing entry by ID

module.exports.HerbDelete = function(req, res, next) {
    Herb.findByIdAndRemove({
        _id: req.params.herbid}, function(err, data) {
            res.send()
            res.json()
            console.log('***** Deleted ' + req.params.herbid + ' Successful *****')
    })
  
}


module.exports.addMedicinalProperties = function(req, res, next) {
    Herb.findOne({
        _id: req.params.herbid
    })
    .exec()
    .then((data) => {
        data.properties.push({
            effects: {
                properties: req.body.properties,
                rating: req.body.rating,
            }
        });
        data.save()
        console.log('Success');
    })
}

module.exports.HerbCreate = function(req, res, next) {
    Herb.create(req.body)
    .then((newHerb) => {
        res.send(newHerb)
    })
    .catch((err) => {
        res.send('error occured')
     // If no search query parameter is provided, will run this code, which returns all the data back to us
    if (!req.query.search) {
        Herb.find()
        .exec()
        .then((data) => {
            res.json(data);
            console.log('***** Retrieved All Data Successfully *****')
        })
        .catch((err) => {
            res.json('error occured')
        })
    }
    else if (req.query.search) {
        Herb.find({
            'keywords': req.query.search
        })
        .exec()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json('error occured')
        })
    }

    
    // If a search query parameter is provided, will run this code which returns only returns the search parameter value


}

