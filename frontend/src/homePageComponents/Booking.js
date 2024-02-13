import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { format } from "date-fns";
import axios from "axios";

const Booking = () => {
  const handleBook = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  let defaultDate = new Date().toISOString().split("T")[0];
  // console.log(defaultDate)
  let defaultFix = defaultDate.split("-").join(",");
      defaultFix = format(new Date(defaultFix), "M/d/yyyy");
  // console.log(defaultFix);

  const [curDeptDate, setDeptDate] = useState(defaultDate);
  const [curArriveDate,setArriveDate] = useState(defaultDate)  // console.log(curDeptDate, setDeptDate)

  const [americasA,setAmericasA] = useState("");
  const [americasB,setAmericasB] = useState("");
  const [europeA,setEuropeA] = useState("");
  const [europeB,setEuropeB] = useState("");

  const [curAmericasA,setArriveAmericasA] = useState("");
  const [curAmericasB,setArriveAmericasB] = useState("");
  const [curEuropeA,setArriveEuropeA] = useState("");
  const [curEuropeB,setArriveEuropeB] = useState("");

  const [curSelection, setSelection] = useState();
  console.log(curSelection)

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
      
        setArriveAmericasA(results.data[0]["Location Americas A"])
        setArriveAmericasB(results.data[0]["Location Americas B"])
        setArriveEuropeA(results.data[0]["Location Europe A"])
        setArriveEuropeB(results.data[0]["Location Europe B"])

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
              <p>Destination From</p>
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
                <option value="Location Americas A">{curAmericasA}</option>
                <option value="Location Americas B">{curAmericasB}</option>
                <option value="Location Europe A">{curEuropeA}</option>
                <option value="Location Europe B">{curEuropeB}</option>
              </select>
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
