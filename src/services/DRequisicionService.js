import axios from "axios";

export class DRequisicionService {
    url = "https://farmaciareu.site/detalleRequisicion/";

    create(deRequisicion){
        return axios.post(this.url, deRequisicion).then(res=> res.data);
    }
    createSolicitud(deRequisicion){
        return axios.post(this.url+"solicitud/", deRequisicion).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(deRequisicion){
        return axios.put(this.url+deRequisicion.id, deRequisicion).then(res=> res.data);
    }
    updateSolicitud(deRequisicion){
        return axios.put(this.url+"solicitud/"+deRequisicion.id, deRequisicion).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}