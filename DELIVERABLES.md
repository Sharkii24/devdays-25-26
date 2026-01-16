# Documento de entregables realizados

Este archivo Markdown tendrá como objetivo listar los entregables realizados, además de explicar cómo han sido llevados a cabo para su implementación, especificando las modificaciones en los distintos archivos.

**N0_1:** Proyecto base realizado en clase (con modificaciones propuestas terminadas).

**N1_1:** Función recursiva: Paginación de datos de la API de GitHub.

**N1_3:** Integración de proveedores IA.

## N0_1: Proyecto base

Este entregable ha sido completado siguiendo la clase que tuvo lugar el día lunes 22 de diciembre, en el que se explicaron 7 temas distintos Conformaría la base del proyecto completo, sobre el que se realizarían los entregables de mayor nivel. Además, se han completado las modificaciones explícitas en este entregable, tales como:

### Generación de función PUT para actualizar un usuario

Se debía agregar un endpoint adecuado para poder actualizar un usuario existente en el sistema mediante una operación HTTP PUT, dicho endpoint debía ser asignado a la ruta PUT /users/:id, siendo 'id' el identificador único del usuario que se debería de editar. Los archivos con principales cambios fueron los siguientes:

**user.service.js:** Encontrado en la ruta 'workspace-backend/src/services/user.service.js'. En este archivo se implementó la función que conllevaría la responsabilidad de realizar la actualización sobre el usuario deseado en la petición. El flujo de trabajo sería construir el usuario editado con la información a actualizar, buscar el usuario original en el sistema. Sustituir el original por el actualizado en el sistema. Por último, se devolvería el usuario actualizado.

**user.controller.js:** Encontrado en la ruta 'workspace-backend/src/controllers/user.controller.js'. En este archivo se añadió la función del servicio correspondiente que se encargaría de llevar a cabo la funcionalidad solicitada de editar un usuario. Además de que se implementó una función encargada de manejar la petición entrante para la edición. En esta función se recibe el identificador único sobre el usuario que se desea aplicar la funcionalidad de edición, y con ello, se invocaría a la función del servicio para realizar la actualización con las propiedades del usuario a actualizar. En caso de que suceda algún error, se devolvería un error HTTP 500 INTERNAL SERVER ERROR.

**user.middleware.js:** Encontrado en la ruta 'workspace-backend/src/middlewares/user.middleware.js'. En este archivo se agregó el validador correspondiente a comprobar según los datos de entrada para la petición, para poder realizar la función de edición sobre un usuario concreto del sistema. Dicho validador comprueba que, en el cuerpo de la petición, la propiedad 'name' esté definida, sea una cadena de texto, tenga una longitud mínima de 3 carácteres y máxima de 50 carácteres, y no puede ser una cadena de texto sin carácteres. En caso de que se incumpla alguna de estas reglas, se devolvería un error HTTP 400 BAD REQUEST.

**user.routes.js:** Encontrado en la ruta 'workspace-backend/src/routes/user.routes.js'. En este archivo se añadió la función a emplear que manejaría la petición, y el validador/middleware adecuado para comprobar la entrada de datos por parte del usuario que interactúa con el sistema. Además de especificar la función que debía de emplear el sistema cuando recibiera una petición a la ruta 'PUT /users/:id'.

### Añadir validación en el nombre de los usuarios

Se debía añadir una validación que comprobara que el nombre de los usuarios no ocupara más de 50 carácteres. Por ello, se modificó el siguiente archivo:

**user.middleware.js:** Encontrado en la ruta 'workspace-backend/src/middlewares/user.middleware.js'. En este archivo se agregó la validación de que el nombre que se encontraba en el cuerpo de la petición para crear un nuevo usuario en el sistema, no superara los 50 carácteres. En caso contrario, devolvería un error HTTP 400 BAD REQUEST.

### Almacenar propiedad 'updateAt' en issues de GitHub

Se debía implementar una nueva propiedad en el modelo de issues del sistema, de modo que dicha propiedad se nombrara como 'updateAt' e indicara la fecha en la que dicha issue fue actualizada por última vez. Para ello, los archivos que fueron modificados fueron los siguientes:

**issue.model.js:** Encontrado en la ruta 'workspace-backend/src/models/issue.model.js'. En este archivo se incorporó dicha propiedad, especificando que es obligatoria, es decir, que siempre tiene que estar definida para cualquier issue, y que es de tipo fecha.

**issue.service.js:** Encontrado en la ruta 'workspace-backend/src/services/issue.service.js'. En este archivo se agregó dicha propiedad dentro del método encargado de realizar la funcionalidad de guardar una issue en la base de datos.

### Añadir pequeño 'timeout' para simular una operación asíncrona

Se debía implementar un timeout dentro de una función ya incorporada en el sistema, con el objetivo de analizar el cambio provocado mediante la telematría empleada. Entonces, se modificó el siguiente archivo:

**user.controller.js:** Encontrado en la ruta 'workspace-backend/src/controllers/user.controller.js'. En este archivo se agregó una promesa que contaba con un timeout, en una función ya implementada en el sistema, en concreto la encargada de obtener y devolver todos los usuarios existentes en el sistema. De esta manera, se simulaba la función como una función asíncrona.

## N1_1: Función recursiva: Paginación de datos de la API de GitHub

Se debía de realizar la creación de una función genérica que consuma de la API REST de GitHub para poder obtener datos. Si hay varias páginas de información, la función debe paginar de forma automática para obtener toda la información. Por lo tanto, se modificaron los siguientes archivos:

**pagination.js:** Encontrado en la ruta 'workspace-backend/src/utils/pagination.js'. Este archivo fue creado desde 0, con el objetivo de implementar únicamente la función recursiva responsable de obtener toda la información necesaria según la paginación empleada por la API REST de GitHub. De modo que se construyó una función pública, que convoca a la función privada recursiva. Esta función recursiva se encarga de realizar la petición GET al link deseado mediante 'axios', los items obtenidos tras la petición son agregados a un acumulador, el cual irá creciendo a lo largo de las distintas llamadas a la función recursiva. De este modo, el acumulador será el que contenga la información total según la paginación de la API REST de GitHub. Ahora se comprueba si en la cabecera 'link' de la respuesta obtenida, hay una sección con la cadena de texto 'rel="next"' la cual indica el link de la siguiente página según la paginación empleada. En caso de que exista, se debe obtener el link exclusivamente, el cual es realizado según un Regex. Obteniendo de este modo el link de la siguiente página, por lo que se volvería a llamar a la función recursiva hasta que no exista un link que lleve a la siguiente página. Cuando esto ocurra, se devolvería todos los items obtenidos.

**issue.service.js:** Encontrado en la ruta 'workspace-backend/src/services/issue.service.js'. En este archivo se incluyó una nueva función encargada de invocar a la función pública definida en el archivo anterior. Especificando el link al que se realizaría la petición, el cual sería todas las issues que tiene un repositorio según el nombre de su dueño, y el nombre del repositorio. Estos dos atributos vendrían como parámetros de entrada en la petición a esta función.

**issue.controller.js:** Encontrado en la ruta 'workspace-backend/src/controllers/issue.controller.js'. En este archivo se añadió una función responsable de llamar a la función del servicio definida anteriormente, y según las issues obtenidas, estas serían almacenadas en la base de datos, realizado por otra función del servicio encargada de esta operación. Además, se obtiene el nombre del repositorio y el nombre del dueño de la petición entrante, los cuales determinarán las issues de qué repositorio obtener. En caso de que haya algún error, se devolvería un error HTTP 500 INTERNAL SERVER ERROR.

**issue.routes.js:** Encontrado en la ruta 'workspace-backend/src/routes/issue.routes.js'. En este archivo se implementó la ruta de la petición adecuada a la que debía responder la función del controlador anterior. La cual sería a la ruta 'POST /issues/fetch/paginated', haciendo uso de la comprobación correspondiente del validador.

## N1_3: Integración de proveedores IA

Se debía de usar Ollama local en lugar de llamar a OpenAI. Para ello, se modificaron los siguientes archivos:

**ollamalocal.service.js:** Encontrado en la ruta 'workspace-backend/src/services/ollamalocal.service.js'. Este archivo fue desarrollado desde 0, en el que se introdujo una función pública, que haría uso de la librería 'ollama'. Esta función emplearía el método 'chat' de dicha librería, utilizando el modelo 'llama3.2:1b' de ollama, y pasandole a este modelo de IA el mensaje según el 'prompt' que sirve como parámetro de entrada en la función. Por último, devolvería el contenido correspondiente a la respuesta por parte del modelo de IA.

**ai.controller.js:** Encontrado en la ruta 'workspace-backend/src/controllers/ai.controller.js'. En este archivo se añadió una nueva función pública, y un objeto privado que usaría dicha función. La función determinaría el prompt de entrada según el cuerpo de la petición solicitada, y el proveedor que se desea usar. En caso de que no se especifique ninguno, se emplearía el definido anteriormente. Para determinar que función de los servicios emplear, se utiliza la nueva clase privada, la que devuelve una función de los servicios según el proveedor escogido. En caso de que no se pueda devolver una función de los servicios, es decir, que el proveedor solicitado no esté disponible en el sistema, se devolvería un error HTTP 400 BAD REQUEST. Una vez obtenido la función de los servicios a emplear, se le pasaría el prompt, y se devolvería el resultado obtenido con dicha función. En caso de algún error se devolvería un error HTTP 500 INTERNAL SERVER ERROR. Además, se modificó la función pública existente, de modo que empleara la nueva función de los servicios, la cual utiliza la librería de ollama en local.

**ai.routes.js:** Encontrado en la ruta 'workspace-backend/src/routes/ai.routes.js'. En este archivo se implementó la nueva funcionalidad incorporada en el controlador definida anteriormente, especificando la ruta de petición a la que respondería, la cual sería 'POST /ai/chat/provider'.