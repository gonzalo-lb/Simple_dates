export class SDates {
  #day;
  #month;
  #year;
  static #monthsAOD = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor(day = null, month = null, year = null) {
    // Revisa si tiene que hacer una copia de otra instancia
    if (arguments[0] instanceof SDates) {
      const copy = arguments[0];
      this.#day = copy.getDay();
      this.#month = copy.getMonth();
      this.#year = copy.getYear();

      // Si no es copia, establece las variables con los parámetros
    } else {
      this.#year = year;
      this.#month = month;
      this.#day = day;
    }

    // Controla los parámetros. Si están mal establece todo en null
    if (
      this.#parametersOK(this.#day, this.#month, this.#year, "SDates()") !==
      true
    ) {
      this.#year = null;
      this.#month = null;
      this.#day = null;
    }
  } // constructor()

  //#region PRIVATE METHODS

  #parametersOK(_day, _month, _year, callerSTR) {
    // Si todos los parámetros son null --> OK
    if (_day === null && _month === null && _year === null) {
      return true;
    }

    // Revisa que los 3 valores sean integer, y no estén por abajo de 1.
    if (
      Number.isInteger(_year) === false ||
      Number.isInteger(_month) === false ||
      Number.isInteger(_day) === false ||
      //|| _year < 1
      _month < 1 ||
      _day < 1
    ) {
      console.warn(
        `${callerSTR} ERROR: day/month/year must be an Integer.\n day/month values cannot be under 1.`
      );
      return false;
    }

    // Revisa que el mes y día no estén por arriba del máximo
    if (_month > 12) {
      console.warn(`${callerSTR} ERROR: month value cannot be above 12.`);
      return false;
    }
    if (_day > this.#amountOfDaysOfMonth(_month, _year)) {
      console.warn(
        `${callerSTR} ERROR: day value above maximum for this month (${_month}/${_year}).`
      );
      return false;
    }

    return true;
  }

  #isLeapYear(year) {
    // Es bisiesto si es divisible entre cuatro y (no es divisible entre 100 o es divisible entre 400).
    if (this.#esDivisible(year, 4) === false) {
      return false;
    } else if (this.#esDivisible(year, 100) === false) {
      return true;
    } else if (this.#esDivisible(year, 400) === true) {
      return true;
    } else {
      return false;
    }
  }

  #amountOfDaysOfMonth(month, year = null) {
    if (year === null) {
      return SDates.#monthsAOD[month - 1];
    } else {
      if (month === 2 && this.#isLeapYear(year) === true) {
        return 29;
      } else {
        return SDates.#monthsAOD[month - 1];
      }
    }
  }

  #esDivisible(numero, divisiblePor) {
    if (numero % divisiblePor === 0 || numero % divisiblePor === -0) {
      return true;
    } else {
      return false;
    }
  }

  #checkFebDayForLeapYear() {
    if (
      this.#isLeapYear(this.#year) === false &&
      this.#month === 2 &&
      this.#day === 29
    ) {
      this.#day = 28;
    }
  }

  /**
   * Revisa si la cantidad de días no excede la del mes.
   * Si no se corresponde, establede el día el el último de ese mes.
   */
  #checkMonthForAmountOfDays() {
    const diasDeEsteMes = this.#amountOfDaysOfMonth(this.#month, this.#year);
    if (this.#day > diasDeEsteMes) {
      this.#day = diasDeEsteMes;
    }
  }

  //#endregion

  //#region GET METHODS

  /**
   * @returns Number with the day value.
   */
  getDay() {
    return this.#day;
  }

  /**
   * @returns Number with the month value.
   */
  getMonth() {
    return this.#month;
  }

  /**
   * @returns Number with the year value
   */
  getYear() {
    return this.#year;
  }

  /**
   * @returns a string with the date in D/M/YYYY format.
   */
  getFullDate() {
    return `${this.#day}/${this.#month}/${this.#year}`;
  }

  //#endregion

  //#region SET METHODS

  /**
     * Overwrites the day value.
     * @param {Number} day The new *day* value.
       - The parameter must be an integer, greater than 0. 
       - The day entered must be compatible with the month. You could not enter, for example, April 31, or February 29 in a non-leap year.
       - There must be a date set in advance. None of the day/month/year values ​​must be null.
       - In case some value is *null*, the date must be set by setDate()
     */
  setDay(day) {
    // Controla parámetro

    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates() --> setDay(day) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (Number.isInteger(day) === false || day < 1) {
      console.warn(
        "SDates() --> setDay(day) ERROR: day must be an Integer, and the value cannot be under 1."
      );
      return;
    }

    if (day > this.#amountOfDaysOfMonth(this.#month, this.#year)) {
      console.warn(
        `SDates() --> setDay(day) ERROR: day value above maximum for this month (${
          this.#month
        }/${this.#year}).`
      );
      return;
    }

    this.#day = day;
    return true;
  }

  /**
     * Overwrites the month value.
     * @param {Number} month The new *month* value
      -  The parameter has to be an integer, between 1 and 12. 
      -  The month entered must be compatible with the day/year. Could not enter, for example, April, if the day is 31. 
      -  There must be a date set in advance. None of the day/month/year values ​​must be *null*. 
      -  In case some value is *null*, the date must be set by *setDate()*.
     */
  setMonth(month) {
    // Controla parámetro

    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates() --> setMonth(month) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (Number.isInteger(month) === false || month < 1) {
      console.warn(
        "SDates() --> setMonth(month) ERROR: month must be an Integer, and the value cannot be under 1."
      );
      return;
    }

    if (this.#month > 12) {
      console.warn(
        "SDates() --> setMonth(month) ERROR: month value cannot be above 12."
      );
      return;
    }

    if (this.#day > this.#amountOfDaysOfMonth(month, this.#year)) {
      console.warn(
        "SDates() --> setMonth(month) ERROR: month value is not compatible with current day/year."
      );
      return;
    }

    this.#month = month;
    return true;
  }

  /**
     * Overwrites the year value.
     * @param {Number} year The new *year* value.
      -  The parameter must be an integer, greater than 0. 
      -  The entered year must be compatible with the day/month. You could not enter, for example, 2023, if the current date is February 29. 
      -  There must be a date set in advance. None of the day/month/year values ​​must be *null*. 
      -  In case some value is *null*, the date must be set by *setDate()*.
     */
  setYear(year) {
    // Controla parámetro

    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates() --> setYear(year) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (Number.isInteger(year) === false) {
      //|| year < 1) {
      console.warn(
        "SDates() --> setYear(year) ERROR: year must be an Integer."
      );
      return;
    }

    if (this.#day > this.#amountOfDaysOfMonth(this.#month, year)) {
      console.warn(
        "SDates() --> setYear(year) ERROR: year value is not compatible with current day/month."
      );
      return;
    }

    this.#year = year;
    return true;
  }

  /**
   * Overwrites the actual date. All 3 parameters must be integers, greater than 0.
   * @param {Number} day The *day* value has to be within the specific range of the entered month and year.
   * @param {Number} month The *month* value cannot be greater than 12.
   * @param {Number} year
   */
  setDate(day, month, year) {
    if (day === null || month === null || year === null) {
      console.warn(
        "SDates() --> setDate(day, month, year) ERROR: day/month/year cannot be null."
      );
      return;
    }

    if (
      this.#parametersOK(
        day,
        month,
        year,
        `SDates.setDate(${day}, ${month}, ${year})`
      ) === true
    ) {
      this.#day = day;
      this.#month = month;
      this.#year = year;
    }
  }

  //#endregion

  //#region MAIN FUNCTIONALITY

  /**
     * Add the number of years passed as a parameter.
     Then, it checks if the result is 02/29, and if the year is not a leap year, it changes it to 02/28.
     * @param {Number} years Amount of years to add to current date.
      - *years* cannot be less than 1.<br>
      - *years* must be an integer.<br>
      -  There must be a date set in advance. None of the day/month/year values ​​must be *null*.<br>
      -  In case some value is *null*, the date must be set by *setDate()*.
     */
  addYear(years) {
    // Controla el parámetro
    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates() --> addYear(years) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (years === 0) {
      console.warn(`SDates.addYear(${years}): years cannot be 0.`);
      return;
    }

    if (years < 1) {
      console.warn(`SDates.addYear(${years}): years cannot be under 1.`);
      return;
    }

    if (Number.isInteger(years) === false) {
      console.warn(`SDates.addYear(${years}): years must be an integer.`);
      return;
    }

    this.#year += years;

    // Si después de la suma el año NO es biciesto, y quedó en el 29/02, lo pasa a 28/02
    this.#checkFebDayForLeapYear();
  } // _addYear()

  /**
     * Add the number of months to pass as a parameter.
       Then, it checks if the result is 02/29, and if the year is not a leap year, it changes it to 02/28.
       Finally, check that the day is not 31 in a 30-day month. In his case, he changes it to 30.
     * @param {Number} months Amount of months to add to current date.
       - *months* cannot be less than 1<br>
       - *months* must be an integer.<br>
      -  There must be a date set in advance. None of the day/month/year values ​​must be *null*.<br>
      -  In case some value is *null*, the date must be set by *setDate()*.
     */
  addMonth(months) {
    // Controla el parámetro
    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates() --> addMonth(months) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (months === 0) {
      console.warn(`SDates.addMonth(${months}): months cannot be 0.`);
      return;
    }

    if (months < 1) {
      console.warn(`SDates.addMonth(${months}): months cannot be under 1.`);
      return;
    }

    if (Number.isInteger(months) === false) {
      console.warn(`SDates.addMonth(${months}): months must be an integer.`);
      return;
    }

    while (months > 0) {
      // Agrega un mes
      this.#month += 1;

      // Revisa que no se haya pasado de año
      if (this.#month > 12) {
        this.#month = 1;
        this.#year += 1;
      }

      // Resta un mes, de la cantidad total para agregar
      months -= 1;
    }

    // Al finalizar, revisa:
    // - Que no haya quedado un 29 de febrero en un año no biciesto
    // - Que el día no supere la cantidad de días del mes
    this.#checkFebDayForLeapYear();
    this.#checkMonthForAmountOfDays();
  } // _addMonth()

  /**
     * Add the number of days passed as a parameter.
     * @param {*} days Amount of days to add to current date.
       - *days* cannot be less than 1<br>
       - *days* must be an integer.<br>
      -  There must be a date set in advance. None of the day/month/year values ​​must be *null*.<br>
      -  In case some value is *null*, the date must be set by *setDate()*.
     */
  addDay(days) {
    // Controla el parámetro
    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates() --> addDay(days) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (days === 0) {
      console.warn(`SDates.addDay(${days}): days cannot be 0.`);
      return;
    }

    if (days < 1) {
      console.warn(`SDates.addDay(${days}): days cannot be under 1.`);
      return;
    }

    if (Number.isInteger(days) === false) {
      console.warn(`SDates.addDay(${days}): days must be an integer.`);
      return;
    }

    while (days > 0) {
      this.#day += 1;

      // Revisa si se pasó de mes
      if (this.#day > this.#amountOfDaysOfMonth(this.#month, this.#year)) {
        this.#day = 1;
        this.#month += 1;

        // Revisa si se pasó de año
        if (this.#month > 12) {
          this.#month = 1;
          this.#year += 1;
        }
      }

      days -= 1;
    }
  } // _addDay()

  /**
   * Adds the years, months and days passed as parameters, using the order given in *addOrder*
   * @param {*} years Must be an integer
   * @param {*} months Must be an integer
   * @param {*} days Must be an integer
   * @param {*} addOrder Optional. String. Default: "YMD" (Year, Day, Month).
     The other addOrder options are:   
     - "YMD"<br>
     - "YDM"<br>
     - "DYM"<br>
     - "DMY"<br>
     - "MYD"<br>
     - "MDY"
   * @returns Void.
   */
  addYearMonthDay(years = 0, months = 0, days = 0, addOrder = "YMD") {
    // Controla los parámetros
    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates() --> addYearMonthDay(years) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (Number.isInteger(years) === false) {
      console.warn(
        `SDates.addYearMonthDay(years = ${years}): years must be an integer.`
      );
      return;
    }

    if (Number.isInteger(months) === false) {
      console.warn(
        `SDates.addYearMonthDay(months = ${months}): months must be an integer.`
      );
      return;
    }

    if (Number.isInteger(days) === false) {
      console.warn(
        `SDates.addYearMonthDay(days = ${days}): days must be an integer.`
      );
      return;
    }

    if (addOrder === "YMD") {
      years > 0 && this.addYear(years);
      months > 0 && this.addMonth(months);
      days > 0 && this.addDay(days);
    } else if (addOrder === "YDM") {
      years > 0 && this.addYear(years);
      days > 0 && this.addDay(days);
      months > 0 && this.addMonth(months);
    } else if (addOrder === "DMY") {
      days > 0 && this.addDay(days);
      months > 0 && this.addMonth(months);
      years > 0 && this.addYear(years);
    } else if (addOrder === "DYM") {
      days > 0 && this.addDay(days);
      years > 0 && this.addYear(years);
      months > 0 && this.addMonth(months);
    } else if (addOrder === "MYD") {
      months > 0 && this.addMonth(months);
      years > 0 && this.addYear(years);
      days > 0 && this.addDay(days);
    } else if (addOrder === "MDY") {
      months > 0 && this.addMonth(months);
      days > 0 && this.addDay(days);
      years > 0 && this.addYear(years);
    } else {
      console.warn(
        `SDates.addYearMonthDay(addOrder = ${addOrder}): addOrder is not a valid input. Will use default "YMD"`
      );
      years > 0 && this.addYear(years);
      months > 0 && this.addMonth(months);
      days > 0 && this.addDay(days);
    }
  } // addYearMonthDay(...)

  /**
     * Subtracts the number of years passed as a parameter.
       Then, it checks if the result is 02/29, and if the year is not a leap year, it changes it to 02/28.
     * @param {Number} years Amount of years to subtract to current date.
       - *years* cannot be less than 1.
       - *years* must be an integer.<br>
      -  There must be a date set in advance. None of the day/month/year values ​​must be *null*.<br>
      -  In case some value is *null*, the date must be set by *setDate()*.
     */
  subtractYear(years) {
    // Controla el parámetro
    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates() --> subtractYear(years) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (years === 0) {
      console.warn(`SDates.subtractYear(${years}): years cannot be 0.`);
      return;
    }

    if (years < 1) {
      console.warn(`SDates.subtractYear(${years}): years cannot be under 1.`);
      return;
    }

    if (Number.isInteger(years) === false) {
      console.warn(`SDates.subtractYear(${years}): years must be an integer.`);
      return;
    }

    this.#year -= years;

    // Si después de la suma el año NO es biciesto, y quedó en el 29/02, lo pasa a 28/02
    this.#checkFebDayForLeapYear();
  } // _subtractYear()

  /**
     * Subtracts the number of months passed as a parameter.
       Then, it checks if the result is 02/29, and if the year is not a leap year, it changes it to 02/28.
       Finally, check that the day is not 31 in a 30-day month. In his case, he changes it to 30.
     * @param {Number} months Amount of months to subtract to current date.
        - *months* cannot be less than 1.
        - *months* must be an integer.<br>
      -  There must be a date set in advance. None of the day/month/year values ​​must be *null*.<br>
      -  In case some value is *null*, the date must be set by *setDate()*.
     */
  subtractMonth(months) {
    // Controla el parámetro
    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates() --> subtractMonth(months) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (months === 0) {
      console.warn(`SDates.subtractMonth(${months}): months cannot be 0.`);
      return;
    }

    if (months < 1) {
      console.warn(
        `SDates.subtractMonth(${months}): months cannot be under 1.`
      );
      return;
    }

    if (Number.isInteger(months) === false) {
      console.warn(
        `SDates.subtractMonth(${months}): months must be an integer.`
      );
      return;
    }

    while (months > 0) {
      // Agrega un mes
      this.#month -= 1;

      // Revisa que no se haya pasado de año
      if (this.#month < 1) {
        this.#month = 12;
        this.#year -= 1;
      }

      // Resta un mes, de la cantidad total para agregar
      months -= 1;
    }

    // Al finalizar, revisa:
    // - Que no haya quedado un 29 de febrero en un año no biciesto
    // - Que el día no supere la cantidad de días del mes
    this.#checkFebDayForLeapYear();
    this.#checkMonthForAmountOfDays();
  } // _subtractMonth()

  /**
     * Subtracts the number of days passed as a parameter.
     * @param {Number} days Amount of days to subtract to current date.
       - *days* cannot be less than 1.
       - *days* must be an integer.<br>
      -  There must be a date set in advance. None of the day/month/year values ​​must be *null*.<br>
      -  In case some value is *null*, the date must be set by *setDate()*.
     */
  subtractDay(days) {
    // Controla el parámetro
    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates() --> subtractDay(days) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (days === 0) {
      console.warn(`SDates.subtractDay(${days}): days cannot be 0.`);
      return;
    }

    if (days < 1) {
      console.warn(`SDates.subtractDay(${days}): days cannot be under 1.`);
      return;
    }

    if (Number.isInteger(days) === false) {
      console.warn(`SDates.subtractDay(${days}): days must be an integer.`);
      return;
    }

    while (days > 0) {
      this.#day -= 1;

      // Revisa si se pasó de mes
      if (this.#day < 1) {
        // Resta un mes
        this.#month -= 1;
        // Revisa que no se haya pasado de año
        if (this.#month < 1) {
          this.#month = 12;
          this.#year -= 1;
        }

        // Establece el día en el máximo de ese mes
        this.#day = this.#amountOfDaysOfMonth(this.#month, this.#year);
      }

      days -= 1;
    }
  } // _subtractDay()

  /**
     * Compares the current date with the one passed as a parameter.
       This instance cannot have *null* values.
     * @param {SDates} anotherDate Another instance of SDates, with no *null* values.
     * @returns Boolean
       - True: Current date is greater.
       - False: Current date is lower or equal.
     */
  isGreaterThan(anotherDate = new SDates()) {
    // Controla parámetros
    if (anotherDate instanceof SDates === false) {
      console.warn(
        `SDates.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* must be an instance of SDates`
      );
      return;
    }

    if (
      anotherDate.getDay() === null ||
      anotherDate.getMonth() === null ||
      anotherDate.getYear() === null
    ) {
      console.warn(
        `SDates.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* day/month/year cannot have null values.`
      );
      return;
    }

    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates.isGreaterThan() --> ERROR: day/month/year cannot have null values."
      );
      return;
    }

    if (this.#year > anotherDate.getYear()) {
      return true;
    }
    if (this.#year < anotherDate.getYear()) {
      return false;
    }
    if (this.#month > anotherDate.getMonth()) {
      return true;
    }
    if (this.#month < anotherDate.getMonth()) {
      return false;
    }
    if (this.#day > anotherDate.getDay()) {
      return true;
    } else {
      return false;
    }
  } // isGreaterThan()

  /**
     * Compares the current date with the one passed as a parameter.
       This instance cannot have *null* values.
     * @param {*} anotherDate Another instance of SDates, with no *null* values.
     * @returns Boolean
      - True: Both dates a equal.
      - False: The dates are not equal.
     */
  isEqualTo(anotherDate = new SDates()) {
    // Controla parámetros
    if (anotherDate instanceof SDates === false) {
      console.warn(
        `SDates.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* must be an instance of SDates`
      );
      return;
    }

    if (
      anotherDate.getDay() === null ||
      anotherDate.getMonth() === null ||
      anotherDate.getYear() === null
    ) {
      console.warn(
        `SDates.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* day/month/year cannot have null values.`
      );
      return;
    }

    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates.isGreaterThan() --> ERROR: day/month/year cannot have null values."
      );
      return;
    }

    if (
      this.#year === anotherDate.getYear() &&
      this.#month === anotherDate.getMonth() &&
      this.#day === anotherDate.getDay()
    ) {
      return true;
    } else {
      return false;
    }
  } // isEqualTo()

  /**
     * Compares the current date with the one passed as a parameter.
       This instance cannot have *null* values.
     * @param {*} anotherDate Another instance of SDates, with no *null* values.
     * @returns Boolean
      - True: This date is equal or greater than *anotherDate*.
      - False: This date is lower than *anotherDate*.
     */
  isEqualOrGreaterThan(anotherDate = new SDates()) {
    // Controla parámetros
    if (anotherDate instanceof SDates === false) {
      console.warn(
        `SDates.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* must be an instance of SDates`
      );
      return;
    }

    if (
      anotherDate.getDay() === null ||
      anotherDate.getMonth() === null ||
      anotherDate.getYear() === null
    ) {
      console.warn(
        `SDates.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* day/month/year cannot have null values.`
      );
      return;
    }

    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates.isGreaterThan() --> ERROR: day/month/year cannot have null values."
      );
      return;
    }

    if (this.isEqualTo(anotherDate) === true) {
      return true;
    }
    if (this.isGreaterThan(anotherDate) === true) {
      return true;
    } else {
      return false;
    }
  } // isEqualOrGreaterThan()

  /**
     * Compares the current date with the one passed as a parameter.
       This instance cannot have *null* values.
     * @param {*} anotherDate Another instance of SDates, with no *null* values.
     * @returns Boolean
      - True: This date is lower than *anotherDate*.
      - False: This date is equal or greater than *anotherDate*.
     */
  isLowerThan(anotherDate = new SDates()) {
    // Controla parámetros
    if (anotherDate instanceof SDates === false) {
      console.warn(
        `SDates.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* must be an instance of SDates`
      );
      return;
    }

    if (
      anotherDate.getDay() === null ||
      anotherDate.getMonth() === null ||
      anotherDate.getYear() === null
    ) {
      console.warn(
        `SDates.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* day/month/year cannot have null values.`
      );
      return;
    }

    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates.isGreaterThan() --> ERROR: day/month/year cannot have null values."
      );
      return;
    }

    if (this.isEqualOrGreaterThan(anotherDate) === false) {
      return true;
    } else {
      return false;
    }
  }

  /**
     * Compares the current date with the one passed as a parameter.
       This instance cannot have *null* values.
     * @param {*} anotherDate Another instance of SDates, with no *null* values.
     * @returns Boolean
      - True: This date is lower or equal than *anotherDate*.
      - False: This date is greater than *anotherDate*.
     */
  isEqualOrLowerThan(anotherDate = new SDates()) {
    // Controla parámetros
    if (anotherDate instanceof SDates === false) {
      console.warn(
        `SDates.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* must be an instance of SDates`
      );
      return;
    }

    if (
      anotherDate.getDay() === null ||
      anotherDate.getMonth() === null ||
      anotherDate.getYear() === null
    ) {
      console.warn(
        `SDates.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* day/month/year cannot have null values.`
      );
      return;
    }

    if (this.#day === null || this.#month === null || this.#year === null) {
      console.warn(
        "SDates.isGreaterThan() --> ERROR: day/month/year cannot have null values."
      );
      return;
    }

    if (this.isEqualTo(anotherDate) === true) {
      return true;
    }
    if (this.isLowerThan(anotherDate) === true) {
      return true;
    } else {
      return false;
    }
  }

  //#endregion

  //#region OTHER METHODS

  /**
   * @returns Returns a copy of the class instance.
   */
  copy() {
    return new SDates(this);
  } // copy()

  /**
     * Check if the date has not been set yet
     * @returns Boolean
       - True: day/month/year is *null*.
       - False: The date has been set.
     */
  isNull() {
    if (this.#day === null || this.#month === null || this.#year === null) {
      return true;
    } else {
      return false;
    }
  }

  /**
   *
   * @param {String} htmlDate String with the date in YYYY-MM-DD format.
   * @returns An instance of SDates
   */
  static fromHTMLDate(htmlDate = "") {
    if (typeof "asas" !== "string") {
      console.warn(
        `SDates.fromHTMLDate(${htmlDate}) --> ERROR: htmlDate is not a string.`
      );
      return;
    }

    const years = parseInt(htmlDate.substring(0, 4));
    const months = parseInt(htmlDate.substring(5, 7));
    const days = parseInt(htmlDate.substring(8, 10));

    if (
      Number.isInteger(years) === false ||
      Number.isInteger(months) === false ||
      Number.isInteger(days) === false
    ) {
      console.warn(
        `SDates.fromHTMLDate(${htmlDate}) --> ERROR: htmlDate must be a string in format YYYY-MM-DD.`
      );
      return;
    }

    return new SDates(days, months, years);
  }

  //#endregion
} // class SDates()
