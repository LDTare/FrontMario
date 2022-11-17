import axios from "axios";

export class EjecutorService {
    url = "https://farmaciareu.site/ejecutores/";

    create(ejecutores){
        return axios.post(this.url, ejecutores).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(ejecutores){
        return axios.put(this.url+ejecutores.id, ejecutores).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}