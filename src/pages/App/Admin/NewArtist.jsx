import { useEffect, useState } from "react";

export default function NewArtist() {
    const [name, setName] = useState('');
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('');

    useEffect(()=>{
        async function fetchLocations(){
            try{
                const response = await fetch(`/api/maps`);
                if(!response.ok){
                    throw new Error("Failed to fetch locations");
                }
                const data = await response.json();
                setLocations(data)
            } catch(error){
                console.error("Error fetching location:" , error)
            }}
            fetchLocations()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
          name,
          location: { id: selectedLocation },
        };
        try {
            const response = await fetch('/api/makeupartist', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
              throw new Error('Failed to create makeup artist');
            }
            const newMakeupArtist = await response.json();
            console.log('New makeup artist created:', newMakeupArtist);
        } catch (error) {
            console.error('Error creating makeup artist:', error);
        }
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
        console.log(event.target.value)
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />

                <label htmlFor="workingSchedule.startDate">Start Date: </label>
                <input type="date" name="workingSchedule.startDate" onChange={handleInputChange} placeholder="YYYY-MM-DD" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" min={minDate} defaultValue={moment(makeupArtists[0].workingSchedule.startDate).format('YYYY-MM-DD')} />

                <label htmlFor="workingSchedule.endDate">End Date:</label>
                <input type="date" name="workingSchedule.endDate" placeholder="YYYY-MM-DD" onChange={handleInputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" min={minDate} defaultValue={moment(makeupArtists[0].workingSchedule.startDate).format('YYYY-MM-DD')}/>

                <label htmlFor="workingHours.startTime">Start Time:</label>
                <input type="time" name="workingHours.startTime" onChange={handleInputChange} placeholder="HH:MM" pattern="^([01]\d|2[0-3]):([0-5]\d)$" defaultValue={makeupArtists[0].workingHours.startTime}/>

                <label htmlFor="workingHours.endTime">End Time:</label>
                <input type="time" name="workingHours.endTime" placeholder="HH:MM" onChange={handleInputChange}  pattern="^([01]\d|2[0-3]):([0-5]\d)$" defaultValue={makeupArtists[0].workingHours.endTime} />

                <label htmlFor="breakTime.startTime">Break Start Time:</label>
                <input type="time" name="breakTime.startTime" placeholder="HH:MM" onChange={handleInputChange}   pattern="^([01]\d|2[0-3]):([0-5]\d)$" defaultValue={makeupArtists[0].breakTime.startTime}/>

                <label htmlFor="breakTime.endTime">Break End Time:</label>
                <input type="time" name="breakTime.endTime" placeholder="HH:MM" onChange={handleInputChange}  pattern="^([01]\d|2[0-3]):([0-5]\d)$" defaultValue={makeupArtists[0].breakTime.endTime}/> 

                <label htmlFor="location">Location:</label>
                <select name="location" value={selectedLocation} onChange={handleLocationChange}>
                {locations.map((location) => (
                    <option key={location.id} value={location._id}>
                    {location.name}
                    </option>
                ))}
                </select>
                <button type="submit">Create</button>
        </form>
    </div>
  )
}
