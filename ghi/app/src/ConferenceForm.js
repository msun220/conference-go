import React, { useState } from 'react';
import { useEffect } from 'react';


function ConferenceForm() {

    const [locations, setLocations] = useState([]);
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [description, setDescription] = useState("");
    const [maxPresentations, setMaxPresentations] = useState("");
    const [maxAttendees, setMaxAttendees] = useState("");
    const [location, setLocation] = useState("");
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations)
        }}


    useEffect(() => {
        fetchData();
        }, []);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleStartChange = (event) => {
        const value = event.target.value;
        setStart(value);
    }
    const handleEndChange = (event) => {
        const value = event.target.value;
        setEnd(value);
    }
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }
    const handleMaxPresentationsChange = (event) => {
        const value = event.target.value;
        setMaxPresentations(value);
    }
    const handleMaxAttendeesChange = (event) => {
        const value = event.target.value;
        setMaxAttendees(value);
    }
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.starts = start;
        data.ends = end;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = location;

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            setName('');
            setStart('');
            setEnd('');
            setDescription('');
            setMaxPresentations('');
            setMaxAttendees('');
            setLocation('');
        }
    }


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={start} onChange={handleStartChange} placeholder="mm/dd/yyyy" required type="date" name="starts" id="starts" className="form-control"/>
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input value={end} onChange={handleEndChange} placeholder="mm/dd/yyyy" required type="date" name="ends" id="ends" className="form-control"/>
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="form mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea value={description} onChange={handleDescriptionChange} className="form-control" required name="description" id="description" rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input value={maxPresentations} onChange={handleMaxPresentationsChange} placeholder="Maximum presentations" required type="number" name="max_presentations" id="maximum_presentations" className="form-control"/>
                <label htmlFor="maximum_presentations">Maximum Presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input value={maxAttendees} onChange={handleMaxAttendeesChange} placeholder="Maximum attendees" required type="number" name="max_attendees" id="maximum_attendees" className="form-control"/>
                <label htmlFor="maximum_attendees">Maximum Attendees</label>
              </div>
              <div className="mb-3">
                <select value={location} onChange={handleLocationChange} required name="location" id="location" className="form-select">
                  <option value="">Choose a location</option>
                  {locations.map(location => {
                    return (
                    <option key={location.id} value={location.id}>
                        {location.name}
                    </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default ConferenceForm
