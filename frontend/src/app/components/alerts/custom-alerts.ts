import Swal from 'sweetalert2';

export function alertError(msg: string) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: msg,
  });
}

export function alertLoading() {
  let timerInterval: ReturnType<typeof setTimeout> | number | undefined;
  Swal.fire({
    title: 'Carregando...',
    html: 'I will close in <b></b> milliseconds.',
    timer: 500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup()?.querySelector('b');
      if (!timer) return;
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    // if (result.dismiss === Swal.DismissReason.timer) {
    //   console.log('I was closed by the timer');
    // }
  });
}

export function alertConfirm(title: string): Promise<boolean> {
  return Swal.fire({
    title: title,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Confirmar!',
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
}

export function alertSuccess(msg: string) {
  Swal.fire({
    title: "msg!",
    icon: "success",
    draggable: true
  });
}
