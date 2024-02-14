import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { format, differenceInDays } from "date-fns";
import axios from "axios";

const Booking = () => {
  const handleBook = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  // console.log(new Date().toISOString());

  let defaultDate = new Date().toISOString().split("T")[0];
  // console.log(defaultDate)
  let defaultFix = defaultDate.split("-").join(",");
      defaultFix = format(new Date(defaultFix), "M/d/yyyy");
  // console.log(defaultFix);

 
 
  /* These use states below are for setting the default date of departure and arrival
  it will be set for the current day that we are on */
  const [curDeptDate, setDeptDate] = useState(defaultDate);
  const [curArriveDate,setArriveDate] = useState(defaultDate)  
  
  // console.log(curDeptDate, setDeptDate)

  /* Need to format the dates of both departure and arrival to be accept in the 
     differenceInDays function */
  let deptDiffernce = curDeptDate.split("-").join(",");
  let arrivalDiffernce = curArriveDate.split("-").join(",")

  /* Calculates the differnce in the departure date and the arrival date*/
  let days = differenceInDays(
    new Date(arrivalDiffernce),
    new Date(deptDiffernce)
  )
  // console.log(days)
  
  /* Calculates the price of the cruise */
  let money = (249.99 * days).toFixed(2)

  console.log(money)
  
  /* These use states are used for getting the cruise option on the day we will select*/
  const [americasA,setAmericasA] = useState("");
  const [americasB,setAmericasB] = useState("");
  const [europeA,setEuropeA] = useState("");
  const [europeB,setEuropeB] = useState("");

  /* After the choice of cruise itinerary we will now only choose from that 
     itinerary */
  const [curEndTrip,setEndTrip] = useState("");

  console.log(curEndTrip.length)

  /* This use state will be to save the current selected itinerary 
     and go back and find the data in it.*/
  const [curSelection, setSelection] = useState();

  // console.log(curSelection)
  
  /* The date format needs to be fixed to be properly read in mysql workbench */
  let almostFixDept = curDeptDate.split("-").join(",");
  let almostFixArrive = curArriveDate.split("-").join(",");


  // console.log(almostFixDept)

  let date = format(new Date(almostFixDept), "M/d/yyyy");
  let arriveDate = format(new Date(almostFixArrive), "M/d/yyyy");

  
  // setDeptDate(dateFix)
  // console.log(dateFix);

  const isItSameDate =  date === defaultFix;
  const isItSameDateArrive =  arriveDate === defaultFix;

  useEffect(() => {

    if(curDeptDate.length > 0) {
      axios.get(`http://localhost:8081/shiptimes`,{
        params: {date:date}
      })
      .then((results) => {
        
        /* set all the data from database */
        setAmericasA(results.data[0]["Location Americas A"])
        setAmericasB(results.data[0]["Location Americas B"])
        setEuropeA(results.data[0]["Location Europe A"])
        setEuropeB(results.data[0]["Location Europe B"])

        // setDeptDate("")

        console.log(results.data[0])
        // console.log(americasA,americasB,europeA,europeB)    
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }); 
    }
  },[curDeptDate])

  //This use effect is for arrival date
  useEffect(() => {

    if(curArriveDate.length > 0) {
      axios.get(`http://localhost:8081/shiptimes`,{
        params: {date:arriveDate}
      })
      .then((results) => {
        
        /* this is for the location of the last day on your cruise */
        setEndTrip(results.data[0][`${curSelection}`])

        console.log(results.data[0])
        // console.log(americasA,americasB,europeA,europeB)    
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }); 
    }
  },[curArriveDate])


  
  const handleChangeDept = (e) => {
    e.preventDefault();
    setDeptDate(e.target.value)
  
  }

  const handleChangeArrive = (e) => {
    e.preventDefault();
    setArriveDate(e.target.value)
  
  }


  return (
    <div className="md:mt-[160px] mt-[50px] mx-4 relative">
      <div className="bg-white rounded-md max-w-6xl w-full mx-auto">
        <form className="flex flex-col md:flex-row">
          {/* Name */}
          <div className="py-1.5 px-2.5 flex-1 border-r-2">
            <p>
              <strong>Enter Name</strong>
            </p>
            <div >
              <label htmlFor="name"></label>
              <input type="text" id="name" required />
            </div>
          </div>

          {/* Departure date */}
          <div className="py-1.5 px-2.5 flex-1 border-r-2">
            <p>
              <strong>Departure Date</strong>
            </p>
            <input
              // value={curDeptDate}
              onChange={handleChangeDept}
              type="date"
              name="date"
              required
              className="outline-none p-2 w-full"
            />
          </div>

          {/* Destination from  */}
          <div className="py-1.5 px-2.5 flex-1 border-r-2">
            <strong>
              <p>Departing From</p>
            </strong>
            <div>
              <select onChange={(e) => setSelection(e.target.value)} disabled={isItSameDate} name="from" id="from" className="outline-none p-2 w-full">
                <option value="">Please Select</option>
                <option value="Location Americas A"> {americasA}  </option>
                <option value="Location Americas B">{americasB}</option>
                <option value="Location Europe A">{europeA}</option>
                <option value="Location Europe B">{europeB}</option>
              </select>
            </div>
          </div>

          {/* Arrival Date  */}
          <div className="py-1.5 px-2.5 flex-1 border-r-2">
            <strong>
              <p>Arrival Date</p>
            </strong>
            <input
              onChange={handleChangeArrive}
              type="date"
              name="date"
              required
              className="outline-none p-2 w-full"
            />
          </div>

          {/* destination to */}
          <div className="py-1.5 px-2.5 flex-1 border-r-2">
            <strong>
              <p>Destination To</p>
            </strong>
            <div>
              <select disabled={isItSameDateArrive} name="from" id="from" className="outline-none p-2 w-full">
                <option value="">Please Select</option>
                <option value="Location Americas A">{curEndTrip}</option>
              </select>
            </div>
          </div>

          {/* Total Amount */}
          <div className="py-1.5 px-2.5 flex-1 border-r-2">
            <p>
              <strong>Total Price</strong>
            </p>
            <div>
              <div><strong>{days > 0 ? `$${money}` : "$0"}</strong></div>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={(e) => handleBook(e)}
            type="submit"
            className="bg-indigo-500 text-white px-8 py-1 space-x-2 text-c flex items-center justify-center"
          >
            <FaPlus className="mr=1" />
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
