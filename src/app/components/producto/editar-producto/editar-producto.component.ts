import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto: Producto;

  constructor(
    private productoService: ProductoService,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.productoService.detail(id).subscribe(
      data => {
        this.producto = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.productoService.update(id, this.producto).subscribe(
      data => {
        this.toastr.success('Producto actualizado', 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      error => {
        this.toastr.error(error.error.mensaje, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      }
    );
  }

}
