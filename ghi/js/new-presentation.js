window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    const data = await response.json();
    const selectTag = document.getElementById("conference");
    for (let conference of data.conferences) {
        const optionElement = document.createElement("option");
        optionElement.value = conference.href;
        optionElement.innerHTML = conference.name;
        selectTag.appendChild(optionElement);
    }

    selectTag.addEventListener('change', (event) => {
        const result = event.target.value;
        const formTag = document.getElementById('create-presentation-form');
        formTag.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            const presentationUrl  = 'http://localhost:8000'+result+'presentations/';
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(presentationUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
            }
        });

    });
})
