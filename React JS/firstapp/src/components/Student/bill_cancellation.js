import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const AddBillCancellation = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    student_id: sessionStorage.getItem("user_id"),
    from_date: null,
    to_date: null,
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const notify = (e) => toast(e);

  const submitHandler = (e) => {
    e.preventDefault();

    var request_date = new Date(Date.now()).getFullYear() + "-" + (new Date(Date.now()).getMonth() + 1) + "-" + new Date(Date.now()).getDate();

    if(new Date(data.from_date)>new Date(data.to_date))
    {
        notify("START DATE IS GREATER THAN END DATE");
    }
    else if(new Date(request_date)>new Date(data.from_date))
    {
      notify("CURRENT DATE IS GREATER THAN START DATE");
    }
    else if(new Date(data.to_date)-new Date(data.from_date)<2)
    {
      notify("MINIMUM TWO DAYS");
    }
    else
    {

      axios.post("http://localhost:8080/student//bill_cancellation", { headers: {'Content-Type': 'application/json','x-auth-header': sessionStorage.getItem("token")},data})
        .then((res) => {
          if(res.data === 'INVALID TOKEN' || res.data === 'NO TOKEN')
          {
            navigate("/");
            sessionStorage.clear();
          }
          else if(res.data === 'ACCESS DENIED')
          {
            navigate("/");
            sessionStorage.clear();
          }
          
          document.getElementById("bill_cancellation").reset();
          notify("REQUEST SENT SUCCESSFULLY");
        });
    }
  };

  return (
    <>
      <div className="main_content">
        <div className="header">Mess Bill Cancellation</div>
        <div className="info">
          <div className="container">
            <form id="bill_cancellation" onSubmit={submitHandler}>
              <label>From Date</label>
              <input
                type="date"
                id="from_date"
                name="from_date"
                onChange={changeHandler}
                required
              />
              <br />
              <br />

              <label>To Date</label>
              <input
                type="date"
                id="to_date"
                name="to_date"
                onChange={changeHandler}
                required
              />
              <br />
              <br />
              <br />
              <br />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export { AddBillCancellation };
