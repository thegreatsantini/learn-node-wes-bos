const mongoose = require('mongoose');
const Store = mongoose.model('Store'); // Question look at Start.js uses Singleton

exports.homePage = (req, res) => {
    res.render('index');
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' })
}



exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save(); // call save which returns a promise and we await it
    // Question why do we access the name with Store.name
    req.flash('success',`Successfully Created ${store.name}. Care to leave a review?`);
    res.redirect(`/store/${store.slug}`);
    
}