/**
 * Evento que se ejecuta cuando el usuario hace click sobre el botón del formulario.
 */
document.getElementById('read_button').addEventListener('click', function() {

    /**
     * Se avisa al usuario mediante un alert en caso de que no haya introducido ningún fichero.
     */
    if(document.getElementById("file-input").files.length == 0) {
        alert('ERROR: No ha introducido ningún fichero.');
		return;
	}

    /**
     * Se obtiene el fichero introducido por el usuario.
     */
    let file = document.getElementById("file-input").files[0];

    /**
     * Se crea un objeto FileReader para poder leer el contenido del fichero.
     */
    let reader = new FileReader();

    /**
     * Evento que se ejecuta cuando ha finalizado correctamente la lectura del fichero.
     */
    reader.addEventListener('load', function(e) {

        // Se obtienen los datos leídos del fichero.
        let text = String(e.target.result);

        // Se procesa el contenido del fichero para convertirlo en una matriz.
        text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        text = text.replace("  ", " ");
        text = text.toLowerCase();
        text = text.split('\n');
        let documents = [];

        for (let i = 0; i < text.length; i++) {
            documents.push(text[i].split(" "));
            if (documents[i] == '') {
                documents.splice(i, 1);
            }
        }

        // Se crea un objeto de la clase Recommender.
        const recommender = new Recommender(documents);

        // Se muestran las tablas para cada uno de los documentos y la similaridad coseno.
        document.getElementById("result").innerHTML = show_result(recommender.get_documents(), recommender.get_tf(), recommender.get_idf(), recommender.get_tf_idf(), recommender.get_cosine_similarity());
    });

    /**
     * Evento que se ejecuta si ocurre algún error en la lectura del fichero.
     */
    reader.addEventListener('error', function() {
	    alert('ERROR: Fallo al leer el contenido del fichero.');
	});

    /**
     * Se lee como un fichero de texto el fichero introducido por el usuario.
     */
    reader.readAsText(file);
});

/**
 * Función para mostrar los resultados obtenidos al ejecutar los métodos de la clase Recommender.
 * @param documents Matriz que almacena en cada una de sus filas un documento.
 * @param tf Matriz que almacena la frecuencia de cada palabra en el documento donde se encuentra.
 * @param idf Matriz que contiene el valor IDF para cada una de las palabras.
 * @param tf_idf Matriz que almacena el valor TF - IDF para cada palabra.
 * @param cosine_similarity Matriz que contiene la similaridad coseno entre cada par de documentos.
 * @returns Código HTML con la tabla de resultados de cada documento y la similaridad coseno entre cada par.
 */
function show_result(documents, tf, idf, tf_idf, cosine_similarity) {
    let result = '';

    result += '<div class="col s12"><h5 class="center">Similaridad coseno entre documentos</h5></div>' + show_table_similarity(documents, cosine_similarity);

    for (let i = 0; i < documents.length; i++) {
        result += '<div class="col s12"><h5 class="center">Documento ' + (i + 1) + '</h5></div>' + show_table(documents[i], tf[i], idf[i], tf_idf[i]);
    }
    return result;
}

/**
 * Función para mostrar una tabla con la similaridad coseno entre cada par de documentos.
 * @param documents Matriz que almacena en cada una de sus filas un documento.
 * @param cosine_similarity Matriz que contiene la similaridad coseno entre cada par de documentos.
 * @returns Tabla con la similaridad coseno entre cada par de documentos en código HTML.
 */
function show_table_similarity(documents, cosine_similarity) {
    let table = '<div class="col s12" id="table-scroll"><table class="stripped"><thead><tr><th> </th>';
    for (let i = 0; i < documents.length; i++) {
        table += '<th>Documento ' + (i + 1) + '</th>';
    }
    table += '</thead><tbody>';
    for (let i = 0; i < cosine_similarity.length; i++) {
        table += '<tr><th>Documento ' + (i + 1) + '</th>';
        for (let j = 0; j < cosine_similarity[i].length; j++) {
            table += '<td>' + Math.round((cosine_similarity[i][j] + Number.EPSILON) * 1000) / 1000 + '</td>';
        }
        table += '</tr>';
    }
    table += '</tbody></table></div>';
    return table;
}

/**
 * Función para mostrar las tablas de resultados para cada documento.
 * @param document Vector que contiene las palabras de un determinado documento.
 * @param tf Vector con los valores TF para las palabras de ese documento.
 * @param idf Vector con los valores IDF para las palabras del documento.
 * @param tf_idf Vector con los valores TF - IDF para cada una de las palabras del documento.
 * @returns Tabla con los resultados para un documento en código HTML.
 */
function show_table(document, tf, idf, tf_idf) {
    let table = '<div class="col s12" id="table-scroll"><table class="stripped"><thead><tr><th>Índice</th><th>Término</th><th>TF</th><th>IDF</th><th>TF-IDF</th></tr></thead><tbody>';

    for (let i = 0; i < document.length; i++) {
        table += '<tr><td id="index">' +  (i + 1) + '</td>';
        table += '<td>' + document[i] + '</td>';
        table += '<td>' +  tf[i] + '</td>';
        table += '<td>' + Math.round((idf[i] + Number.EPSILON) * 1000) / 1000 + '</td>';
        table += '<td>' + Math.round((tf_idf[i] + Number.EPSILON) * 1000) / 1000 + '</td></tr>';
    }
    table += '</tbody></table></div>';
    return table;
}
