# SIMPLE DATES (class)

## **Class instantiation syntax**

> SDates(day, month, year)<br> > `const fecha = new SDates(3, 5, 2019);`<br>

- Los 3 parámetros tienen que ser números enteros, mayores a 0<br>
- El valor del mes no puede ser superior a 12<br>
- El valor del día tiene que estar dentro del rango específico del mes y año ingresados<br>
- En caso error en el ingreso de parámetros, se setean todos en _null_.<br>
- Si la fecha quedó en _null_, solo puede ser seteada mediante _setDate()_

###

> SDates()<br> > `const fecha = new SDates();`<br>

- Es para declarar la variable sin ingresar parámetros.<br>
- Todos los valores van a estar en _null_.
- En este caso la fecha solo puede ser definida mediante el método _setDate()_

###

> SDates(SDates)<br>
> Hace una copia de la instancia de la class ingresada como parámetro.<br> > `const fecha = new SDates(3, 5, 2019);`<br> > `const fechaCopy = new SDates(fecha);`

# MAIN CLASS METHODS

## **addYear(years)**

> Agrega la cantidad de años que se pasen como parámetro.<br>
> Luego, revisa si el resultado es 29/02, y si el año no es biciesto, lo cambia a 28/02.<br>

- _years_ no puede ser menor a 1<br>
- _years_ debe ser un integer.<br>
- Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser _null_<br>
- En caso de que algún valor sea _null_, la fecha debe ser seteada mediante _setDate()_

## **addMonth(months)**

> Agrega la cantidad de meses que se pasen como parámetro.<br>
> Luego, revisa si el resultado es 29/02, y si el año no es biciesto, lo cambia a 28/02.<br>
> Por último, revisa que el día no sea 31 en un mes de 30 días. En su caso lo pasa a 30.<br>

- _months_ no puede ser menor a 1<br>
- _months_ debe ser un integer.<br>
- Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser _null_<br>
- En caso de que algún valor sea _null_, la fecha debe ser seteada mediante _setDate()_

## **addDay(days)**

> Agrega la cantidad de días que se pasen como parámetro.<br>

- _days_ no puede ser menor a 1<br>
- _days_ debe ser un integer.<br>
- Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser _null_<br>
- En caso de que algún valor sea _null_, la fecha debe ser seteada mediante _setDate()_

## **addYearMonthDay(years, months, days, addOrder)**

> Suma los años, meses y días pasados como parámetro, en el orden que se le pase a _addOrder_.<br>

- _addOrder_ por defecto es "YMD" (años, meses días).<br>
- Las opciones de addOrder son: "YMD", "YDM", "DYM", "DMY", "MYD", "MDY".<br>
- Si en _addOrder_ se pasa como parámetro algo distinto de las opciones, lo avisa en la consola y utiliza la opción por defecto ("YMD").<br>
- Los años, meses y días tienen que ser un integer mayor a 0. De lo contrario no realiza la suma.<br>
- La función no suma números negativos.

## **subtractYear(years)**

> Resta la cantidad de años que se pasen como parámetro.<br>
> Luego, revisa si el resultado es 29/02, y si el año no es biciesto, lo cambia a 28/02.<br>

- _years_ no puede ser menor a 1<br>
- _years_ debe ser un integer.<br>
- Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser _null_<br>
- En caso de que algún valor sea _null_, la fecha debe ser seteada mediante _setDate()_

## **subtractMonth(months)**

> Resta la cantidad de meses que se pasen como parámetro.<br>
> Luego, revisa si el resultado es 29/02, y si el año no es biciesto, lo cambia a 28/02.<br>
> Por último, revisa que el día no sea 31 en un mes de 30 días. En su caso lo pasa a 30.<br>

- _months_ no puede ser menor a 1<br>
- _months_ debe ser un integer.<br>
- Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser _null_<br>
- En caso de que algún valor sea _null_, la fecha debe ser seteada mediante _setDate()_

## **subtractDay(days)**

> Resta la cantidad de días que se pasen como parámetro.<br>

- _days_ no puede ser menor a 1<br>
- _days_ debe ser un integer.<br>
- Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser _null_<br>
- En caso de que algún valor sea _null_, la fecha debe ser seteada mediante _setDate()_

## **subtractYearMonthDay(years, months, days, subtractOrder)**

> Resta los años, meses y días pasados como parámetro, en el orden que se le pase a _subtractOrder_.<br>

- _subtractOrder_ por defecto es "YMD" (años, meses días).<br>
- Las opciones de subtractOrder son: "YMD", "YDM", "DYM", "DMY", "MYD", "MDY".<br>
- Si en _subtractOrder_ se pasa como parámetro algo distinto de las opciones, lo avisa en la consola y utiliza la opción por defecto ("YMD").<br>
- Los años, meses y días tienen que ser un integer mayor a 0. De lo contrario no realiza la resta.<br>
- La función no resta números negativos.

# COMPARE METHODS

## **isGreaterThan(anotherDate)**

> Compara la fecha con la que se pasó como parámetro.<br>
> Devuelve _true_ si la fecha es mayor a _anotherDate_<br>
> Devuelve _false_ si la fecha es menor o igual a _anotherDate_<br>

- _anotherDate_ debe ser otra instancia de SDates<br>
- Ninguno de los valores de _anotherDate_ o de esta instancia deben ser _null_<br>

## **isEqualOrGreaterThan(anotherDate)**

> Compara la fecha con la que se pasó como parámetro.<br>
> Devuelve _true_ si la fecha es mayor o igual a _anotherDate_<br>
> Devuelve _false_ si la fecha es menor a _anotherDate_<br>

- _anotherDate_ debe ser otra instancia de SDates<br>
- Ninguno de los valores de _anotherDate_ o de esta instancia deben ser _null_<br>

## **isEqualTo(anotherDate)**

> Compara la fecha con la que se pasó como parámetro.<br>
> Devuelve _true_ si ambas fechas son iguales<br>
> Devuelve _false_ si las fechas son distintas<br>

- _anotherDate_ debe ser otra instancia de SDates<br>
- Ninguno de los valores de _anotherDate_ o de esta instancia deben ser _null_<br>

## **isLowerThan(anotherDate)**

> Compara la fecha con la que se pasó como parámetro.<br>
> Devuelve _true_ si la fecha es menor a _anotherDate_<br>
> Devuelve _false_ si la fecha es mayor o igual a _anotherDate_<br>

- _anotherDate_ debe ser otra instancia de SDates<br>
- Ninguno de los valores de _anotherDate_ o de esta instancia deben ser _null_<br>

## **isEqualOrLowerThan(anotherDate)**

> Compara la fecha con la que se pasó como parámetro.<br>
> Devuelve _true_ si la fecha es menor o igual a _anotherDate_<br>
> Devuelve _false_ si la fecha es mayor a _anotherDate_<br>

- _anotherDate_ debe ser otra instancia de SDates<br>
- Ninguno de los valores de _anotherDate_ o de esta instancia deben ser _null_<br>

# OTHER METHODS

## **copy()**

> Devuelve una copia de la instancia de la class.<br>
> Ej.:<br> > `const fecha = new SDates(22, 2, 2024);`<br> > `const otraFecha = fecha._copy();`<br>

## **isNull()**

> Revisa si la fecha aún no fue seteada.<br>
> Devuelve un boolean<br>

- True: /day/month/year es _null_.<br>
- False: La fecha ya fue seteada.<br>

## **fromHTMLDate(htmlDate)**

> Toma la fecha en formato HTML input-date y lo pasa a una instancia de SDates.<br>

- _htmlDate_: String con la fecha en formato YYYY-MM-DD.<br>

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
- Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser _null_<br>
- En caso de que algún valor sea _null_, la fecha debe ser seteada mediante _setDate()_

## **setMonth(month)**

> Setea/sobreescribe el mes de la fecha actual.<br>

- El parámetro tiene que ser un número entero, entre 1 y 12<br>
- El mes ingresado debe ser compatible con el día/año. No podría ingresarse, por ejemplo, abril, si el día es el 31<br>
- Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser _null_<br>
- En caso de que algún valor sea _null_, la fecha debe ser seteada mediante _setDate()_

## **setYear(year)**

> Setea/sobreescribe el año de la fecha actual.<br>

- El parámetro tiene que ser un número entero, mayor a 0<br>
- El año ingresado debe ser compatible con el día/mes. No podría ingresarse, por ejemplo, 2023, si la fecha actual es 29 de febrero<br>
- Debe haber una fecha seteada de antemano. Ninguno de los valores día/mes/año deben ser _null_<br>
- En caso de que algún valor sea _null_, la fecha debe ser seteada mediante _setDate()_
