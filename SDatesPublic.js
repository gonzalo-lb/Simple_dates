export class SDatesPublic {
  _day;
  _month;
  _year;
  static _monthsAOD = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor(day = null, month = null, year = null) {
    // Revisa si tiene que hacer una copia de otra instancia
    if (arguments[0] instanceof SDatesPublic) {
      const copy = arguments[0];
      this._day = copy.getDay();
      this._month = copy.getMonth();
      this._year = copy.getYear();

      // Si no es copia, establece las variables con los parámetros
    } else {
      this._year = year;
      this._month = month;
      this._day = day;
    }

    // Controla los parámetros. Si están mal establece todo en null
    if (
      this._parametersOK(
        this._day,
        this._month,
        this._year,
        "SDatesPublic()"
      ) !== true
    ) {
      this._year = null;
      this._month = null;
      this._day = null;
    }
  } // constructor()

  //#region PRIVATE METHODS

  _parametersOK(_day, _month, _year, callerSTR) {
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
    if (_day > this._amountOfDaysOfMonth(_month, _year)) {
      console.warn(
        `${callerSTR} ERROR: day value above maximum for this month (${_month}/${_year}).`
      );
      return false;
    }

    return true;
  }

  _isLeapYear(year) {
    // Es bisiesto si es divisible entre cuatro y (no es divisible entre 100 o es divisible entre 400).
    if (this._esDivisible(year, 4) === false) {
      return false;
    } else if (this._esDivisible(year, 100) === false) {
      return true;
    } else if (this._esDivisible(year, 400) === true) {
      return true;
    } else {
      return false;
    }
  }

  _amountOfDaysOfMonth(month, year = null) {
    if (year === null) {
      return SDatesPublic._monthsAOD[month - 1];
    } else {
      if (month === 2 && this._isLeapYear(year) === true) {
        return 29;
      } else {
        return SDatesPublic._monthsAOD[month - 1];
      }
    }
  }

  _esDivisible(numero, divisiblePor) {
    if (numero % divisiblePor === 0 || numero % divisiblePor === -0) {
      return true;
    } else {
      return false;
    }
  }

  _checkFebDayForLeapYear() {
    if (
      this._isLeapYear(this._year) === false &&
      this._month === 2 &&
      this._day === 29
    ) {
      this._day = 28;
    }
  }

  /**
   * Revisa si la cantidad de días no excede la del mes.
   * Si no se corresponde, establede el día el el último de ese mes.
   */
  _checkMonthForAmountOfDays() {
    const diasDeEsteMes = this._amountOfDaysOfMonth(this._month, this._year);
    if (this._day > diasDeEsteMes) {
      this._day = diasDeEsteMes;
    }
  }

  //#endregion

  //#region GET METHODS

  /**
   * @returns Number with the day value.
   */
  getDay() {
    return this._day;
  }

  /**
   * @returns Number with the month value.
   */
  getMonth() {
    return this._month;
  }

  /**
   * @returns Number with the year value
   */
  getYear() {
    return this._year;
  }

  /**
   * @returns a string with the date in D/M/YYYY format.
   */
  getFullDate() {
    return `${this._day}/${this._month}/${this._year}`;
  }

  /**
   * Creates an instance of the JavaScript Date class, and returns it with the current SDate information
   * @returns An instance of a Date class
   */
  asJSDate() {
    return new Date(this.getYear(), this.getMonth() - 1, this.getDay());
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

    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic() --> setDay(day) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (Number.isInteger(day) === false || day < 1) {
      console.warn(
        "SDatesPublic() --> setDay(day) ERROR: day must be an Integer, and the value cannot be under 1."
      );
      return;
    }

    if (day > this._amountOfDaysOfMonth(this._month, this._year)) {
      console.warn(
        `SDatesPublic() --> setDay(day) ERROR: day value above maximum for this month (${this._month}/${this._year}).`
      );
      return;
    }

    this._day = day;
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

    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic() --> setMonth(month) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (Number.isInteger(month) === false || month < 1) {
      console.warn(
        "SDatesPublic() --> setMonth(month) ERROR: month must be an Integer, and the value cannot be under 1."
      );
      return;
    }

    if (this._month > 12) {
      console.warn(
        "SDatesPublic() --> setMonth(month) ERROR: month value cannot be above 12."
      );
      return;
    }

    if (this._day > this._amountOfDaysOfMonth(month, this._year)) {
      console.warn(
        "SDatesPublic() --> setMonth(month) ERROR: month value is not compatible with current day/year."
      );
      return;
    }

    this._month = month;
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

    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic() --> setYear(year) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (Number.isInteger(year) === false) {
      //|| year < 1) {
      console.warn(
        "SDatesPublic() --> setYear(year) ERROR: year must be an Integer."
      );
      return;
    }

    if (this._day > this._amountOfDaysOfMonth(this._month, year)) {
      console.warn(
        "SDatesPublic() --> setYear(year) ERROR: year value is not compatible with current day/month."
      );
      return;
    }

    this._year = year;
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
        "SDatesPublic() --> setDate(day, month, year) ERROR: day/month/year cannot be null."
      );
      return;
    }

    if (
      this._parametersOK(
        day,
        month,
        year,
        `SDatesPublic.setDate(${day}, ${month}, ${year})`
      ) === true
    ) {
      this._day = day;
      this._month = month;
      this._year = year;
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
    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic() --> addYear(years) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (years === 0) {
      console.warn(`SDatesPublic.addYear(${years}): years cannot be 0.`);
      return;
    }

    if (years < 1) {
      console.warn(`SDatesPublic.addYear(${years}): years cannot be under 1.`);
      return;
    }

    if (Number.isInteger(years) === false) {
      console.warn(`SDatesPublic.addYear(${years}): years must be an integer.`);
      return;
    }

    this._year += years;

    // Si después de la suma el año NO es biciesto, y quedó en el 29/02, lo pasa a 28/02
    this._checkFebDayForLeapYear();
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
    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic() --> addMonth(months) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (months === 0) {
      console.warn(`SDatesPublic.addMonth(${months}): months cannot be 0.`);
      return;
    }

    if (months < 1) {
      console.warn(
        `SDatesPublic.addMonth(${months}): months cannot be under 1.`
      );
      return;
    }

    if (Number.isInteger(months) === false) {
      console.warn(
        `SDatesPublic.addMonth(${months}): months must be an integer.`
      );
      return;
    }

    while (months > 0) {
      // Agrega un mes
      this._month += 1;

      // Revisa que no se haya pasado de año
      if (this._month > 12) {
        this._month = 1;
        this._year += 1;
      }

      // Resta un mes, de la cantidad total para agregar
      months -= 1;
    }

    // Al finalizar, revisa:
    // - Que no haya quedado un 29 de febrero en un año no biciesto
    // - Que el día no supere la cantidad de días del mes
    this._checkFebDayForLeapYear();
    this._checkMonthForAmountOfDays();
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
    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic() --> addDay(days) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (days === 0) {
      console.warn(`SDatesPublic.addDay(${days}): days cannot be 0.`);
      return;
    }

    if (days < 1) {
      console.warn(`SDatesPublic.addDay(${days}): days cannot be under 1.`);
      return;
    }

    if (Number.isInteger(days) === false) {
      console.warn(`SDatesPublic.addDay(${days}): days must be an integer.`);
      return;
    }

    while (days > 0) {
      this._day += 1;

      // Revisa si se pasó de mes
      if (this._day > this._amountOfDaysOfMonth(this._month, this._year)) {
        this._day = 1;
        this._month += 1;

        // Revisa si se pasó de año
        if (this._month > 12) {
          this._month = 1;
          this._year += 1;
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
    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic() --> addYearMonthDay(years) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (Number.isInteger(years) === false) {
      console.warn(
        `SDatesPublic.addYearMonthDay(years = ${years}): years must be an integer.`
      );
      return;
    }

    if (Number.isInteger(months) === false) {
      console.warn(
        `SDatesPublic.addYearMonthDay(months = ${months}): months must be an integer.`
      );
      return;
    }

    if (Number.isInteger(days) === false) {
      console.warn(
        `SDatesPublic.addYearMonthDay(days = ${days}): days must be an integer.`
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
        `SDatesPublic.addYearMonthDay(addOrder = ${addOrder}): addOrder is not a valid input. Will use default "YMD"`
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
    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic() --> subtractYear(years) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (years === 0) {
      console.warn(`SDatesPublic.subtractYear(${years}): years cannot be 0.`);
      return;
    }

    if (years < 1) {
      console.warn(
        `SDatesPublic.subtractYear(${years}): years cannot be under 1.`
      );
      return;
    }

    if (Number.isInteger(years) === false) {
      console.warn(
        `SDatesPublic.subtractYear(${years}): years must be an integer.`
      );
      return;
    }

    this._year -= years;

    // Si después de la suma el año NO es biciesto, y quedó en el 29/02, lo pasa a 28/02
    this._checkFebDayForLeapYear();
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
    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic() --> subtractMonth(months) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (months === 0) {
      console.warn(
        `SDatesPublic.subtractMonth(${months}): months cannot be 0.`
      );
      return;
    }

    if (months < 1) {
      console.warn(
        `SDatesPublic.subtractMonth(${months}): months cannot be under 1.`
      );
      return;
    }

    if (Number.isInteger(months) === false) {
      console.warn(
        `SDatesPublic.subtractMonth(${months}): months must be an integer.`
      );
      return;
    }

    while (months > 0) {
      // Agrega un mes
      this._month -= 1;

      // Revisa que no se haya pasado de año
      if (this._month < 1) {
        this._month = 12;
        this._year -= 1;
      }

      // Resta un mes, de la cantidad total para agregar
      months -= 1;
    }

    // Al finalizar, revisa:
    // - Que no haya quedado un 29 de febrero en un año no biciesto
    // - Que el día no supere la cantidad de días del mes
    this._checkFebDayForLeapYear();
    this._checkMonthForAmountOfDays();
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
    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic() --> subtractDay(days) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (days === 0) {
      console.warn(`SDatesPublic.subtractDay(${days}): days cannot be 0.`);
      return;
    }

    if (days < 1) {
      console.warn(
        `SDatesPublic.subtractDay(${days}): days cannot be under 1.`
      );
      return;
    }

    if (Number.isInteger(days) === false) {
      console.warn(
        `SDatesPublic.subtractDay(${days}): days must be an integer.`
      );
      return;
    }

    while (days > 0) {
      this._day -= 1;

      // Revisa si se pasó de mes
      if (this._day < 1) {
        // Resta un mes
        this._month -= 1;
        // Revisa que no se haya pasado de año
        if (this._month < 1) {
          this._month = 12;
          this._year -= 1;
        }

        // Establece el día en el máximo de ese mes
        this._day = this._amountOfDaysOfMonth(this._month, this._year);
      }

      days -= 1;
    }
  } // _subtractDay()

  /**
   * Subtracts the years, months and days passed as parameters, using the order given in *subtractOrder*
   * @param {*} years Must be an integer
   * @param {*} months Must be an integer
   * @param {*} days Must be an integer
   * @param {*} subtractOrder Optional. String. Default: "YMD" (Year, Day, Month).
     The other subtractOrder options are:   
     - "YMD"<br>
     - "YDM"<br>
     - "DYM"<br>
     - "DMY"<br>
     - "MYD"<br>
     - "MDY"
   * @returns Void.
   */
  subtractYearMonthDay(years = 0, months = 0, days = 0, subtractOrder = "YMD") {
    // Controla los parámetros
    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic() --> subtractYearMonthDay(years) ERROR: day/month/year is null. Use setDate()."
      );
      return;
    }

    if (Number.isInteger(years) === false) {
      console.warn(
        `SDatesPublic.subtractYearMonthDay(years = ${years}): years must be an integer.`
      );
      return;
    }

    if (Number.isInteger(months) === false) {
      console.warn(
        `SDatesPublic.subtractYearMonthDay(months = ${months}): months must be an integer.`
      );
      return;
    }

    if (Number.isInteger(days) === false) {
      console.warn(
        `SDatesPublic.subtractYearMonthDay(days = ${days}): days must be an integer.`
      );
      return;
    }

    if (subtractOrder === "YMD") {
      years > 0 && this.subtractYear(years);
      months > 0 && this.subtractMonth(months);
      days > 0 && this.subtractDay(days);
    } else if (subtractOrder === "YDM") {
      years > 0 && this.subtractYear(years);
      days > 0 && this.subtractDay(days);
      months > 0 && this.subtractMonth(months);
    } else if (subtractOrder === "DMY") {
      days > 0 && this.subtractDay(days);
      months > 0 && this.subtractMonth(months);
      years > 0 && this.subtractYear(years);
    } else if (subtractOrder === "DYM") {
      days > 0 && this.subtractDay(days);
      years > 0 && this.subtractYear(years);
      months > 0 && this.subtractMonth(months);
    } else if (subtractOrder === "MYD") {
      months > 0 && this.subtractMonth(months);
      years > 0 && this.subtractYear(years);
      days > 0 && this.subtractDay(days);
    } else if (subtractOrder === "MDY") {
      months > 0 && this.subtractMonth(months);
      days > 0 && this.subtractDay(days);
      years > 0 && this.subtractYear(years);
    } else {
      console.warn(
        `SDatesPublic.subtractYearMonthDay(subtractOrder = ${subtractOrder}): subtractOrder is not a valid input. Will use default "YMD"`
      );
      years > 0 && this.subtractYear(years);
      months > 0 && this.subtractMonth(months);
      days > 0 && this.subtractDay(days);
    }
  } // subtractYearMonthDay(...)

  /**
     * Compares the current date with the one passed as a parameter.
       This instance cannot have *null* values.
     * @param {SDatesPublic} anotherDate Another instance of SDatesPublic, with no *null* values.
     * @returns Boolean
       - True: Current date is greater.
       - False: Current date is lower or equal.
     */
  isGreaterThan(anotherDate = new SDatesPublic()) {
    // Controla parámetros
    if (anotherDate instanceof SDatesPublic === false) {
      console.warn(
        `SDatesPublic.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* must be an instance of SDatesPublic`
      );
      return;
    }

    if (
      anotherDate.getDay() === null ||
      anotherDate.getMonth() === null ||
      anotherDate.getYear() === null
    ) {
      console.warn(
        `SDatesPublic.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* day/month/year cannot have null values.`
      );
      return;
    }

    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic.isGreaterThan() --> ERROR: day/month/year cannot have null values."
      );
      return;
    }

    if (this._year > anotherDate.getYear()) {
      return true;
    }
    if (this._year < anotherDate.getYear()) {
      return false;
    }
    if (this._month > anotherDate.getMonth()) {
      return true;
    }
    if (this._month < anotherDate.getMonth()) {
      return false;
    }
    if (this._day > anotherDate.getDay()) {
      return true;
    } else {
      return false;
    }
  } // isGreaterThan()

  /**
     * Compares the current date with the one passed as a parameter.
       This instance cannot have *null* values.
     * @param {*} anotherDate Another instance of SDatesPublic, with no *null* values.
     * @returns Boolean
      - True: Both dates a equal.
      - False: The dates are not equal.
     */
  isEqualTo(anotherDate = new SDatesPublic()) {
    // Controla parámetros
    if (anotherDate instanceof SDatesPublic === false) {
      console.warn(
        `SDatesPublic.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* must be an instance of SDatesPublic`
      );
      return;
    }

    if (
      anotherDate.getDay() === null ||
      anotherDate.getMonth() === null ||
      anotherDate.getYear() === null
    ) {
      console.warn(
        `SDatesPublic.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* day/month/year cannot have null values.`
      );
      return;
    }

    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic.isGreaterThan() --> ERROR: day/month/year cannot have null values."
      );
      return;
    }

    if (
      this._year === anotherDate.getYear() &&
      this._month === anotherDate.getMonth() &&
      this._day === anotherDate.getDay()
    ) {
      return true;
    } else {
      return false;
    }
  } // isEqualTo()

  /**
     * Compares the current date with the one passed as a parameter.
       This instance cannot have *null* values.
     * @param {*} anotherDate Another instance of SDatesPublic, with no *null* values.
     * @returns Boolean
      - True: This date is equal or greater than *anotherDate*.
      - False: This date is lower than *anotherDate*.
     */
  isEqualOrGreaterThan(anotherDate = new SDatesPublic()) {
    // Controla parámetros
    if (anotherDate instanceof SDatesPublic === false) {
      console.warn(
        `SDatesPublic.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* must be an instance of SDatesPublic`
      );
      return;
    }

    if (
      anotherDate.getDay() === null ||
      anotherDate.getMonth() === null ||
      anotherDate.getYear() === null
    ) {
      console.warn(
        `SDatesPublic.isEqualOrGreaterThan(${anotherDate}) --> ERROR: *anotherDate* day/month/year cannot have null values.`
      );
      return;
    }

    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic.isEqualOrGreaterThan() --> ERROR: day/month/year cannot have null values."
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
     * @param {*} anotherDate Another instance of SDatesPublic, with no *null* values.
     * @returns Boolean
      - True: This date is lower than *anotherDate*.
      - False: This date is equal or greater than *anotherDate*.
     */
  isLowerThan(anotherDate = new SDatesPublic()) {
    // Controla parámetros
    if (anotherDate instanceof SDatesPublic === false) {
      console.warn(
        `SDatesPublic.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* must be an instance of SDatesPublic`
      );
      return;
    }

    if (
      anotherDate.getDay() === null ||
      anotherDate.getMonth() === null ||
      anotherDate.getYear() === null
    ) {
      console.warn(
        `SDatesPublic.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* day/month/year cannot have null values.`
      );
      return;
    }

    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic.isGreaterThan() --> ERROR: day/month/year cannot have null values."
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
     * @param {*} anotherDate Another instance of SDatesPublic, with no *null* values.
     * @returns Boolean
      - True: This date is lower or equal than *anotherDate*.
      - False: This date is greater than *anotherDate*.
     */
  isEqualOrLowerThan(anotherDate = new SDatesPublic()) {
    // Controla parámetros
    if (anotherDate instanceof SDatesPublic === false) {
      console.warn(
        `SDatesPublic.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* must be an instance of SDatesPublic`
      );
      return;
    }

    if (
      anotherDate.getDay() === null ||
      anotherDate.getMonth() === null ||
      anotherDate.getYear() === null
    ) {
      console.warn(
        `SDatesPublic.isGreaterThan(${anotherDate}) --> ERROR: *anotherDate* day/month/year cannot have null values.`
      );
      return;
    }

    if (this._day === null || this._month === null || this._year === null) {
      console.warn(
        "SDatesPublic.isGreaterThan() --> ERROR: day/month/year cannot have null values."
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
    return new SDatesPublic(this);
  } // copy()

  /**
     * Check if the date has not been set yet
     * @returns Boolean
       - True: day/month/year is *null*.
       - False: The date has been set.
     */
  isNull() {
    if (this._day === null || this._month === null || this._year === null) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Controla si la fecha tiene formato YYYY-MM-DD, y si sus valores constituyen una fecha válida
   * @param {String} htmlDate String with the date in YYYY-MM-DD format.
   * @returns {Object} {isValid:Boolean, errorMsg:String} (si es false, indica el motivo en la consola)
   */
  static isValidHTMLDate(htmlDate = null) {
    function isNumberInStringFormatOf1Digit(inputString) {
      if (
        inputString === "0" ||
        inputString === "1" ||
        inputString === "2" ||
        inputString === "3" ||
        inputString === "4" ||
        inputString === "5" ||
        inputString === "6" ||
        inputString === "7" ||
        inputString === "8" ||
        inputString === "9"
      ) {
        return true;
      } else {
        return false;
      }
    }

    function esDivisible(numero, divisiblePor) {
      if (numero % divisiblePor === 0 || numero % divisiblePor === -0) {
        return true;
      } else {
        return false;
      }
    }

    function isLeapYear(year) {
      // Es bisiesto si es divisible entre cuatro y (no es divisible entre 100 o es divisible entre 400).
      if (esDivisible(year, 4) === false) {
        return false;
      } else if (esDivisible(year, 100) === false) {
        return true;
      } else if (esDivisible(year, 400) === true) {
        return true;
      } else {
        return false;
      }
    }

    const monthsAOD = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let toRet = {
      isValid: false,
      errorMsg: "",
    };

    // Controla que se haya ingresado un String
    if (typeof htmlDate !== "string") {
      console.warn(
        `SDatesPublic.isValidHTMLDate(${htmlDate}) --> ERROR: htmlDate is not a string.`
      );
      toRet.errorMsg = "La fecha no es un String";
      return toRet;
    }

    const char0 = htmlDate.substring(0, 1);
    const char1 = htmlDate.substring(1, 2);
    const char2 = htmlDate.substring(2, 3);
    const char3 = htmlDate.substring(3, 4);
    const char4 = htmlDate.substring(4, 5);
    const char5 = htmlDate.substring(5, 6);
    const char6 = htmlDate.substring(6, 7);
    const char7 = htmlDate.substring(7, 8);
    const char8 = htmlDate.substring(8, 9);
    const char9 = htmlDate.substring(9, 10);

    // Controla que YYYY, MM y DD sean números, y que estén separados por guiones
    if (
      isNumberInStringFormatOf1Digit(char0) === false ||
      isNumberInStringFormatOf1Digit(char1) === false ||
      isNumberInStringFormatOf1Digit(char2) === false ||
      isNumberInStringFormatOf1Digit(char3) === false ||
      isNumberInStringFormatOf1Digit(char5) === false ||
      isNumberInStringFormatOf1Digit(char6) === false ||
      isNumberInStringFormatOf1Digit(char8) === false ||
      isNumberInStringFormatOf1Digit(char9) === false ||
      char4 !== "-" ||
      char7 !== "-"
    ) {
      console.warn(
        `SDatesPublic.isValidHTMLDate(${htmlDate}) --> ERROR: htmlDate does not have this format "YYYY-MM-DD".`
      );
      toRet.errorMsg = "La fecha no tiene el formato AAAA-MM-DD";
      return toRet;
    }

    const years = parseInt(htmlDate.substring(0, 4));
    const months = parseInt(htmlDate.substring(5, 7));
    const days = parseInt(htmlDate.substring(8, 10));

    // Controla los valores de los años/meses/días
    if (months === 2) {
      // Si es febrero:
      if (isLeapYear(years) === true) {
        if (days < 1 || days > 29) {
          console.warn(
            `SDatesPublic.isValidHTMLDate(${htmlDate}) --> ERROR: El día debe ser un número entre 1 y 29.`
          );
          toRet.errorMsg = "El día debe ser un número entre 1 y 29";
          return toRet;
        }
      } else {
        if (days < 1 || days > 28) {
          console.warn(
            `SDatesPublic.isValidHTMLDate(${htmlDate}) --> ERROR: El día debe ser un número entre 1 y 28.`
          );
          toRet.errorMsg = "El día debe ser un número entre 1 y 28";
          return toRet;
        }
      }
    } else {
      // Si no es febrero:
      const maxDays = monthsAOD[months - 1];
      if (days < 1 || days > maxDays) {
        console.warn(
          `SDatesPublic.isValidHTMLDate(${htmlDate}) --> ERROR: El día debe ser un número entre 1 y ${maxDays}.`
        );
        toRet.errorMsg = `El día debe ser un número entre 1 y ${maxDays}`;
        return toRet;
      }
    }

    if (months < 1 || months > 12) {
      console.warn(
        `SDatesPublic.isValidHTMLDate(${htmlDate}) --> ERROR: El mes no puede ser inferior a 1 ni superior a 12.`
      );
      toRet.errorMsg = "El mes debe ser un valor entre 1 y 12";
      return toRet;
    }

    if (years < 1 || years > 9999) {
      console.warn(
        `SDatesPublic.isValidHTMLDate(${htmlDate}) --> ERROR: El año no puede ser inferior a 1 ni superior a 9999.`
      );
      toRet.errorMsg = "El año debe ser un valor entre 1 y 9999";
      return toRet;
    }

    toRet.isValid = true;
    toRet.errorMsg = "Fecha válida";
    return toRet;
  } // isValidHTMLDate()

  /**
   *
   * @param {String} htmlDate String with the date in YYYY-MM-DD format.
   * @returns An instance of SDatesPublic()
   */
  static fromHTMLDate(htmlDate = null) {
    if (typeof htmlDate !== "string") {
      console.warn(
        `SDatesPublic.fromHTMLDate(${htmlDate}) --> ERROR: htmlDate is not a string.`
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
        `SDatesPublic.fromHTMLDate(${htmlDate}) --> ERROR: htmlDate must be a string in format YYYY-MM-DD.`
      );
      return;
    }

    return new SDatesPublic(days, months, years);
  } // fromHTMLDate()

  /**
   *
   * @param {*} JSDate An instance of Date()
   * @returns An instance of SDatesPublic()
   */
  static fromJSDate(JSDate = null) {
    if (JSDate instanceof Date === false) {
      console.warn(
        `SDatesPublic.fromJSDate(${JSDate}) --> ERROR: JSDate is not an instance of Date().`
      );
      return;
    }

    const years = JSDate.getFullYear();
    const months = JSDate.getMonth() + 1;
    const days = JSDate.getDate();

    return new SDatesPublic(days, months, years);
  } // from JSDate()

  /**
   * Returns an instance of SDatesPublic with the actual date
   * @returns An instance of SDatesPublic
   */
  static today() {
    const fechaActualJS = new Date(Date.now());
    const fechaActual = SDatesPublic.fromJSDate(fechaActualJS);
    return fechaActual;
  } // today()

  //#endregion
} // class SDatesPublic()
