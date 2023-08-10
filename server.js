import { app } from "./app.js";

import { connectDB } from "./data/database.js";


// connecting database..
connectDB();



app.listen(process.env.PORT, ()=>{
    console.log(`server is working in ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

