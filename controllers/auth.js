const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    try {
      //email,fullname,pass,confirmpassword

      //naiven pristapp: proverka dali lozinkite se sovpagjaat : DONT DO DIS!
      //   if (req.body.password && req.body.password == req.body.confirmation_password)

      //proverka dali ne se soovpagjaat passwordite,AKA EARLY EXIT

      if (
        !req.body.password ||
        req.body.password != req.body.confirmation_password
      ) {
        return res
          .status(400)
          .send({ error: true, messege: "Bad Req, Password do not match." });
      }
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res.status(400).send({
          error: true,
          messege: "User exists with that email",
        });
      }

      req.body.password = bcrypt.hashSync(req.body.password);

      await User.create(req.body);

      res.status(201).send({
        error: "false",
        message: "User Registered",
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }

    res.send({
      message: "POST ON /api/v1/auth/register",
    });
  },
  login: async (req, res) => {
    try{
        //email,password
        const user= await User.findOne({email: req.body.email})
        if(!user){
            return res.status(400).send({
                error: true,
                message: 'No user with that email'
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).send({
                error: true,
                message: 'Incorrect password'
            })
        }

        const payload={
            id: user._id,
            email: user.email
        }

        const token = jwt.sign(payload,'secret_key',{
            expiresIn: '30m'
        });

        res.send({
            error: false,
            message: 'JWT Successully generated',
            token: token
          });

    }catch(error){
        res.status(500).send({
            error: true,
            message: error.message,
          });
    }
  },
 refresh: (req,res)=>{
    res.send({message: 'noice'})
}
};
