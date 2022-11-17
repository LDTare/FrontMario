import axios from "axios";

export class KardexsService {
    url = "https://farmaciareu.site/kardex/";

    create(kardexs){
        return axios.post(this.url, kardexs).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(kardexs){
        return axios.put(this.url+kardexs.id, kardexs).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}