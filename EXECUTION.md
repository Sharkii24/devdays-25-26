# Documento de ejecución

Este archivo Markdown tendrá como objetivo guiar a los usuarios que utilicen el sistema a probar la funcionalidad implementada en él.

El primer paso antes de nada, sería **implementar las pruebas postman**, alojadas en el archivo 'DevDays25.postman_collection.json', que se encuentra en la ruta: 'workspace-backend/tests_postman/DevDays25.postman_collection.json'. Se debería de descargar dicho archivo e importarlo en su cliente Postman. **Si a lo largo de trabajar con las pruebas postman, no funciona la variable de la colección {{baseURL}} definida en todas las pruebas, debería de cambiarse manualmente por localhost:3000**. Otros requisitos a remarcar para la ejecución del proyecto, sería descargar, además tener abierto o en segundo plano, **ollama**, concretamente el modelo **'llama3.2:1b'**, (en caso de no tener descargado este modelo, fallarían algunas pruebas), lo mismo con MongoDBCompass y docker. Además, es esencial tener descargadas todas las dependencias necesarias.

Para comprobar el funcionamiento de este proyecto, será necesario preparar el entorno, para ello, deberá ejecutar el script **'npm run dev'**, este script levantará el contenedor correspondiente en docker sobre el puerto 3000, además de lanzar la aplicación Next.js sobre el puerto 4000. Una vez realizado esto, el usuario podrá realizar las pruebas postman siguiendo el orden en el que están establecidas.

## N0_1: Proyecto base

Las pruebas postman nombradas como 'Create Issues Paginated' y 'Create AI Chat' **no pertenecen a este entregable**, pertenecen a entregables de niveles superiores. Para comprobar el funcionamiento de la parte de Chat con modelo de IA de este entregable, se recomienda usar la prueba 'Create AI Chat with Provider', definiendo en el body JSON de la petición, que el proveedor sea 'openai' para OpenAI, o 'ollama' para Ollama (empleando la librería OpenAI). Además, recuerde que si no tiene ollama en segundo plano, esta última prueba fallará con un error HTTP 500 INTERNAL SERVER ERROR.

### Explicación sobre distintas pruebas postman

**Users:** Devuelve la lista de usuarios registrados en el sistema.

**User:** Devuelve un usuario en concreto según el identificador definido en la ruta de la petición.

**Create User:** Crea y devuelve el usuario creado (en caso de que la operación sea exitosa). Se debe agregar un body JSON que cuente con la propiedad 'name' que será el nombre del usuario a crear.

**Delete User:** Borra y devuelve el usuario borrado (en caso de que la operación sea exitosa). Se define el identificador del usuario en concreto que se desea eliminar en la ruta de la petición.

**Update User:** Actualiza y devuelve el usuario editado (en caso de que la operación sea exitosa). Se define el indentificador del usuario en concreto que se desea eliminar en la ruta de la petición, y se debe agregar un body JSON que cuente con la propiedad 'name' que será el nombre del usuario a actualizar.

**Create User (Error check):** Comprobación del error correspondiente al no cumplir las validaciones al crear un usuario. Se obtiene un error HTTP 400 BAD REQUEST.

**Update User (Error check):** Comprobación del error correspondiente al no cumplir las validaciones al editar un usuario. Se obtiene un error HTTP 400 BAD REQUEST.

**Es relevante mencionar dos cosas, se puede apreciar los cambios en la lista de usuarios registrados en el sistema al crear un nuevo usuario, editar un usuario existente o borrar uno, para ello se recomienda utilizar la prueba 'Users' tras realizar estas pruebas. Además de que el usuario puede acceder al frontend de la aplicación Next.js, en el puerto 4000 (https://localhost:4000) mientras realiza las pruebas postman sobre usuarios, podrá ver como se actualiza la información de usuarios reflejada en dicha aplicación.**

**Create Issues:** Almacena y devuelve las issues que tiene un repositorio, según el body JSON de la petición, donde se refleja el nombre del repositorio y el nombre del propietario.

**Issues:** Devuelve una lista con las issues almacenadas en el sistema.

**Issue:** Devuelve una issue según su identificador único definido en la ruta de la petición.

**Create Issue (Error check):** Comprobación del error correspondiente al no cumplir las validacoines al almacenar nuevas issues. Se obtiene un error HTTP 400 BAD REQUEST.

**Create Audit:** Crea y devuelve un auditación sobre las issues almacenadas en el sistema.

**Audits:** Devuelve la lista de auditaciones sobre issues, existentes en el sistema.

**Audit:** Devuelve una auditación de issues, según su identificador único definido en la ruta de la petición.

**Create AI Chat with Provider:** Crea un mensaje de respuesta según el modelo de IA y el prompt utilizados en la petición, los cuales están definidos en el body JSON. Los proveedores a utilizar serían 'openai' => OpenAI, 'ollama' => Ollama (empleando la librería OpenAI), y 'ollama-local' => Ollama (empleando la librería ollama local). **Este último proveedor es utilizado para un entregable de nivel superior.** En caso de no especificar ningún proveedor, se utilizará el proveedor 'ollama-local'.

**Create AI Chat with Provider (Error check):** Comprobación del error correspondiente al no utilizar un proveedor compatible con el sistema.

**Create User Telematry:** Comprobación de spans manuales sobre la función de recibir todos los usuarios registrados en el sistema.

## N1_1: Función recursiva: Paginación de datos de la API de GitHub

La única prueba postman relacionada con este entregable sería:

**Create Issues Paginated:** Almacena y devuelve todas las issues de un repositorio concreto de GitHub, accediendo a las diferentes páginas establecidas por la paginación de la API REST de GitHub. El nombre del repositorio y el nombre de su propietario vienen determinados en el body JSON de la petición.

## N1_3: Integración de proveedores IA

Las pruebas postman relacionadas con este entregable serían:

**Create AI Chat:** Crea un mensaje de respuesta según el modelo de IA Ollama 'llama3.2:1b', y el prompt utilizado en la petición, el cual está definido en el body JSON.

**Create AI Chat with Provider:** Crea un mensaje de respuesta según el modelo de IA y el prompt utilizados en la petición, los cuales están definidos en el body JSON. Los proveedores a utilizar serían 'openai' => OpenAI, 'ollama' => Ollama (empleando la librería OpenAI), y 'ollama-local' => Ollama (empleando la librería ollama local). En caso de no especificar ningún proveedor, se utilizará el proveedor 'ollama-local'.