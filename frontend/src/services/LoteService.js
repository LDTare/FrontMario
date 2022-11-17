import axios from "axios";

export class LoteService {
    url = "https://farmaciareu.site/lotes/";

    create(lote){
        return axios.post(this.url, lote).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    amarilloreadAll(){
        return axios.get(this.url+'amarillo').then(res=> res.data);
    }
    rojoreadAll(){
        return axios.get(this.url+'rojo').then(res=> res.data);
    }
    update(lote){
        return axios.put(this.url+lote.id, lote).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}