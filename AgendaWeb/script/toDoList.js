//Contenedor para las tareas
const contenedorLista = document.getElementById('listaToDo')
const contenedorDone = document.getElementById('taskDone')

//Array de tareas
let tasks = []

//Array de tareas hechas
let taskDone = []

//Id de los elementos del array
let clave = 0

//Index del elemento que se quiere modificar
let elementIndex

//funcion para hacer push al array
function addTask() {
    let priority = document.getElementById('priority').value*1
    let tarea = document.getElementById('task').value

    if(priority == 0) return alert("Por favor seleccione una prioridad")
    if(!tarea) return alert('Por favor escriba un nombre para su tarea')

    tasks.push({id: clave, name: tarea, prioridad: priority})

    clave++

    //Ordenar array
    tasks.sort((a, b)=>{
        return a.prioridad - b.prioridad
    })

    console.log(tasks)

    //Insertar elemenento
    listArray()
    document.getElementById('priority').value = '0'
    document.getElementById('task').value = null
}



//funcion para recorrer array e insertar elementos
function listArray() {
    let prioridad
    let color
    let content
    contenedorLista.innerHTML = ""
    
    //Asignacion de tareas
    for(let ts of tasks){
        
        //Definicion de color de prioridad del elemento
        if(ts.prioridad == 1) {
            prioridad = 'Alta'
            color = '#EA4F51'
        }
        if(ts.prioridad == 2) {
            prioridad = 'Media'
            color = '#E1EA7A'
        }

        if(ts.prioridad == 3) {
            prioridad = 'Baja'
            color = '#86EA7A'
        }


        //Insercion de codigo html
        let task = document.createElement("div")

        content = `
            <div class="row-contact row center" id="${ts.id}">
                <div class="col-sm-1">
                    <h4 style="color: ${color}">${prioridad}</h4>
                </div>
                
                <div class="col-sm-1">
                    <img src="./img/check.png" class="rounded-circle img-fluid" alt="task">
                </div>
                <div class="col-sm-6">
                    <h4>${ts.name}</h4>
                </div>

                <div class="col-sm-1" style="margin: 10px 0px;">
                    <a onclick="taskFinal('${ts.id}')">
                        <button type="button" class="btn btn-success">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="#ffff" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                            </svg>
                            Hecho
                        </button>
                    </a>
                </div>

                <div class="col-sm-1">
                    <a href="#" onclick="datos('${ts.id}')" data-bs-toggle="offcanvas" data-bs-target="#editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="30" fill="#ffff" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </a>
                </div>

                <div class="col-sm-1">
                    <a href="#" onclick="deleteTask('${ts.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="30" fill="#ffff" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </a>
                </div>
            </div>

            <hr class="divisor">

            <div class="offcanvas offcanvas-bottom" id="editar" style="background-color: #1d1d22; height:400px">
                <div class="offcanvas-header canvasH">
                    <h1 class="offcanvas-title">Edit task</h1>
                    <a href="#" data-bs-dismiss="offcanvas">
                        <button type="button" class="btn btn-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#ffff" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </button>
                    </a>
                </div>
                <div class="offcanvas-body canvasH">
                    <div class="row canvasC">
                        <div class="col-sm-1">
                            <span class="label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="30" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                            </svg>
                            </span>
                        </div>
                        
                        <div class="col-sm-5">
                            <input type="text" class="form" id="updateName">
                        </div>
                    </div>

                    <div class="row canvasC">
                        <div class="col-sm-1">
                            <span class="label">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="30" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                            </span>
                        </div>
                        
                        <div class="col-sm-5">
                            <select class="form-select" id="updatePriority">
                                <option value="1">Alta</option>
                                <option value="2">Media</option>
                                <option value="3">Baja</option>
                            </select>
                        </div>
                    </div>

                    <div class="container p-5 wy-5 d-flex justify-content-center">
                        <a href="#" data-bs-dismiss="offcanvas"><button type="button" class="btn btn-success" onclick="editarTask()" style="margin: 10px;">Guardar</button></a>
                    </div>
                    
                </div>
            </div>
        `

        //Insertar al div
        task.innerHTML = content
        contenedorLista.append(task)
    }
}



//funcion editar tarea
function editarTask() {
    console.log(elementIndex)

    const name = document.getElementById('updateName').value
    const prio = document.getElementById('updatePriority').value*1

    tasks[elementIndex].name = name
    tasks[elementIndex].prioridad = prio

    tasks.sort((a, b)=>{
        return a.prioridad - b.prioridad
    })

    console.log(tasks)

    //Mostrar elementos acutalizados
    listArray()
}



//funcion eliminar tarea
function deleteTask(idd) {
    elementIndex = tasks.findIndex((i => i.id == idd*1))
    tasks.splice(elementIndex, 1)

    console.log(tasks)

    tasks.sort((a, b)=>{
        return a.prioridad - b.prioridad
    })

    //Mostrar array sin el elemento eliminado
    listArray()
}



//funcion para trasladar los datos de la tarea al formulario del update
function datos(idd){
    console.log(idd)

    elementIndex = tasks.findIndex((i => i.id == idd))

    let name = document.getElementById('updateName')
    let prio = document.getElementById('updatePriority')

    console.log(elementIndex)

    name.value = tasks[elementIndex].name
    prio.value = tasks[elementIndex].prioridad

    console.log(tasks)
}

//Funcion para terminar una tarea
function taskFinal(idd) {
    let index = tasks.findIndex((i => i.id == idd))

    taskDone.push({id: tasks[index].id, name: tasks[index].name, prioridad: tasks[index].prioridad})
    taskDone.sort((a, b)=>{
        return a.prioridad - b.prioridad
    })

    deleteTask(idd)
    
    listDoneArray()
}

function listDoneArray() {
    contenedorDone.innerHTML = ""
    let content

    for (td of taskDone){
        let task = document.createElement("div")

        content = `
            <div class="row-contact row center" id="${td.id}">
                <div class="col-sm-1">
                    <h4>    
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#258CF3" class="bi bi-check2-all" viewBox="0 0 16 16">
                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                    </h4>
                </div>

                <div class="col-sm-8">
                    <strike>
                        <h4>${td.name}</h4>
                    </strike>
                </div>

                <div class="col-sm-3" style="margin: 10px 0px;">
                    <div class="d-grid">
                        <button type="button" class="btn btn-secondary btn-block" onclick="returnTask('${td.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="#ffff" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                            </svg>
                            Cancelar
                        </button>
                    </div>
                    
                </div>

            <hr class="divisor">
        `

        task.innerHTML = content
        contenedorDone.append(task)
    }
}

function deleteDoneTask(idd){
    let index = taskDone.findIndex((i => i.id == idd))
    taskDone.splice(index, 1)
}

function returnTask(idd){
    let index = taskDone.findIndex((i => i.id == idd))

    tasks.push(taskDone[index])
    tasks.sort((a, b)=>{
        return a.prioridad - b.prioridad
    })

    deleteDoneTask(idd)
    listDoneArray()
    listArray()
}