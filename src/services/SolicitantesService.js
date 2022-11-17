import axios from "axios";

export class SolicitanteService {
    url = "https://farmaciareu.site/solicitante/";

    create(solicitantes){
        return axios.post(this.url, solicitantes).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(solicitantes){
        return axios.put(this.url+solicitantes.id, solicitantes).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}