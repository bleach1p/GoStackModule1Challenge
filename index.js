const express = require('express');
const server = express();

var qtReqs = 0;

server.use(express.json());

server.listen(3000);

const projects = [];

server.use((req,res,next) => {
  qtReqs ++;

  console.log(qtReqs);
  
  console.log(` Método :${req.method} URL: ${req.url}`)
  
  next();
});

function checkProjectInProjects(req,res,next){
  const { index } = req.params;

  projectAux = projects[index];

  if(!projectAux){
    return res.status(400).json({error : 'Project not located'})
  }

  next();
}

server.post('/projects', (req,res) => {
  const {project} = req.body;

  projects.push(project);
  
  return res.json(projects);
});

server.get('/projects:', (req,res)=>{

  return res.json(projects);
});

server.put('/projects/:index', checkProjectInProjects, (req,res)=>{
  const {title} = req.body;
  const {index} = req.params;

  projects[index].title = title;

  return res.json(projects);

});


server.delete('/projects/:index', checkProjectInProjects, (req,res) => {
  const { index } = req.params;
  
  projects.splice(index, 1);

  return res.json(projects);
});

//POST /projects/:id/tasks: A rota deve receber um campo title e armazenar uma nova tarefa no array
// de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;


server.post('/projects/:index/tasks:', (req,res) => {
   const { title } = req.body;
   const { index } = req.params;

  projects[index].tasks.push(title);

  return res.json(projects);
});
