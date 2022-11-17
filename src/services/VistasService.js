import axios from "axios";

export class VistasService {
    url = "https://farmaciareu.site/vistas/";

    readAllPedido(id){
        return axios.get(this.url + 'pedido/' + id)
        .then(res => res.data);
    }

    readAllPedidoDetalle(id){
        return axios.get(this.url + 'pedidoDetalle/' + id)
        .then(res => res.data);
    }

    readAllSuministros(id){
        return axios.get(this.url + 'controlSuministros/' + id)
        .then(res => res.data);
    }

    readAllKardex(id){
        return axios.get(this.url + 'controlKardex/' + id)
        .then(res => res.data);
    }
}