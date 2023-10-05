const handleRegister = (req , res, db, bcrypt)=>{
    const hash = bcrypt.hashSync(req.body.password);
    
    if(req.body.email == '' || 
       req.body.password == '' || 
       !(req.body.email.includes('@')) ||
       !(req.body.email.includes('.')))
    {
        res.status(400).json("Wrong inputs")
    }
    else{
        db.transaction(trx=>{
            trx.insert({
                hash: hash,
                email: req.body.email,
            }).into('login')
            .returning('email')
            .then(loginemail=>{
                trx('users')
                .insert({
                    email : loginemail[0].email,
                    name : req.body.name,
                    joined : new Date()
                },'*').then(newuser=>res.json(newuser[0]))
            }).then(trx.commit)
            .catch(trx.rollback);
        }) 
        .catch(err => {
            res.status(400).json(err);
        });     
    }
}

export default handleRegister;
