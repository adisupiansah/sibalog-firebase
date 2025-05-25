import { db } from "@/libs/Firebase";
import { ref, get } from "firebase/database";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const nrp = searchParams.get("nrp");

  if (!nrp) {
    return Response.json({ error: "NRP harus disertakan" }, { status: 400 });
  }

  try {
    const izinRef = ref(db, "izin");
    const snapshot = await get(izinRef);

    if (!snapshot.exists()) {
      return Response.json({ error: "Data izin tidak ditemukan" }, { status: 404 });
    }

    const data = snapshot.val();
    const found = Object.values(data).find((item) => item.nrp === nrp);

    if (!found) {
      return Response.json({ error: "NRP tidak ditemukan" }, { status: 404 });
    }

    return Response.json({
      nama: found.nama,
      satfung: found.satfung,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}