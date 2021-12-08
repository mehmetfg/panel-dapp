import Swal from "sweetalert2";
import toast from 'react-hot-toast';

export const successHandler = (s) => {
    switch (s) {
        case 'insert':
            return toast.success(' Kayıt İşlemi Başarılı', '') /*  Swal.fire('Başarılı', 'Kayıt İşlemi Başarılı', 'success')*/
        case 'update':
            return toast.success('Güncelleme  İşlemi Başarılı', '')
        case 'delete':
            return toast.success('Silme  İşlemi Başarılı', '')
        default :
            return Swal.fire('Başarılı')
    }
}
export const errorHandler = e => {
    switch (e.response.status) {
        case 500 :
            return Swal.fire('Sunucu Hatası ', e.response.data.message, 'error')
        case 401 :
            return Swal.fire('Yetki Hatası  ', 'Sunucu Hatası Lütfen Suncunucu Hatası', 'error').then(function (response) {
                window.location.href = "/login";
            })
        case 422 :
            let messages = '<ul> ';
            Object.values(e.response.data.errors).map((item) => (
                messages += '<li>' + item.toString() + ' </li> '

            ))
            return Swal.fire('Hata', messages + ' </ul>')

        case 400 :
            return 'Url veya parametre ile ilgili sorun '
        case 404:
            return 'Sayfa bulunamadı '
        case 403 :
            return 'Yetkisi Sayfa Erişimi'
        case 405 :
            return Swal.fire('Sunucu Hatası ', e.response.data.message, 'error')
        case 1 :


    }
}

export const confirm = message => {
    return Swal.fire({
        showCancelButton: true,
        title: 'Dikkat',
        html: message,
    }).then((result) => {
        return result
    })


}
