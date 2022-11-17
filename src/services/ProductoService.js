import axios from "axios";

export class ProductoService {
    url = "https://farmaciareu.site/producto/";

    create(producto){
        return axios.post(this.url, producto).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(producto){
        return axios.put(this.url+producto.id, producto).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}