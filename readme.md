OBJETIVO
Realizar una aplicación que contemple varios temas que fueron exponiendo diferentes grupos.
FUNCIONALIDAD:
La aplicación debe contar con un menú para poder acceder a cada una de las screens que van a
presentar algún tipo de funcionalidad.
SCREENS:
● Configuración de la aplicación: (ConfiguracionScreen)
Pantalla de configuración de la aplicación en la que vamos a poder indicar los siguientes
datos:
● Número telefónico de emergencia/aviso.
● Url externa del video
● Url externa de la música de fondo favorita.
Toda esta información se almacena en el almacenamiento local del dispositivo utilizando la
biblioteca de AsyncStorage.
● Llamado de Emergencia: (EmergenciaScreen)
Cuando en la pantalla principal se sacuda rápidamente (sensores / accelerometer ) se debe
enviar un SMS/Mensaje vía WhatsApp/Llamar por teléfono al número configurado para tal
fin. En el caso de que no se haya definido un número de emergencia/aviso, se debe mostrar
con un Alert (el alert del punto de abajo)
● Mensajes al usuario:
Cada vez que se muestre un error, tanto sea por la validación de los campos o porque no se
cuenta con un permiso / errores de accesos a una API, Storage etc.. se deben mostrar con un
Alert y al mismo tiempo el dispositivo debe Vibrar.
Se recomienda hacer un componente reutilizable o un Helper que desde todos los lugares se
invoque al mismo para que la funcionalidad se encuentre encapsulada y no dispersa por todo
el código. El Alert debe tener algún tipo de “Estilo particular” no puede ser el típico Alert
blanco etc…
● Cambio de Imagen de Fondo: (CambioFondoScreen)
La aplicación debe ser capaz de poder sacar una foto (Camera) y almacenarla en la galería
de imágenes (Image Picker) o seleccionar una imagen de fondo de la galería de imágenes,
para luego de seleccionarla poder cambiar dinámicamente la imagen de fondo de toda la
aplicación. La próxima vez que inicio la aplicación debe estar la imagen seleccionada
(AsyncStorage)
● Video y Música favorita: (MultimediaScreen)
Esta pantalla tiene un player de video y un Player de Música.
En el caso de que se encuentre ingresado alguno de estos valores, se debe reproducir
automáticamente el vídeo o la música (Video Player / Audio Player) ahí ingresado.
Trabajo Práctico - DAI TP05 - React Native - Temas varios V01.0 2023-10-23
Profesor: Pablo Ulman (Polshu)
● Identificación de cada Aplicación: (AcercaDeScreen)
Cada Aplicación debe tener una pantalla de About (Acerca de) que tenga un código de Barras
(Barcode Scanner) con un nombre del grupo, pero a su vez un botón que les permita
escanear otra app y les muestre en un Modal el nombre del grupo escaneado!
Al presionar sobre ese código QR/Código de Barras se debe copiar en el ClipBoard los
nombres de los integrantes del Grupo.
Nota: El código de barras generado es un código con el formato "code128" que soporta letras
y números. https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/
Generador de codigos de ejemplo: https://barcodes.pro/generator/code128
