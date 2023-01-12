window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async event => {
      event.preventDefault();

      const fetchOptions = {
        method: 'post',
        body: new FormData(form),
        credentials: 'include',
      };
      const url = 'http://localhost:8000/login/';
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error(response);
      }
    });

    // const logInButton = document.getElementById('logout-link');
    // logInButton.addEventListener('click', async () => {
    //   const fetchOptions = {
    //     method: 'post',
    //   };
    //   const url = 'https://localhost:8000/api/token/refresh/logout/'
    //   const response = await fetch(url, fetchOptions);
    //   console.log(response);
    // })

  });
