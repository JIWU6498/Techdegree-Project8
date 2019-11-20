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

function getModalView(employees) {
    for (let i = 0; i < employeesCard.length; i++) {
        employeesCard[i].addEventListener('click', (event) => {
            modal(employees[i]);
        });
    };

    const modal = (employee) => {
        const modalContainer = document.getElementById("modal-container");
        //The navigator and formats date depending on users locale.
        const birthday=new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language);
        modalContainer.innerHTML = `
        <div class="modal">
            <button id="close">X</button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first}'s profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p><hr>
                <p class="modal-text">${employee.phone}</p>
                <p class="modal-text cap">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday:${birthday}</p>
             </div>
        </div>
        `;
        modalContainer.style.display="block";
        const close=document.getElementById("close");
       
        close.addEventListener("click",(event)=>{
            modalContainer.style.display="none";
        });

    }

   
}
