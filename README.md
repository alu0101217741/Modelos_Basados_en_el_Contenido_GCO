# Gestión del Conocimiento en las organizaciones
## Sistemas de recomendación. Modelos Basados en el Contenido
### Autor: Alberto Mendoza Rodríguez (alu0101217741@ull.edu.es)

<p align="center">
  <br>
  Acceda al sistema de recomendación: <a href="https://alu0101217741.github.io/Modelos_Basados_en_el_Contenido_GCO/">https://alu0101217741.github.io/Modelos_Basados_en_el_Contenido_GCO/</a>
  <br>
</p>


## 1. Introducción

Este repositorio incluye el código fuente que implementa un sistema de recomendación siguiendo el modelo basado en contenido. Gran parte de estos modelos se aplican al campo de la recomendación de documentos con información textual. De esta forma el contenido de los ítems se representa a través de documentos en los que se incluyen descripciones textuales de sus características básicas.

Para desarrollar el sistema de recomendación se han utilizado los lenguajes de programación **HTML**, **CSS** y  **JavaScript** de forma que el usuario puede introducir a través de una página web el fichero que se analizará empleando el sistema desarrollado, y así obtener los resultados en la pantalla de su navegador. Cabe destacar que para establecer el estilo de la página también se ha empleado el framework de CSS  [Materialize](https://materializecss.com/).

## 2. Estructura de directorios

El sistema de recomendación se encuentra dentro de **docs** que incluye los siguientes directorios y ficheros:

* **css**: Almacena la hoja de estilo **style.css** para definir la presentación para el documento escrito en HTML.
* **examples-documents**: Incluye diferentes ejemplos de documentos con los que se puede comprobar el correcto funcionamiento del programa.
* **src**: Almacena los siguientes ficheros con código JavaScript:

  * **form.js**: Permite gestionar el formulario donde el usuario debe introducir el documento y hace posible mostrar los resultados.

  * **recommender.js**: Se define la clase **Recommender** que implementa el sistema de recomendación siguiendo el modelo basados en el contenido, de forma que calcula la frecuencia de las palabras en cada uno de los documentos (valores TF), los valores IDF de las palabras de cada documento, el valor TF - IDF para cada una de las palabras y la similaridad coseno entre cada par de documentos.




