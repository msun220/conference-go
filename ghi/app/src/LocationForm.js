import React, { useState } from 'react';
import { useEffect } from 'react';


function LocationForm () {
    const [states, setStates] = useState([]); //states is var (starts as [] when loaded), setstates is func
    const [name, setName] = useState("");
    const [roomCount, setRoomCount] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/states/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setStates(data.states) //put data.states into states > whenever state changes, the whole function reloads
        }}


    useEffect(() => {
    fetchData();
    }, []);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleRoomCountChange = (event) => {
        const value = event.target.value;
        setRoomCount(value);
    }
    const handleCityChange = (event) => {
        const value = event.target.value;
        setCity(value);
    }
    const handleStateChange = (event) => {
        const value = event.target.value;
        setState(value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.room_count = roomCount;
        data.name = name;
        data.city = city;
        data.state = state;

        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newLocation = await response.json();
            setName('');
            setRoomCount('');
            setCity('');
            setState('');
        }
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new location</h1>
            <form onSubmit={handleSubmit} id="create-location-form">
              <div className="form-floating mb-3">
                <input value={name} onChange={handleNameChange} placeholder="Name" required
                        type="text" name="name" id="name"
                        className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={roomCount} onChange={handleRoomCountChange} placeholder="Room count" required
                        type="number" name="room_count" id="room_count"
                        className="form-control" />
                <label htmlFor="room_count">Room count</label>
              </div>
              <div className="form-floating mb-3">
                <input value={city} onChange={handleCityChange} placeholder="City" required
                        type="text" name="city" id="city"
                        className="form-control" />
                <label htmlFor="city">City</label>
              </div>
              <div className="mb-3">
              <select value={state} onChange={handleStateChange} required name="state" id="state" className="form-select">
                <option value="">Choose a state</option>
                {states.map(state => {
                    return (
                    <option key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
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
    );
}

export default LocationForm;
