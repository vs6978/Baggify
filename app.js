require("dotenv").config();
const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const path=require("path");
const expressSession=require("express-session")
const flash=require("connect-flash")


const ownersRouter=require("./routes/ownersRouter");
const productsRouter=require("./routes/productsRouter");
const usersRouter=require("./routes/usersRouter");
const indexRouter= require("./routes/index");


const db=require("./config/mongoose-connection");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        // --- FIX IS HERE ---
        secret: process.env.EXPRESS_SESSION_SECRET || "a_fallback_secret_for_development_only", // Use your environment variable
        // --- END FIX ---
        cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
    })
);

app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use("/", indexRouter);
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);


app.listen(3000);
