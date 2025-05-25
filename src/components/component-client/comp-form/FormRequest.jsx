"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "animate.css";
import Judul from "../comp-judul/Judul";

const FormRequest = () => {
  const [data, setData] = useState({
    nama: "",
    satfung: "",
    perihal: "",
    no_pengajuan: "",
    nrp: "",
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

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "nrp" && value) {
      if (value.length < 8) {
        setData((prev) => ({
          ...prev,
          nama: "",
          satfung: "",
        }));
        return;
      }

      try {
        const response = await fetch(`/api/v1/izin?nrp=${value}`);
        const result = await response.json();

        if (result.error) {
          setData((prev) => ({
            ...prev,
            nama: "",
            satfung: "",
          }));
        } else {
          setData((prev) => ({
            ...prev,
            nama: result.nama,
            satfung: result.satfung,
          }));
        }
      } catch (err) {
        console.error("Error fetching NRP:", err);
        setData((prev) => ({
          ...prev,
          nama: "",
          satfung: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !data.nama ||
      !data.satfung ||
      !data.perihal ||
      !data.no_pengajuan ||
      !data.nrp
    ) {
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
            <>
              <Judul />
              <div className="d-flex justify-content-center align-items-center mt-3">
                <button className="btn" onClick={() => setIsFormVisible(true)}>
                  Ambil nomor nota dinas
                </button>
              </div>
            </>
          )}

          {/* Form ditampilkan hanya jika isFormVisible true */}
          {isFormVisible && (
            <form
              onSubmit={handleSubmit}
              className="animate__animated animate__zoomIn"
            >
              {/* nrp/NRP Field */}
              <div className="mb-3">
                <label className="form-label">NRP / NIP</label>
                <input
                  type="number"
                  className="form-control"
                  value={data.nrp}
                  onChange={handleChange}
                  name="nrp"
                  placeholder="79044312"
                />
              </div>

              {/* Nama Field */}
              <div className="mb-3">
                <label className="form-label">Nama</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.nama}
                  onChange={handleChange}
                  name="nama"
                  placeholder="Nama"
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Jabatan</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.satfung}
                  onChange={handleChange}
                  name="satfung"
                  placeholder="Baglog"
                  readOnly
                />
              </div>

              {/* No Pengajuan Field */}
              <div className="mb-3">
                <label className="form-label">No Nota Dinas Anda</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.no_pengajuan}
                  onChange={handleChange}
                  name="no_pengajuan"
                />
              </div>

              {/* Perihal Field */}
              <div className="mb-3">
                <label className="form-label">Perihal</label>
                <textarea
                  className="form-control"
                  value={data.perihal}
                  onChange={handleChange}
                  name="perihal"
                  rows="3"
                  placeholder="Permohonan ATK"
                ></textarea>
              </div>

              <div className="d-flex justify-content-center">
                <button className="btn btn-success col-md-4" type="submit">
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
