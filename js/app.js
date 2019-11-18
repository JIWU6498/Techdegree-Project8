const gridContainer = document.getElementById('grid-container');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Looks like there was a problem', error));
}

fetchData('https://randomuser.me/api/?results=12')
    .then(data => mapInformation(data.results))

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function mapInformation(data) {
    const employees = data;
    console.log(employees);
    const employee = employees.map(employee =>
        `
        <button id="grid-item-employee">
            <img class="avatar" src="${employee.picture.large}"/>
            <div class="info">
                <b class="name">${employee.name.first + ' ' + employee.name.last}</b>
                <p class="email">${employee.email}</p>
                <p class="city">${employee.location.city}
            </div>
        </button>
        `
    ).join('');
    gridContainer.innerHTML = employee;
   
    getModalView(employees);
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
const employeesCard = document.getElementsByTagName('button');

function getModalView(employees){
    for(let i=0; i<employeesCard.length; i++){
        employeesCard[i].addEventListener('click',(event)=>{
            const employeeName= employeesCard[i].querySelector('.name').textContent;
            console.log(employeeName);
            generateHTML(employeeName);
        });
    };
    function generateHTML(employeeName,employees){
       
        const html=`
            <div id="overlay">
               <img class="overlay-avatar"></img> 
                <p>
            </div>
        
        
        `
    };
}
// ------------------------------------------
//  POST DATA
// ------------------------------------------