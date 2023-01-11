function createCard(name, location, description, pictureUrl, starts, ends) {
  return `
    <div class="card mb-3 shadow">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer">
        ${new Date(starts).toLocaleDateString()} -
        ${new Date(ends).toLocaleDateString()}
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Figure out what to do when the response is bad
    } else {
      const data = await response.json();

      let index = 0;
      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const location = details.conference.location.name;
          const starts = details.conference.starts;
          const ends = details.conference.ends;
          const html = createCard(title, location, description, pictureUrl, starts, ends);
          const column = document.querySelector(`#col-${index % 3}`);
          column.innerHTML += html;
          index += 1;
        }
      }

    }
  } catch (e) {
    console.error(e);
    // Figure out what to do if an error is raised
  }

});
