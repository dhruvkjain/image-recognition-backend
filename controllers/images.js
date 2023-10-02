const handleimages = (req , res, db, bcrypt)=>{
    let {id} =req.body ;
    db('users')
    .where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{res.json(entries[0].entries)})
    .catch(err=>res.status(404).json("Unable to get entries"));
}

module.exports = {
    handleimages : handleimages
}