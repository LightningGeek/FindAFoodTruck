import React, { Component } from 'react';
import './App.css';
import { getFoodTruckList } from './service/api.js';
let Bmap = window.BMapGL;
let pushCarts = [];

export default class App extends Component {
  size = 13;

  componentDidMount() {
    this.getFoodTrucks();
    //initialize Baidu Map
    this.map = new Bmap.Map("bmap");
    let point = {
      Longitude: 121.451754,
      Latitude: 31.22985,
      Applicant: '静安寺',
      FacilityType: 'circle',
    };
    this.drawMap(point);
  }

  async getFoodTrucks(){
    const {data, status} = await getFoodTruckList('foodtrucks/', 'get');
    switch (status) {
      case 200:
        pushCarts = data;
        break;
      case 404:
        alert('Page not found!');
        break;
      default:
        alert("Server is down!")
        break;
    }
  }

  /**
   * draw round markers based on lnt and lat
   * @param {v} v an object that includes useful properties such as lnt, lat and Applicant so on.
   */
  drawMap = (v) => {
    let point = new Bmap.Point(v.Longitude, v.Latitude);
    let label = new Bmap.Label(`<div class=${v.FacilityType}>${v.Applicant}</div>`, {
      offset: new Bmap.Size(0, 0),
      position: point,
    });
    label.setStyle({
      backgroundColor: "transparent",
      border: "none",
    });
    if (v.Applicant === '静安寺') {
      label.addEventListener("click", () => {
        this.map.clearOverlays();
        this.size += 6;
        pushCarts.map((truck, index) => {
          if (index <= 9) {
            this.drawMap(truck);
          }
        });
      });
    } else {
      label.addEventListener("click", () => {
        alert(`This food truck sells: ${v.FoodItems === '' ? 'nothing' : v.FoodItems}:)`);
      });
    }
    this.map.addOverlay(label);
    this.map.centerAndZoom(point, this.size);
  }

  render() {
    return (
      <div id="bmap" style={{ height: '100vh' }}>App</div>
    )
  }
}
