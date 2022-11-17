import axios from "axios";

export class RequisicionService {
    url = "https://farmaciareu.site/requisicion/";

    create(requisicion){
        return axios.post(this.url, requisicion).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(requisicion){
        return axios.put(this.url+requisicion.id, requisicion).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}