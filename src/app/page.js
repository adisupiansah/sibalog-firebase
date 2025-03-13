import FormRequest from "@/components/component-client/comp-form/FormRequest";
import Judul from "@/components/component-client/comp-judul/Judul";

export default function Home() {
 
  return (
    <div className="kolo justify-content-center align-items-center vh-100 d-flex flex-column" >
      <Judul/>
      <FormRequest/>
    </div>
  );
}
