import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import moment from "moment"

export default function Edit() {
    const {id} = useParams()
    const [makeupArtists, setMakeupArtists]= useState()
    const [validationError, setValidationError] = useState(null);
    const [minDate, setMinDate] = useState('');
    const [locations, setLocations] = useState([])
    console.log(id)
    
    useEffect(() => {
        console.log(makeupArtists);
    }, [makeupArtists]);

    useEffect(()=>{
        async function fetchMakeupArtists(){
            try{
                const response = await fetch(`/api/makeupartist/edit/${id}`);
                if(!response.ok){
                    throw new Error("Failed to fetch appointments");
                }
                const data = await response.json();
                setMakeupArtists(data);
            } catch (error){
                console.error("Error fetching appointments:" , error)
        }}
        fetchMakeupArtists()
    },[id])

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
    }, [id])

    useEffect(() => {
        const today = moment().format('YYYY-MM-DD');
        setMinDate(today);
    }, []);

    const isDateValid = (date) => {
        const currentDate = new Date();
        const enteredDate = new Date(date);
        return enteredDate >= currentDate;
    };

    const handleInputChange = (event) => {
        if (event && event.target) {
            const { name, value } = event.target;
    
            if (name === "location") {
                setMakeupArtists(prevState => ({
                    ...prevState,
                    location: { id: value }
                }));
            } else {
                setMakeupArtists(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
    
            if (name === "workingSchedule.startDate" && !isDateValid(value)) {
                setValidationError("Please enter a valid future date.");
            } else {
                setValidationError(null);
            }
        }
    };

    const isBreakTimeValid = () => {
        if (!makeupArtists || !makeupArtists.breakTime) {
            return false;
        }
        const { workingHours, breakTime } = makeupArtists;
        const workingStartTime = new Date(`2000-01-01T${makeupArtists[0].workingHours.startTime}`);
        const workingEndTime = new Date(`2000-01-01T${makeupArtists[0].workingHours.endTime}`);
        const breakStartTime = new Date(`2000-01-01T${makeupArtists[0].breakTime.startTime}`);
        const breakEndTime = new Date(`2000-01-01T${makeupArtists[0].breakTime.endTime}`);
        
        console.log(workingStartTime)
        console.log(workingEndTime)
        console.log(breakStartTime)
        console.log(breakEndTime)

        return (
            breakStartTime >= workingStartTime &&
            breakStartTime < workingEndTime &&
            breakEndTime > workingStartTime &&
            breakEndTime <= workingEndTime &&
            breakStartTime < breakEndTime
          );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            
            // if (!isDateValid(makeupArtists.workingSchedule.startDate) || !isDateValid(makeupArtists.workingSchedule.endDate)) {
            //     throw new Error("Invalid date range");
            // }

          const response = await fetch(`/api/makeupartist/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(makeupArtists)
          });
          if (!response.ok) {
            throw new Error("Failed to update makeup artist");
          }
          console.log('Makeup artist updated successfully!');
        } catch (error) {
          console.error("Error updating makeup artist:", error)
        }
    };


   return (
    <>
    {makeupArtists &&
        <div>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" onChange={handleInputChange} defaultValue={makeupArtists[0].name}/>

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

                    <label htmlFor="location">Location Name:</label>
                    <select name="location" onChange={handleInputChange} defaultValue={makeupArtists[0].location._id}>
                    <option value="">--Select Location--</option>
                    {locations.map(location => (
                        <option key={location._id} value={location._id}>
                            {location.name}
                        </option>
                    ))}
                    </select>

                    <button type="submit" >Submit</button>
            </form>
        </div>
    }
    </>
    )
}