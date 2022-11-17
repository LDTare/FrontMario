import axios from "axios";

export class DKardexService {
    url = "https://farmaciareu.site/detalleKardex/";

    create(dKardex){
        return axios.post(this.url, dKardex).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(dKardex){
        return axios.put(this.url+dKardex.id, dKardex).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}