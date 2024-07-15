import { Component } from '@angular/core';
import { InventarioApiService } from 'src/app/services/inventario-api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-inventarios-info',
  templateUrl: './inventarios-info.component.html',
  styleUrls: ['./inventarios-info.component.scss']
})
export class InventariosInfoComponent {

  // NG MODELS
  manzana:string="";
  lote:string="";
  metros:string="";
  prototipo="";
  medidas:string="";
  precioVenta:string="";
  descuento:string="";
  desarrollo:string="";
  inventario:any;
  id:any;


  obtenerMedidasComoEntero(): number {
    return parseInt(this.medidas, 10);
  }

  colindancias:any[]=[];
  constructor(private inventarioApiService:InventarioApiService,private route: ActivatedRoute,private router: Router){

    this.route.params.subscribe(params => {
      var id =params['id'];
      this.id=id
    
      this.inventarioApiService.getInventarioById(id).subscribe((data:any)=>{
        this.inventario=data;
        console.log(this.inventario);
        this.desarrollo=data.desarrollo;
        this.manzana=data.manzana;
        this.lote=data.lote;
        this.metros=data.metros;
        this.prototipo=data.prototipo;
        this.medidas=data.medidas;
        this.precioVenta=data.precioVenta;
        this.descuento=data.descuento;
        
        this.inventarioApiService.getColindanciasById(data._id).subscribe((data2:any)=>{

          this.colindancias= data2;
          console.log(this.colindancias,"COLIN");
        });

      });
    });
   
    

      
  }


  modificar(){

    /*this.inventario=data;
      console.log(this.inventario);
      this.manzana=data.manzana;
      this.lote=data.lote;
      this.metros=data.metros;
      this.prototipo=data.prototipo;
      this.medidas=data.medidas;
      this.precioVenta=data.precioVenta;*/

      var inventario = {
        id: this.id,
        desarrollo: this.desarrollo,
        manzana: this.manzana,
        lote: this.lote,
        metros: this.metros,
        prototipo: this.prototipo,
        medidas: this.medidas,
        precioVenta: this.precioVenta,
        descuento: this.descuento,
      };
      
    this.inventarioApiService.updateInventario(inventario).subscribe((data:any)=>{
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Estado actualizado correctamente"
      });
      window.location.reload();

    });
  }


  eliminarinv(){


    this.inventarioApiService.borrarInv(this.id).subscribe((data:any)=>{
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Eliminado correctamente"
      });
      //Redirigir
      this.router.navigateByUrl('/dashboard/verInventario');

    });
  }

  

}
