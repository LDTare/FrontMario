import axios from "axios";

export class DERequisicionService {
    url = "https://farmaciareu.site/reporteDetalleRequisicionR/";

    create(derequisicion){
        return axios.post(this.url, derequisicion).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(derequisicion){
        return axios.put(this.url+derequisicion.id, derequisicion).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}