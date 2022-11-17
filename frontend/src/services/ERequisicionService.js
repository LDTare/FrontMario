import axios from "axios";

export class ERequisicionService {
    url = "https://farmaciareu.site/reporteRequisicionR/";

    create(erequisicion){
        return axios.post(this.url, erequisicion).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(erequisicion){
        return axios.put(this.url+erequisicion.id, erequisicion).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}