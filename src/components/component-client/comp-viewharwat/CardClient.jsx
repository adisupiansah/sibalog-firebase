"use client";
import React, { useState, useEffect } from "react";
import ChartBar from "./ChartBar";


const CardClient = () => {

  const [hitungHarwat, setHitungHarwat] = useState(0);
  const [hitungBMP, setHitungBMP] = useState(0);

  const hitungSeluruhData = async () => {
    try {
      const response = await fetch("/api/v1/disposisi/getdisposisi");
      const data = await response.json();

      //menghitung jumlah data berdasarkan berdasarkan type_disposisi
      const HarwatCount = data.filter(
        (item) => item.type_disposisi === "disposisi Harwat"
      ).length;
      const BMPCount = data.filter(
        (item) => item.type_disposisi === "disposisi BMP"
      ).length;
      setHitungHarwat(HarwatCount);
      setHitungBMP(BMPCount);
    } catch (error) {
      console.error("Terdapat Error saat menghitung seluruh data:", error);
    }
  };

  useEffect(() => {
    hitungSeluruhData();
  }, []);

  return (
    <div className="card-disposisi mb-4">
      <div className="container">
        <div className="row ">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="card disposisi w-100">
              <div className="card-body">
                <h5 className="card-title p-2">SELURUH DISPOSISI HARWAT</h5>
                <div className="d-flex justify-content-center align-items-center">
                  <h1 className="cardClient-text-harwat py-3">{hitungHarwat}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="card disposisi w-100">
              <div className="card-body">
                <h5 className="card-title p-2">SELURUH DISPOSISI BMP</h5>
                <div className="d-flex justify-content-center align-items-center">
                  <h1 className="cardClient-text-bmp py-3">{hitungBMP}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <ChartBar/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CardClient;
