import React, { useState } from "react";
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
  // console.log(curDeptDate, setDeptDate)

  let almostFix = curDeptDate.split("-").join(",");
  // console.log(almostFix)

  let date = format(new Date(almostFix), "M/d/yyyy");
  // setDeptDate(dateFix)
  // console.log(dateFix);

  const isItSameDate =  date === defaultFix;

  const handleChange = (e) => {
    e.preventDefault();
    setDeptDate(e.target.value)
    axios.get(`http://localhost:8081/shiptimes`,{
      params: {date:date}
    })
    .then((results) => {
    
      console.log(results)
      
    })

    
    
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
              onChange={handleChange}
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
              <select disabled={isItSameDate} name="from" id="from" className="outline-none p-2 w-full">
                <option value="">Please Select</option>
                <option value="">Locations Americas A</option>
                <option value="">Locations Americas B</option>
                <option value="">Locations Europe A</option>
                <option value="">Locations Europe B</option>
              </select>
            </div>
          </div>

          {/* Arrival Date  */}
          <div className="py-1.5 px-2.5 flex-1 border-r-2">
            <strong>
              <p>Arrival Date</p>
            </strong>
            <input
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
              <select name="from" id="from" className="outline-none p-2 w-full">
                <option value="">Please Select</option>
                <option value="">Locations Americas A</option>
                <option value="">Locations Americas B</option>
                <option value="">Locations Europe A</option>
                <option value="">Locations Europe B</option>
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
