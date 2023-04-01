const BookingForm = ({ form, selectArtist, selectLocation, handleChange, handleSubmit, fetchedLocations }) => {
  
  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" onChange={handleChange} />
      <br />
      <label>Email:</label>
      <input type="text" name="email" onChange={handleChange} />

      <label htmlFor="location">Choose a location:</label>

      <select name="location" onChange={handleChange}>
  <option value="">--Please choose location</option>
  {fetchedLocations &&
    fetchedLocations.map((location, index) => {
      return (
        <option key={index} value={location._id}>
          {location.name}
        </option>
      );
    })}
</select>


      {selectLocation && (
        <select name="artist" onChange={handleChange}>
          <option value="">--Please select makeup artist</option>
          {selectArtist.map((artist, index) => (
            <option key={index} value={artist.name}>
              {" "}
              {artist.name}
            </option>
          ))}
        </select>
      )}

    </form>
  );
};

export default BookingForm;
