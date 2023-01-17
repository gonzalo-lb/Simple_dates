# SIMPLE DATES (class)

## **Class instantiation syntax**

> SDates(day, month, year)<br>
`const fecha = new SDates(3, 5, 2019);`<br>
 - Los 3 parámetros tienen que ser números enteros, mayores a 0<br>
 - El valor del mes no puede ser superior a 12<br>
 - El valor del día tiene que estar dentro del rango específico del mes y año ingresados<br>
 - En caso error en el ingreso de parámetros, se setean todos en *null*.<br>
 - Si la fecha quedó en *null*, solo puede ser seteada mediante *setDate()*
###
> SDates()<br>
`const fecha = new SDates();`<br>
 - Es para declarar la variable sin ingresar parámetros.<br>
 - Todos los valores van a estar en *null*.
 - En este caso la fecha solo puede ser definida mediante el método *setDate()*
### 
> SDates(SDates)<br>
Hace una copia de la instancia de la class ingresada como parámetro.<br>
`const fecha = new SDates(3, 5, 2019);`<br>
`const fechaCopy = new SDates(fecha);`

# MAIN CLASS METHODS

## **addYear(years)**

> Agrega la cantidad de años que se pasen como parámetro.<br>
Luego, revisa si el resultado es 29/02, y si el año no es biciesto, lo cambia a 28/02.<br>
 - *years* no puede ser menor a 1<br>
 - *years* debe ser un integer.<br>
 - Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser *null*<br>
 - En caso de que algún valor sea *null*, la fecha debe ser seteada mediante *setDate()*

## **addMonth(months)**

> Agrega la cantidad de meses que se pasen como parámetro.<br>
Luego, revisa si el resultado es 29/02, y si el año no es biciesto, lo cambia a 28/02.<br>
Por último, revisa que el día no sea 31 en un mes de 30 días. En su caso lo pasa a 30.<br>
 - *months* no puede ser menor a 1<br>
 - *months* debe ser un integer.<br>
 - Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser *null*<br>
 - En caso de que algún valor sea *null*, la fecha debe ser seteada mediante *setDate()*

## **addDay(days)**

> Agrega la cantidad de días que se pasen como parámetro.<br>
 - *days* no puede ser menor a 1<br>
 - *days* debe ser un integer.<br>
 - Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser *null*<br>
 - En caso de que algún valor sea *null*, la fecha debe ser seteada mediante *setDate()*

## **subtractYear(years)**

> Resta la cantidad de años que se pasen como parámetro.<br>
Luego, revisa si el resultado es 29/02, y si el año no es biciesto, lo cambia a 28/02.<br>
 - *years* no puede ser menor a 1<br>
 - *years* debe ser un integer.<br>
 - Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser *null*<br>
 - En caso de que algún valor sea *null*, la fecha debe ser seteada mediante *setDate()*

## **subtractMonth(months)**

> Resta la cantidad de meses que se pasen como parámetro.<br>
Luego, revisa si el resultado es 29/02, y si el año no es biciesto, lo cambia a 28/02.<br>
Por último, revisa que el día no sea 31 en un mes de 30 días. En su caso lo pasa a 30.<br>
 - *months* no puede ser menor a 1<br>
 - *months* debe ser un integer.<br>
 - Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser *null*<br>
 - En caso de que algún valor sea *null*, la fecha debe ser seteada mediante *setDate()*

## **subtractDay(days)**

> Resta la cantidad de días que se pasen como parámetro.<br>
 - *days* no puede ser menor a 1<br>
 - *days* debe ser un integer.<br>
 - Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser *null*<br>
 - En caso de que algún valor sea *null*, la fecha debe ser seteada mediante *setDate()*

# COMPARE METHODS

## **isGreaterThan(anotherDate)**

> Compara la fecha con la que se pasó como parámetro.<br>
Devuelve *true* si la fecha es mayor a *anotherDate*<br>
Devuelve *false* si la fecha es menor o igual a *anotherDate*<br>
 - *anotherDate* debe ser otra instancia de SDates<br>
 - Ninguno de los valores de *anotherDate* o de esta instancia deben ser *null*<br>

## **isEqualOrGreaterThan(anotherDate)**

> Compara la fecha con la que se pasó como parámetro.<br>
Devuelve *true* si la fecha es mayor o igual a *anotherDate*<br>
Devuelve *false* si la fecha es menor a *anotherDate*<br>
 - *anotherDate* debe ser otra instancia de SDates<br>
 - Ninguno de los valores de *anotherDate* o de esta instancia deben ser *null*<br>

## **isEqualTo(anotherDate)**

> Compara la fecha con la que se pasó como parámetro.<br>
Devuelve *true* si ambas fechas son iguales<br>
Devuelve *false* si las fechas son distintas<br>
 - *anotherDate* debe ser otra instancia de SDates<br>
 - Ninguno de los valores de *anotherDate* o de esta instancia deben ser *null*<br>

## **isLowerThan(anotherDate)**

> Compara la fecha con la que se pasó como parámetro.<br>
Devuelve *true* si la fecha es menor a *anotherDate*<br>
Devuelve *false* si la fecha es mayor o igual a *anotherDate*<br>
 - *anotherDate* debe ser otra instancia de SDates<br>
 - Ninguno de los valores de *anotherDate* o de esta instancia deben ser *null*<br>

## **isEqualOrLowerThan(anotherDate)**

> Compara la fecha con la que se pasó como parámetro.<br>
Devuelve *true* si la fecha es menor o igual a *anotherDate*<br>
Devuelve *false* si la fecha es mayor a *anotherDate*<br>
 - *anotherDate* debe ser otra instancia de SDates<br>
 - Ninguno de los valores de *anotherDate* o de esta instancia deben ser *null*<br>

# OTHER METHODS

## **copy()**

> Devuelve una copia de la instancia de la class.<br>
Ej.:<br>
`const fecha = new SDates(22, 2, 2024);`<br>
`const otraFecha = fecha._copy();`<br>

## **isNull()**

> Revisa si la fecha aún no fue seteada.<br>
Devuelve un boolean<br>
 - True: /day/month/year es *null*.<br>
 - False: La fecha ya fue seteada.<br>

## **fromHTMLDate(htmlDate)**

> Toma la fecha en formato HTML input-date y lo pasa a una instancia de SDates.<br>
 - *htmlDate*: String con la fecha en formato YYYY-MM-DD.<br>

# GET METHODS

## **getFullDate()**

> Devuelve un string con la fecha en formato D/M/AAAA.

## **getDay()**

> Devuelve un Number con el día.<br>

## **getMonth()**

> Devuelve un Number con el mes.<br>

## **getYear()**

> Devuelve un Number con el año.<br>

# SET METHODS

## **setDate(day, month, year)**

> Setea/sobreescribe la fecha actual.<br>
 - Los 3 parámetros tienen que ser números enteros, mayores a 0<br>
 - El valor del mes no puede ser superior a 12<br>
 - El valor del día tiene que estar dentro del rango específico del mes y año ingresados<br> 

 ## **setDay(day)**

> Setea/sobreescribe el día de la fecha actual.<br>
 - El parámetro tiene que ser un número entero, mayor a 0<br>
 - El día ingresado debe ser compatible con el mes. No podría ingresarse, por ejemplo, 31 de abril, o 29 de febrero en un año no biciesto<br>
 - Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser *null*<br>
 - En caso de que algún valor sea *null*, la fecha debe ser seteada mediante *setDate()*

 ## **setMonth(month)**

> Setea/sobreescribe el mes de la fecha actual.<br>
 - El parámetro tiene que ser un número entero, entre 1 y 12<br>
 - El mes ingresado debe ser compatible con el día/año. No podría ingresarse, por ejemplo, abril, si el día es el 31<br>
 - Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser *null*<br>
 - En caso de que algún valor sea *null*, la fecha debe ser seteada mediante *setDate()*

 ## **setYear(year)**

> Setea/sobreescribe el año de la fecha actual.<br>
 - El parámetro tiene que ser un número entero, mayor a 0<br>
 - El año ingresado debe ser compatible con el día/mes. No podría ingresarse, por ejemplo, 2023, si la fecha actual es 29 de febrero<br>
 - Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser *null*<br>
 - En caso de que algún valor sea *null*, la fecha debe ser seteada mediante *setDate()*
