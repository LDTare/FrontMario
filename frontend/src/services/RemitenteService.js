import axios from "axios";

export class RemitenteService {
    url = "https://farmaciareu.site/remitente/";

    create(remitente){
        return axios.post(this.url, remitente).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(remitente){
        return axios.put(this.url+remitente.id, remitente).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}