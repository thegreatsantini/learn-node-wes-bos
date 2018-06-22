const mongoose = require('mongoose');
const Store = mongoose.model('Store'); // look at Start.js uses Singleton

exports.homePage = (req, res) => {
    res.render('index');
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' })
}



exports.createStore = async (req, res) => {
    const store = new Store(req.body);
    await store.save();
    Store.find({ name: req.body.name }, function(err,success){
        if (success) {
            console.log(success)
        }
    })
    res.redirect('/');
    
}