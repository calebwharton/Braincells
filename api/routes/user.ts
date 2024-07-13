import { Router } from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../db/User';

const userRoutes = Router();


userRoutes.post("/", async (req: Request, res: Response) => {
  const {name, phoneNumber, email, password} = req.body
  console.log(name, phoneNumber, email, password);
  try {
    //creating new user
    const newUser = new User({
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    })

    //uploading new user to mongo
    const savedUser = await newUser.save();
    
    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


//for login page 
//assuming email and password passed in payload
userRoutes.post('/check-user', async (req: Request, res: Response) => {
  const { email, password } = req.body; 
  console.log(email, password)
  
  try {
    //find user w the email and pass
    const user = await User.findOne({ email: email, password: password });

    console.log(user)
    if (!user) {
      //if no such user 
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    //if user exists
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

//update feature, updates user balance, itemsList, charities, cart
userRoutes.post("/add-event", async (req: Request, res: Response) =>{
  const {id, eventId} = req.body
  console.log(id, eventId)
  try{
    const user = await User.findById(id);
    if (!user) {
      //if no such user 
      return res.status(404).json({ message: 'Invalid credentials' });
    }
    user.eventsList.push(eventId);
    // console.log(user)
    await user.save()
    
    res.status(200).json(user); 
  }catch (error: any){
    res.status(400).json({ message: error.message });
  }
})


export default userRoutes;




// // GET /api/users
// userRoutes.get("/", async (req: Request, res: Response) => {
//   // Logic to fetch all users from the database
//   try {
//     const results = await User.find()
//     const users = results.map((user) => user.toObject())
//     return res.json(users)
//   } catch (error: any) {
//     res.status(500).json({ message: error.message })
//   }
// })


// userRoutes.post("/check-user", async (req: Request, res: Response) => {
//   const accessToken = req.body.email;
//   try {
//     const response = await User.findOne({ email: String }).exec()
//     console.log(response)
//     if (response != undefined && response !== null) {
//       res.status(200).json({ user: response, success: true })

//     } else {
//       res.status(200).json({
//         success: false,
//         error: "User not found"
//       })
//     }
//   } catch (error) {
//     res.status(400).json({ success: false, errorMessage: error })
//   }


// })

// // GET /api/user/:upi
// userRoutes.get("/:upi", async (req: Request, res: Response) => {
//   const email = req.params.email
//   try {
//     const user = await User.findOne({ email: email }).exec() // Await the result or use exec()
//     if (user) {
//       res.json(user)
//     } else {
//       res.status(404).json({ message: "User not found" })
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message })
//   }
// })

// // POST /api/user
// userRoutes.post("/", (req: Request, res: Response) => {
//   const userData = req.body
//   // console.log(req)


//   // Logic to create a new user in the database
//   const newUser = new User({
//     email: req.body.email,
//     password: req.body.password,
//   })

//   try {
//     const savedUser = newUser.save()
//     res.status(201).json(savedUser)
//   } catch (error: any) {
//     res.status(400).json({ message: error.message })
//   }
// })

// // PUT /api/user/:email
// userRoutes.put("/:email", async (req: Request, res: Response) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { upi: req.params.upi }, // Filter criteria
//       req.body, // Updated data
//       { new: true } // Return the updated document
//     ).exec() // Execute the query

//     if (updatedUser) {
//       res.json(updatedUser)
//     } else {
//       res.status(404).json({ message: "User not found" })
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message })
//   }
// })

// export default userRoutes
