import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let tasks=[];

function day(){
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date();
    return days[today.getDay()];
}

function date(){
    const date = new Date();
    return date.getDate();
}

function month(){
    const yearMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = new Date();
    return yearMonth[month.getMonth()];
}

app.get('/', (req,res)=>{
    res.render("index.ejs")
})

app.get('/list', (req,res) => {
    res.render("mylist.ejs",
        {
            day : day(),
            date : date(),
            month : month(),
            tasks:tasks,
        });
})

app.post('/addTask',(req,res) =>{
    const data = req.body.task;
    tasks.push({text:data, checked:false});
    res.redirect('/list');
})

app.post('/delete/:id' , (req,res)=>{
    const index = req.params.id;
    tasks.splice(index,1);
    res.redirect('/list');

})

app.post('/toggleTask/:id', (req,res) => {
    const index = req.params.id;
    tasks[index].checked = !tasks[index].checked;
    res.redirect('/list');
})

app.listen(port , () =>{
    console.log(`server running at: http://localhost:${port}`)
})
