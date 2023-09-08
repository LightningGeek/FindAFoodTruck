import React, { Component } from 'react';
import { truck } from './data.js';
import './App.css';
let Bmap = window.BMapGL;
let pushCarts = truck.filter(truck =>
  truck.FacilityType === 'PushCart' && truck.Longitude !== '0' && truck.Latitude !== '0'
);

export default class App extends Component {
  size = 13;
  componentDidMount() {
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
