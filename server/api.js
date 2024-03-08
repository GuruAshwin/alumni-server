let express=require('express')
const bodyParser = require('body-parser');
let cors=require('cors')
let app=express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
let{getdata,dbconnect,record,insertdata,getPosts}=require('./dbconn');

const secretKey= 'seckey';

function verifytoken(req, res, next){
    const token = req.headers.authorization;

    if(!token){
        return res.status(403).json({error: 'Token is missing'});
    }

    jwt.verify(token, secretKey, (err, decoded)=>{
        if(err){
            return res.status(401).json({error: 'Invalid token'});
        }
        req.userId=decoded.userId;
        next();
    })
}

app.get('/api/protected', jwt.verifytoken ,(req, res)=>{
    res.json({message: 'This is a protected route', userId})
});

app.get('/', async(req, res)=>{
    res.send("<h1>this is server</h1>")
})

app.get('/sampledata',async(req,res)=>{
    let query={}
    let result= await getdata('logindetails',query)
    console.log(result)
    res.send(result)
})
app.post("/harikiran",async(req,res)=>{
    try{
        const {username,password}=req.body;
        const userdetails = await record('logindetails',{"registration_number":parseInt(username)})
        if(!(userdetails)) return res.status(500).send({auth:false,token:'No User Found Register First'})
        else{
            const passIsValid = (password==parseInt(userdetails.phone_number))?true:false;
            if(!passIsValid) return res.status(401).send({auth:false,token:'Invalid Password'})
            let token = jwt.sign({id:userdetails._id},'supersecert',{expiresIn:6400})
            return res.status(200).send({auth:true,token:token})
        }
    }catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
})
app.post('/nominationdetails',async(req,res)=>{
    const {formData}=req.body
    const result = await insertdata("nomination",formData)
    res.send(result);
})
app.post('/regestrationdetails',async(req,res)=>{ 
    const {formData}=req.body
    const result = await insertdata("Regestration",formData)
    res.send(result);
})

app.post('/addposts',async(req,res)=>{
    const {formData} = req.body
    const result = await insertdata("Jobposts", formData)
    res.send(result);
})

app.get('/postlists',async(req,res)=>{
    try {
        // Query the database to get job posts
        //const query = sort({ createdAt: -1 }).limit(10); // You might add filters or pagination here if needed
        const jobPosts = await getPosts("Jobposts");
        res.send(jobPosts);
      } catch (error) {
        console.error('Error fetching job posts:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
})

app.listen('8100',(err)=>{
    if(err) throw err;
    dbconnect()
    console.log('server started')
})