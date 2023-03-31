import Calendar from "react-calendar";

const Cal = ({ date, setDate, selectArtist, setShowTime }) => {

    const todayDate = () => {
        let today = new Date();
        return today;
      };

    const getMinDate = (artist) => {
        const startDate = artist.workingSchedule[0].startDate;
        // console.log(`minDate: ${startDate}`)
        return startDate;
      };
    
      const getMaxDate = (artist) => {
        const endDate = artist.workingSchedule[0].endDate;
        // console.log(`maxDate: ${endDate}`)
        return endDate;
      };

    return(
        <div>
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={() => {
            setShowTime(true);
          }}
          minDate={
            selectArtist && selectArtist.workingSchedule
              ? new Date(getMinDate(selectArtist)) && todayDate()
              : todayDate()
          }
          maxDate={
            selectArtist && selectArtist.workingSchedule
              ? new Date(getMaxDate(selectArtist))
              : todayDate()
          }
        />
      </div>
    )
}

export default Cal;