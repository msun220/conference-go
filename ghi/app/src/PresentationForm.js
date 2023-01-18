import React, { useState, useEffect } from 'react';

function PresentationForm () {

    const [conferences, setConferences] = useState([])
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences)
        }
    }


    useEffect(() => {
        fetchData();
    }, []);


    const [presenterName, setPresenterName] = useState("")
    const handlePresenterNameChange = (event) => {
        setPresenterName(event.target.value)
    }
    const [presenterEmail, setPresenterEmail] = useState("")
    const handlePresenterEmailChange = (event) => {
        setPresenterEmail(event.target.value)
    }
    const [companyName, setCompanyName] = useState("")
    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value)
    }
    const [title, setTitle] = useState("")
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const [synopsis, setSynopsis] = useState("")
    const handleSynopsisChange = (event) => {
        setSynopsis(event.target.value)
    }
    const [conference, setConference] = useState("")
    const handleConferenceChange = (event) => {
        setConference(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.presenter_name = presenterName;
        data.company_name = companyName;
        data.presenter_email = presenterEmail;
        data.title = title;
        data.synopsis = synopsis;
        data.conference = conference;

        const presentationUrl  = 'http://localhost:8000'+conference+'presentations/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            setPresenterName("");
            setPresenterEmail("");
            setCompanyName("");
            setTitle("");
            setSynopsis("");
            setConference("");
    }}


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input value={presenterName} onChange={handlePresenterNameChange}
                        placeholder="Presenter name" required type="text" name="presenter_name"
                        id="presenter_name" className="form-control"/>
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={presenterEmail} onChange={handlePresenterEmailChange}
                        placeholder="Presenter email" required type="email" name="presenter_email"
                        id="presenter_email" className="form-control"/>
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input value={companyName} onChange={handleCompanyNameChange} placeholder="Company name" type="text"
                        name="company_name" id="company_name" className="form-control"/>
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={title} onChange={handleTitleChange} placeholder="Title" required type="text"
                        name="title" id="title" className="form-control"/>
                <label htmlFor="title">Title</label>
              </div>
              <div className="form mb-3">
                <label htmlFor="synopsis" className="form-label">Synopsis</label>
                <textarea value={synopsis} onChange={handleSynopsisChange} className="form-control"
                        required name="synopsis" id="synopsis" rows="3"></textarea>
              </div>
              <div className="mb-3">
                <select value={conference} onChange={handleConferenceChange} required name="conference"
                        id="conference" className="form-select">
                  <option value="">Choose a conference</option>
                    {conferences.map(conference => {
                        return(
                        <option key={conference.href} value={conference.href}>{conference.name}</option>
                        )
                    })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
            <div className="result"></div>
          </div>
        </div>
      </div>
    )



}

export default PresentationForm
