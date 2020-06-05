import React, { Component } from "react";
import './Zip.css';

import axios from "axios";
class Zipsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: [],
      zipValue: "",
    };
    this.handleZipSearch = this.handleZipSearch.bind(this);
  }
  handleZipSearch(e) {
    this.setState({ zipValue: e.target.value });  
    const url = "http://ctp-zip-api.herokuapp.com/zip/" +  e.target.value;
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        this.setState({ zipCode: data });
      })
      .catch((err) =>{ console.log(err)
        this.setState({zipCode:[]})
    });
  }
  render() {
    let display;
    if (this.state.zipCode.length === 0) {
      display = <div>Not Found</div>;
    } else {
      display = this.state.zipCode.map((data, i) => (
        <div class="zipdetail" key={i}>
          {data.LocationText}
          <ul>
            <li>State: {data.State}</li>
            <li>
              Location: ({data.Lat}, {data.Long})
            </li>
            <li>Population (estimated):{data.EstimatedPopulation}</li>
            <li>Total Wages:{data.TotalWages}</li>
          </ul>
        </div>
      ));
    }
    return (
   <>
        <h1>Zip Code Search</h1>
        <div class = "search">
          <label htmlFor="zipCode">Enter a zip code: </label>
          
          <input
            type="text"
            pattern="[0-9]*"
            maxlength="5"
            name="zip"
            placeholder={this.state.zipValue}
            onChange={this.handleZipSearch}>
            </input>
          <br />
          <br />
        <div class="zipdata">{display}</div>
        </div>
   </>
    ); 
  }
}
export default Zipsearch;