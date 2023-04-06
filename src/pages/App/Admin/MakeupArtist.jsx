import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MakeupArtist() {
    const [ appointments, setAppointments] = useState([])
    const {id} = useParams();


  return (
    <div>
        {id}
    </div>
  )
}
