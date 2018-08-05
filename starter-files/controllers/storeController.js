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

exports.getStores = async (req, res) => {
    // query DB for list of all stores
    const stores = await Store.find()
    res.render('stores', {title: 'Stores', stores})
}

exports.editStore = async (req, res) => {
    // find a store given the ID
    const store = await Store.findOne({_id: req.params.id});
    // confirm they are the owner of the store
    // render edit form to update store info
    res.render('editStore', { title: "Edit store" , store })
};

exports.updateStore = async (req, res) => {
    //  find and update the store
    const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true, // return the new store instead of the old one
        runValidators: true
    }).exec(); // query, data , options
    req.flash('success',`Successfully updated ${store.name}. <a href="/stores/${store.slug}" >View Store</a>`);
    // redirect them to the store and tell them it worked
    res.redirect(`/stores/${store.id}/edit`);
};