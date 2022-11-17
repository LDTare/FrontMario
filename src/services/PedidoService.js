import axios from "axios";

export class PedidoService {
    url = "https://farmaciareu.site/pedido/";

    create(pedido){
        return axios.post(this.url, pedido).then(res=> res.data);
    }
    readAll(){
        return axios.get(this.url).then(res=> res.data);
    }
    update(pedido){
        return axios.put(this.url+pedido.id, pedido).then(res=> res.data);
    }
    delete(id){
        return axios.delete(this.url+id).then(res=> res.data);
    }
}