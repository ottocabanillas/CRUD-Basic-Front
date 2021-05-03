import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ItemProducto = (props) => {
  const eliminarProducto = (id) => {
    Swal.fire({
      title: "¿Esta seguro de eliminar el producto?",
      text: "No puede volver atras esta operacion luego de eliminar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //agregar la logica para borrar el producto
        try {
          const URL = `${process.env.REACT_APP_API_URL}/${id}`;

          const respuesta = await fetch(URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          if (respuesta.status === 200) {
            // mostrar ventana de error
            Swal.fire(
              "Producto eliminado",
              "El producto seleccionado fue correctamente eliminado",
              "success"
            );
            // actualizar los datos
            props.consultarApi();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p>
        {props.producto.nombreProducto}
        <span className="font-weight-bold ml-3">
          ${props.producto.precioProducto}
        </span>
      </p>
      <div>
        <Link className='btn btn-warning text-light mr-3' to={"/productos/editar/" + props.producto.id}>Editar</Link>
        {/* <Button variant="warning" className="mr-3">Editar</Button> */}
        <Button variant="danger" onClick={() => eliminarProducto(props.producto.id)}
        >
          Borrar
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default ItemProducto;
