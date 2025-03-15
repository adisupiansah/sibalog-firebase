'use client'
import React, { useState, useEffect } from "react";
import InitTable from "@/libs/datatables-config";
import moment from "moment-timezone";
import CardClient from "./CardClient";
import { createRoot } from "react-dom/client";
import ExportPDFButton from "./ExportPdfButton";

const ViewHarwat = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const DataTable = () => {
    let savePDF = document.createElement('div')
    let root = createRoot(savePDF)
    root.render(<ExportPDFButton data={data}/>)

    InitTable("#monitor", {
      language: {
        info: "Halaman _PAGE_ dari _PAGES_",
        infoEmpty: "tidak ada catatan yang tersedia",
        infoFiltered: "(difilter dari _MAX_ data)",
        lengthMenu: "_MENU_ banyak halaman",
        zeroRecords: "Data tidak ditemukan",
      },
      layout: {
        topStart: [
          {
            search: {
              placeholder: "Cari data",
            },
            pageLength: {
              menu: [
                [10, 25, 100, -1],
                [10, 25, 100, "All"],
              ],
            },
          },
        ],
        topEnd: savePDF,
      },
      scrollX: true,
    });
  };

  //   fetch data
  const ambilData = async () => {
    try {
      const response = await fetch("/api/client/filter-disposisi");

      if (!response.ok) {
        throw new Error("gagal mengambil data");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log("error saat mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

   const WaktuJakarta = (rowData) => {
      const UTCwaktu = new Date(rowData.createdAt);
      const waktuJakarta = moment(UTCwaktu)
        .tz("Asia/Jakarta")
        .format("DD-MM-YYYY - HH:mm:ss");
      return waktuJakarta;
    };

  //   Insialisai DataTable ketika data sudah sedia
  useEffect(() => {
    if (!loading && data.length > 0) {
      const table = DataTable();
      if (table) {
        table.destroy();
      }
    }
  }, [loading, data]);

  //   fetch data
  useEffect(() => {
    ambilData();
  }, []);

  return (
    <div className="viewharwat">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <CardClient/>
            <div className="card">
              <div className="card-body">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <table className="table table-striped table-dark" id="monitor">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Tanggal Surat</th>
                        <th>Nomor Disposisi</th>
                        <th>Nomor Surat</th>
                        <th>Hal</th>
                        <th>Satfung</th>
                        <th>Tanggal Disposisi</th>
                        <th>Type Disposisi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.tgl_surat}</td>
                          <td>{item.no_disposisi}</td>
                          <td>{item.no_surat}</td>
                          <td>{item.perihal}</td>
                          <td>{item.satfung}</td>
                          <td>{WaktuJakarta(item)}</td>
                          <td>{item.type_disposisi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHarwat;
