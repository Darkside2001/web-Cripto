import Swal from 'sweetalert2'

export const mostrarAlerta = (titulo, mensaje, posicion = 'center',tipo = 'info',mostrarBoton = true, temporizador = 0) => {
  Swal.fire({
    title: titulo,
    text: mensaje,
    position: posicion,
    icon: tipo,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#923eff',
    showConfirmButton: mostrarBoton,
    timer: temporizador
  });
}