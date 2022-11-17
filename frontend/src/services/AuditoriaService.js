import axios from "axios";

export class AuditoriaService {
    url = "https://farmaciareu.site/auditoria/";

    create(auditoria){
        return axios.post(this.url, auditoria).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(auditoria){
        return axios.put(this.url+auditoria.id, auditoria).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}