const handleSignin = (req , res, db, bcrypt)=>{
    if(req.body.email == '' ||
     req.body.password == '' || 
     req.body.name == ''||
     !(req.body.email.includes('@')) ||
     !(req.body.email.includes('.')))
    {
        res.status(400).json("Wrong Credentials"); 
    }
    else{
        db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data=>{
        const isvalid = bcrypt.compareSync(req.body.password, data[0].hash)
        if(isvalid){
            db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user =>{
                res.json(user[0])
            }).catch(err => res.status(400).json("Unable to get user"));
        }
        else{
            res.status(400).json("Wrong Credentials"); 
        }
    }).catch(err => res.status(400).json("Wrong Credentials")); 
    }
}

export default handleSignin;

