"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { FaSquareMinus } from "react-icons/fa6";
import { FaWindowMaximize } from "react-icons/fa6";

Chart.register(...registerables); // Registrasi semua modul Chart.js

const ChartBar = () => {
  const chartPolaRef = useRef(null);
  const chartInstance = useRef(null);
  const chart2 = useRef(null);

  const [hitungHarwatDisposisi, setHitungHarwatDisposisi] = useState(0);
  const [hitungBMPDisposisi, setHitungBMPDisposisi] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const groupByMonth = (data, dateField) => {
    const groupedData = Array(12).fill(0); // Array untuk 12 bulan
    data.forEach((item) => {
      const date = new Date(item[dateField]);
      const month = date.getMonth(); // 0 = Januari, 11 = Desember
      groupedData[month]++;
    });
    return groupedData;
  };

  const hitungDisposisi = async () => {
    try {
      const response = await fetch("/api/v1/disposisi/getdisposisi");
      const data = await response.json();

      const harwatByMonth = groupByMonth(
        data.filter((item) => item.type_disposisi === "disposisi Harwat"),
        "createdAt"
      );
      setHitungHarwatDisposisi(harwatByMonth);

      const BMPByMonth = groupByMonth(
        data.filter((item) => item.type_disposisi === "disposisi BMP"),
        "createdAt"
      );
      setHitungBMPDisposisi(BMPByMonth);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const InisialisasiChart = () => {
    if (!chartPolaRef.current) return;
    // Grafik kedua
    if (chart2.current) {
      chart2.current.destroy();
    }

    const cpr = chartPolaRef.current.getContext("2d");
    if (!cpr) return;
    const dataPola = {
      labels: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      datasets: [
        {
          label: "Disposisi Masuk (Harwat)",
          data: hitungHarwatDisposisi,
          backgroundColor: "#c62e2e",
          borderColor: 1,
        },
        {
          label: "Disposisi Masuk (BMP)",
          data: hitungBMPDisposisi,
          backgroundColor: "#fabc3f",
          borderColor: 1,
        },
      ],
    };

    const optionsCpr = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "#373A40", // Warna garis kotak-kotak di sumbu Y
            },
          },
          x: {
            grid: {
              color: "#373A40", // Warna garis kotak-kotak di sumbu X
            },
          },
        },
      };
      

    // Membuat instance Chart untuk cpr
    chart2.current = new Chart(cpr, {
      type: "bar",
      data: dataPola,
      options: optionsCpr,
    });
  };

  const toggleCard = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && chartPolaRef.current) {
      // Hapus chart lama jika ada
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      InisialisasiChart();
    }
  }, [hitungHarwatDisposisi, hitungBMPDisposisi, isOpen]);

  useEffect(() => {
    hitungDisposisi();
  }, []);

  return (
    <div className="mychart">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 mt-4">
            <div className="card card-mychartPolar">
              <div className="d-flex justify-content-between align-items-center mx-3 my-3">

                {/* Teks di tengah */}
                <span className="text-center flex-grow-1 text-minimize">
                  {isOpen ? "" : "Chart Data Tertutup"}
                </span>
                {/* Tombol di pojok kanan */}
                <span className="fs-4 cursor-pointer minimize-chart" onClick={toggleCard}>
                  {isOpen ? <FaSquareMinus /> : <FaWindowMaximize />}
                </span>
              </div>

              {isOpen && (
                <div className={`card-body card-bar ${isOpen ? "show" : "close"}`}>
                  <canvas ref={chartPolaRef} className="chartPola"></canvas>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartBar;
