import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Image from "../assets/google-maps.png";

const Makeform = () => {
  const [data, setdata] = useState("");
  const [name, setname] = useState("");
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Log user whenever it changes
    if (user) {
      console.log(user);
    }
  }, [user]);
  const handle = (e) => {
    e.preventDefault();
    if (!name) return;
    const newuser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        // console.log(response.data);
        const add = response.data;

        setuser(add);

        setname("");
      } catch (error) {
        setuser(null);

        setdata("Wrong country entered");
        console.error("Failed to make request:", error.message);
      } finally {
        setLoading(false);
      }
    };
    newuser();
  };
  return (
    <div className="main">
      <h1>Know your country</h1>
      <form onSubmit={handle}>
        <label htmlFor="name">Name the Country</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <button
          type="submit"
          className="btn
      "
        >
          Submit
        </button>
      </form>
      <div className="da">
        {loading ? (
          <h2>Loading...</h2>
        ) : user ? (
          <div className="data">
            <div>
              <h4>Name: {user[0].name["common"]}</h4>
              <h4>Capital: {user[0].capital}</h4>
              <h4>Continent: {user[0].continents}</h4>
              <h4>Population: {user[0].population}</h4>
              <h4>Region:{user[0].region}</h4>
              <h4>
                {/* Neighbours <br />
                {user[0]?.borders?.length > 0 ? (
                  user[0].borders.map((n) => {
                    return <span key={n}>{n} </span>;
                  })
                ) : (
                  <span>No neighbour</span>
                )} */}
                Latitude:-{user[0].latlng[0]}
              </h4>
              <h4>Longitude:-{user[0].latlng[1]}</h4>

              <a target="_blank" href={user[0].maps["googleMaps"]}>
                <img className="maps" src={Image} alt="Google Maps Image" />
              </a>
            </div>
            <div className="ii">
              <br />
              <div className="images">
                <img className="flag" src={user[0].flags["png"]} alt="" />
                <p className="para">Flag</p>
              </div>
              <div className="images">
                {!(user[0].coatOfArms.length > 0) && (
                  <>
                    <img
                      className="arms"
                      src={user[0].coatOfArms["png"]}
                      alt="No coat of arms"
                    />
                    <p className="para">Coat of Arms</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="wrong">{data}</div>
        )}
      </div>
    </div>
  );
};

export default Makeform;
