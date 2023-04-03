const DeleteAppointment = ({ id, delAppt }) => {
    const handleDelete = async () => {
      const response = await fetch(`/api/booking/${id}`, {
        method: "DELETE",
        header: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
      delAppt(id);
    };
  
    return <button onClick={handleDelete}>X</button>
  };
  
  export default DeleteAppointment;