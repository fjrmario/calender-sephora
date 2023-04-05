const DeleteAppointment = ({ id, delAppt }) => {
  const token = localStorage.getItem("token");
      const handleDelete = async () => {
        const response = await fetch(`/api/booking/${id}`, {
          method: "DELETE",
          header: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        await response.json();
        delAppt(id);
      };
    
      return <button onClick={handleDelete}>X</button>
    };
    
    export default DeleteAppointment;