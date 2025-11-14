const express = require('express');
const Contact = require('./mongoschma');

const router = express.Router();

router.post('/',async (req , res ) => {
  console.log('contact route reached');
  try{
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).send(newContact);
  }catch(error) {
    res.status(400).send({error: error.message});
  }
}) 

//gets all contacts
router.get('/', async (req,res ) => {
  try{
    const contacts = await Contact.find();
    res.send(contacts);
  } catch(error) {
    res.status(500).send({error: error.message});
  }
})
//get contact by id 
router.get('/:id', async (req,res) => {
  try{
    const foundContact = await Contact.findById(req.params.id);
    if(!foundContact) return res.status(404).send({error:'contact not found'});
    res.send(foundContact);

  }catch(error) {
    res.status(500).send({error: error.message});
  }
})

//update contacct but id
router.put('/:id', async (req, res) => {
  try{
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!updatedContact) return res.status(404).send({error: 'Contact not found'});
    res.send(updatedContact);
  }catch(error) {
    res.status(400).send({error: error.message});
  }
})

///delete the id
router.delete('/:id', async (req,res) => {
  try{
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if(!deletedContact) return res.status(404).send({error: 'Contact not found'});
    res.send({message: 'Contact deleted successfully'});
  }catch (error) {
    res.status(500).send({error: error.message});
  }
});

module.exports = router;