import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Edit() {
    const [makeupArtist, setMakeupArtist] = useState([])
    const [formValues, setFormValues] = useState({})
    const {id}= useParams(0)

    useEffect(()=>{
        async function fetchMakeupArtists(){
        try{
            const response = await fetch(`/api/makeupartist/admin/${id}`);
            if(!response.ok){
                throw new Error("Failed to fetch appointments");
            }
            const data = await response.json();
            setMakeupArtist(data[0].makeupArtist);
            setFormValues(data[0].makeupArtist)
        } catch (error){
            console.error("Error fetching appointments:" , error)
        }}
        console.log(makeupArtist[0].makeupArtist.id)
        fetchMakeupArtists()
    },[id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // submit form data to API endpoint for updating the makeup artist
    };

    return (
        <div>
          <h1>Edit Makeup Artist</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name || ""}
              onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email || ""}
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formValues.phone || ""}
              onChange={handleChange}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formValues.description || ""}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )
    }
