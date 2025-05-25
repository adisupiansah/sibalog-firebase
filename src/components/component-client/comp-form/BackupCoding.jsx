"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "animate.css";

const FormRequest = () => {
  const [data, setData] = useState({
    nama: "",
    satfung: "",
    perihal: "",
    no_pengajuan: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false); // State untuk mengontrol tampilan form

  const fetchNotaDinas = async () => {
    try {
      const response = await fetch("/api/client/fetch");
      if (response.ok) {
        const result = await response.json();
        setData((prev) => ({
          ...prev,
          no_pengajuan: result.no_pengajuan || "", // Pastikan nilai default jika tidak ada
        }));
      } else {
        console.error("Gagal mengambil data:", response.status);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value, // Update hanya properti yang sesuai dengan name
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.nama || !data.satfung || !data.perihal || !data.no_pengajuan) {
      Swal.fire({
        title: "Error",
        text: "Harap lengkapi semua form!",
        icon: "error",
        confirmButtonColor: "#72bf78",
        confirmButtonText: "OK",
        color: "#D9D9D9",
        background: "#212529",
      });
      return;
    }

    try {
      const response = await fetch("/api/client/input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          title: "Berhasil",
          text: "Data berhasil disimpan",
          icon: "success",
          confirmButtonText: "OK",
          color: "#D9D9D9",
          background: "#212529",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Gagal",
          text: "Gagal menyimpan data",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan pada server",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchNotaDinas();
  }, []);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          {/* Tombol untuk menampilkan form */}
          {!isFormVisible && (
            <div className="d-flex justify-content-center align-items-center mt-3">
              <button className="btn" onClick={() => setIsFormVisible(true)}>
                Ambil nomor nota dinas
              </button>
            </div>
          )}

          {/* Form ditampilkan hanya jika isFormVisible true */}
          {isFormVisible && (
            <form
              onSubmit={handleSubmit}
              className="animate__animated animate__zoomIn"
            >
              <label>Nama</label>
              <input
                type="text"
                className="form-control"
                placeholder="Adi Supiyansah"
                value={data.nama}
                onChange={handleChange}
                name="nama"
              />

              <label className="mt-3">Satfung</label>
              <input
                type="text"
                className="form-control"
                placeholder="Baglog"
                value={data.satfung}
                onChange={handleChange}
                name="satfung"
              />

              <label className="mt-3">No Nota Dinas Anda</label>
              <input
                type="text"
                className="form-control"
                value={data.no_pengajuan}
                onChange={handleChange}
                name="no_pengajuan"
              />

              <label className="mt-3">Perihal</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Hal"
                value={data.perihal}
                onChange={handleChange}
                name="perihal"
              ></textarea>

              <div className="trigger-submit d-flex justify-content-end align-items-end">
                <button className="btn btn-sm mt-3" type="submit">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormRequest;
