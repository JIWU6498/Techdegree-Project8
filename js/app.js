const gridContainer = document.getElementById('grid-container')

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
        <div id="grid-item-employee">
            <img class="avatar" src="${employee.picture.large}"/>
            <div class="info">
                <b class="name">${employee.name.first + ' ' + employee.name.last}</b>
                <p class="email">${employee.email}</p>
                <p class="city">${employee.location.city}
            </div>
        </div>
        `
    ).join('');
    gridContainer.innerHTML = employee;
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------


// ------------------------------------------
//  POST DATA
// ------------------------------------------