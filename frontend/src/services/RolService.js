import axios from "axios";

export class RolService {
    url = "https://farmaciareu.site/rol/";

    create(rol){
        return axios.post(this.url, rol).then(res => res.data);
    }
    readAll(){
        return axios.get(this.url).then(res => res.data);
    }
    update(rol){
        return axios.put(this.url + rol.id, rol).then(res => res.data);
    }
    delete(id){
        return axios.delete(this.url + id).then(res => res.data);
    }
}