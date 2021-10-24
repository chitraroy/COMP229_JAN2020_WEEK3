// Connect to our model
let Buscontact = require('../models/buscontact');

module.exports.buscontactList = function(req, res, next) {  
    Buscontact.find((err, buscontactList) => {
        
        if(err)
        {
            return console.error(err);
        }
        else
        {
            console.log(buscontactList);
            res.render('buscontact/list', {
                title: 'Buscontact List', 
                BuscontactList: buscontactList
            })            
        }
    })

}


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Buscontact.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            // console.log(itemToEdit);
            res.render('buscontact/add_edit', {
                title: 'Edit Item', 
                item: itemToEdit,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}


module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    // console.log(req.body);

    let updatedItem = Buscontact({
        _id: req.body.id,
        contact_name: req.body.contact_name,
        contact_number: req.body.contact_number,
        email_address: req.body.email_address
       
        
    });

    // console.log(updatedItem);

    Buscontact.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            res.redirect('/buscontact/list');
        }
    });
}


module.exports.displayAddPage = (req, res, next) => {
    let newItem = Buscontact();

    res.render('buscontact/add_edit', {
        title: 'Add a new Item',
        item: newItem,
        userName: req.user ? req.user.username : ''

    })          
}


module.exports.processAddPage = (req, res, next) => {
    
    let newItem = Buscontact({
        _id: req.body.id,
        contact_name: req.body.contact_name,
        contact_number: req.body.contact_number,
        email_address: req.body.email_address
        
    });

    Buscontact.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(item);
            res.redirect('/buscontact/list');
        }
    });

}


module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Buscontact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/buscontact/list');
        }
    });
}