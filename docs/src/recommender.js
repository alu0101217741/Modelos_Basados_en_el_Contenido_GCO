/**
 * Clase que implementa un sistema de recomendación siguiendo el modelo basados en el contenido.
 */
class Recommender {
    /**
     * Constructor de la clase.
     * @param documents Matriz que almacena en cada una de sus filas un documento.
     */
    constructor(documents) {
        this.documents = this.duplicate_words(documents);
        this.tf = this.calculate_tf(documents);
        this.idf = this.calculate_idf();
        this.tf_idf = this.calculate_tf_idf();
        this.cosine_similarity = this.cosine_similarity();
    }

    /**
     * Método que elimina en cada documento las palabras que aparezcan más de una vez.
     * @param documents Matriz que almacena en cada una de sus filas un documento.
     * @returns Matriz que contiene en cada fila un documento que no tiene palabras repetidas.
     */
    duplicate_words(documents) {
        let unique_documents = [];
        for (let i = 0; i < documents.length; i++) {
            unique_documents.push(documents[i].filter((value, index) => {
                return documents[i].indexOf(value) == index;
            }));
        }
        return unique_documents;
    }

    /**
     * Método que calcula la frecuencia de las palabras en cada uno de los documentos.
     * @param documents Matriz que almacena en cada una de sus filas un documento.
     * @returns Matriz con los valores TF para las palabras de cada uno de los documentos.
     */
    calculate_tf(documents) {
        let matrix_tf = [];
        let vector_aux = [];
        let unique_words = [];
        const frequency = (array, value) => array.reduce((accumulator, current_value) => (current_value === value ? accumulator + 1 : accumulator), 0);
        for (let i = 0; i < documents.length; i++) {
            for (let j = 0; j < documents[i].length; j++) {
                if (!unique_words.includes(documents[i][j])) {
                    vector_aux.push(frequency(documents[i], documents[i][j]));
                    unique_words.push(documents[i][j]);
                }
            }
            matrix_tf.push(vector_aux);
            vector_aux = [];
            unique_words = [];
        }
        return matrix_tf;
    }

    /**
     * Método que calcula los valores IDF de las palabras de cada documento.
     * @returns Matriz con los valores IDF para las palabras de cada uno de los documentos.
     */
    calculate_idf() {
        let matrix_idf = [];
        let vector_aux = [];
        let total_documents = this.documents.length;
        for (let i = 0; i < this.documents.length; i++) {
            for (let j = 0; j < this.documents[i].length; j++) {
                vector_aux.push(Math.log10(total_documents / this.word_occurrences(this.documents[i][j])));
            }
            matrix_idf.push(vector_aux);
            vector_aux = [];
        }
        return matrix_idf;
    }
    
    /**
     * Método que cuenta el número de documentos en loS que aparece una determinada palabra.
     * @param word Palabra que se va a buscar en cada documento.
     * @returns La cantidad de documentos en los que aparece la palabra almacenada en el parámetro word.
     */
    word_occurrences(word) {
        let k = 0;
        let accumulator = 0;
        while (k < this.documents.length) {
            if (this.documents[k].includes(word))
                accumulator++;
            k++;
        }
        return accumulator;
    }

    /**
     * Método que calcula el valor TF - IDF para cada una de las palabras que aparecen en los documentos.
     * @returns Matriz con los valores TF - IDF para cada palabra.
     */
    calculate_tf_idf() {
        let matrix_tf_idf = [];
        let vector_aux = [];
        for (let i = 0; i < this.documents.length; i++) {
            for (let j = 0; j < this.documents[i].length; j++) {
                vector_aux.push(this.tf[i][j] * this.idf[i][j]);
            }
            matrix_tf_idf.push(vector_aux);
            vector_aux = [];
        }
        return matrix_tf_idf;
    }

    /**
     * Método que permite normalizar los valores de la matriz que contiene la frecuencia de las palabras en cada documento.
     * @returns Matriz con los valores TF normalizados.
     */
    normalize_tf() {
        let normalized_tf = [];
        let vector_aux = [];
        let vector_length;
        const sum_squared = array => array.reduce((accumulator, current_value) => (accumulator + Math.pow(current_value, 2)), 0);
        for (let i = 0; i < this.tf.length; i++) {
            vector_length = Math.sqrt(sum_squared(this.tf[i]));
            for (let j = 0; j < this.tf[i].length; j++) {
                vector_aux.push(this.tf[i][j] / vector_length);
            }
            normalized_tf.push(vector_aux);
            vector_aux = [];
        }
        return normalized_tf;
    }

    /**
     * Método que calcula la similaridad coseno entre cada par de documentos.
     * @returns Matriz con el cálculo de la similaridad coseno. 
     */
    cosine_similarity() {
        let normalized_tf = this.normalize_tf();
        let cosine_similarity = [];
        let vector_aux = [];
        let similarity;
        for (let i = 0; i < this.documents.length; i++) {
            for (let j = 0; j < this.documents.length; j++) {
                similarity = 0;
                for (let k = 0; k < this.documents[i].length; k++) {
                    if (this.documents[j].includes(this.documents[i][k])) {
                        let index_document2 = this.documents[j].indexOf(this.documents[i][k]);
                        similarity += normalized_tf[i][k] * normalized_tf[j][index_document2];
                    }
                }
                vector_aux.push(similarity);
            }
            cosine_similarity.push(vector_aux);
            vector_aux = [];
        }
        return cosine_similarity;
    }

    /**
     * Método que devuelve la matriz que contiene un documento en cada una de sus filas.
     * @returns Matriz que almacena un documento por fila.
     */
    get_documents() {
        return this.documents;
    }

    /**
     * Método que devuelve la matriz que contiene la frecuencia de las palabras en cada documento.
     * @returns Matriz con los valores TF.
     */
    get_tf() {
        return this.tf;
    }

    /**
     * Método que devuelve la matriz con los valores IDF de las palabras de cada documento.
     * @returns  Matriz con los valores IDF de las palabras de cada documento.
     */
    get_idf() {
        return this.idf;
    }

    /**
     * Método que devuelve la matriz con los valores TF - IDF para las palabras que aparecen en los documentos.
     * @returns Matriz con los valores TF - IDF para las palabras que aparecen en los documentos.
     */
    get_tf_idf() {
        return this.tf_idf;
    }

    /**
     * Método que devuelve la matriz con la similaridad coseno entre cada par de documentos.
     * @returns Matriz con la similaridad coseno entre cada par de documentos.
     */
    get_cosine_similarity() {
        return this.cosine_similarity;
    }
}
