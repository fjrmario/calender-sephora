import React, { useState, useEffect } from "react";
import "../App.css";
import { time } from "../../../../time";

const now = new Date();
const currentTime = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function timeToMins(time) {
  // console.log(`time: ${time}`);
  const [hours, minutes] = time.split(":");
  // console.log(`Received time: ${time}`);
  // console.log(`Parsed hours: ${hours}, Parsed minutes: ${minutes}`);
  const calculateInMins = parseInt(hours) * 60 + parseInt(minutes);
  return calculateInMins;
}

const checkTimeSlot = (startTime) => {
  const startTimeInMins = timeToMins(startTime);
  const currTimeInMins = timeToMins(currentTime);

  return currTimeInMins > startTimeInMins;
};

function Times({ date, selectArtist, customerInfo }) {
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);
  const [apptTiming, setApptTiming] = useState([]);

  // const makeAppt = (preAppointments) => {
  //   return [...apptTiming, preAppointments];
  // };

  const makeAppt = async (apptTiming) => {
    try {
      const response = await fetch(`/api/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apptTiming),
      });
      if (!response.ok) {
        throw new Error("Error creating appointments");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };
  console.log("selectArtist:", JSON.stringify(selectArtist, null, 2));

  const displayInfo = async (e) => {
    setInfo(true);
    setEvent(e.target.innerText);
    setDateChanged(false);

    const newAppointment = await makeAppt({
      date: date.toLocaleDateString("en-UK"),
      timeslot: e.target.innerText,
      makeupArtist: {
        id: selectArtist._id, 
        
      },
      location: {
        id: selectArtist.location.id,
      },
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
      },
    });

    setApptTiming((apptTiming) => [
      ...apptTiming, { newAppointment }])
  };

    const todayDate = new Date();
    const futureDate = date > todayDate;

    useEffect(() => {
      setDateChanged(true);
      setInfo(false);
    }, [date]);

    const isTimeSlotWithinWorkingHours = (startTime, endTime, selectArtist) => {
      const artist = selectArtist?.workingHours;
      console.log(`artist: ${JSON.stringify(artist)}`);
      // console.log("selectArtist in Times:", JSON.stringify(selectArtist));

      const workingHourStartInMins = timeToMins(
        selectArtist.workingHours.startTime
      );
      const workingHourEndInMins = timeToMins(
        selectArtist.workingHours.endTime
      );
      const timeSlotStartInMins = timeToMins(startTime);
      const timeSlotEndInMins = timeToMins(endTime);

      // console.log(`workingHourStartInMins: ${workingHourStartInMins}`);
      // console.log(`workingHourEndInMins: ${workingHourEndInMins}`);
      // console.log(`timeSlotStartInMins: ${timeSlotStartInMins}`);
      // console.log(`timeSlotEndInMins: ${timeSlotEndInMins}`);

      return (
        timeSlotStartInMins >= workingHourStartInMins &&
        timeSlotEndInMins <= workingHourEndInMins
      );
    };

    const isTimeSlotWithinBreakTime = (startTime, endTime, selectArtist) => {
      const artist = selectArtist?.breakTime;
      // console.log(`artist: ${artist}`);
      const breakStartTimeInMins = timeToMins(selectArtist.breakTime.startTime);
      const breakEndTimeInMins = timeToMins(selectArtist.breakTime.endTime);
      const breakTimeSlotStartTimeInMins = timeToMins(startTime);
      const breakTimeSlotEndTimeInMins = timeToMins(endTime);

      // console.log(`breakStartTimeInMins: ${breakStartTimeInMins}`);
      // console.log(`breakEndTimeInMins: ${breakEndTimeInMins}`);
      // console.log(`breakTimeSlotStartTimeInMins: ${breakTimeSlotStartTimeInMins}`);
      // console.log(`breakTimeSlotEndTimeInMins: ${breakTimeSlotEndTimeInMins}`);

      return (
        breakStartTimeInMins >= breakTimeSlotStartTimeInMins &&
        breakEndTimeInMins <= breakTimeSlotEndTimeInMins
      );
    };

    const timeSlotDisabled = (startTime, futureDate, endTime, selectArtist) => {
      const isPastTimeSlot = checkTimeSlot(startTime) && !futureDate;
      const isMakeUpArtistWithinWorkingHours = isTimeSlotWithinWorkingHours(
        startTime,
        endTime,
        selectArtist
      );
      const isMakeUpArtistWithinBreakHours = isTimeSlotWithinBreakTime(
        startTime,
        endTime,
        selectArtist
      );
      return (
        isPastTimeSlot ||
        !isMakeUpArtistWithinWorkingHours ||
        isMakeUpArtistWithinBreakHours
      );
    };

    const disabledTimeslotForBooking = (findDate, findTimeSlot) => {
      console.log(`apptTiming: ${JSON.stringify(apptTiming)}`);
      // console.log(`findDate: ${findDate}`);
      // console.log(`findTimeSlot: ${findTimeSlot}`);
      const checkBooking = apptTiming.find(
        (appt) => appt.date === findDate && appt.timeSlot === findTimeSlot
      ); //find for appt made for the same date and that time slot
      console.log(`checkBooking: ${JSON.stringify(checkBooking)}`);
      return checkBooking;
    };

    return (
      <div className="times">
        {time.map((times, index) => {
          const startTime = times.split(" - ")[0];
          const endTime = times.split(" - ")[1];
          //console.log(startTime)
          // const disabledTime = checkTimeSlot(startTime) && !futureDate || disabledTimeslotForBooking(date.toLocaleDateString("en-UK"), times);
          const disabledTime =
            timeSlotDisabled(startTime, futureDate, endTime, selectArtist) ||
            disabledTimeslotForBooking(date.toLocaleDateString("en-UK"), times);
          return (
            <div key={index}>
              <button onClick={(e) => displayInfo(e)} disabled={disabledTime}>
                {times}
              </button>
            </div>
          );
        })}
        <div>
          {!dateChanged && info
            ? `Makeup session booked on ${date.toLocaleDateString(
                "en-UK"
              )} for timeslot ${event}.`
            : null}
        </div>
      </div>
    );
  }


export default Times;