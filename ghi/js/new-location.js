window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/states/'
    // try {
    //     const response = await fetch(url);
    //     if (!response.ok) {
    //         const container = document.querySelector(".container");
    //         container.innerHTML = "<div class='alert alert-warning' role='alert'> Could not retrieve data from server! </div>";
    //     } else {
    //         const data = await response.json();
    //         console.log(data)
    //     }
    // }
    const response = await fetch(url);
    const data = await response.json();
    const selectTag = document.getElementById('state');
    for (let state of data.states) {
        const optionElement = document.createElement("option");
        optionElement.value = Object.values(state)[0];
        optionElement.innerHTML = Object.keys(state)[0];
        selectTag.appendChild(optionElement);
    }


    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag); // makes a list (set) of [key, value] pairs from formTag
        const json = JSON.stringify(Object.fromEntries(formData)); //Object.fromEntries() transforms a list of [key, value] pairs into object
        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
            console.log(newLocation);
        }
    });

})
