import axios from "axios";

export class ServicioService {
    url = "https://farmaciareu.site/servicio/";

    create(servicios){
        return axios.post(this.url, servicios).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(servicios){
        return axios.put(this.url+servicios.id, servicios).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}