/*
  Ejercicio 1: Reverse a String
  Escribe una función reverseString que tome una cadena como entrada y devuelva la cadena invertida.
*/

function reverseString(str) {
  // Tu solución acá
  const reverseString = str.split("").reverse().join("");
  // primero lo transformo en un array de un string por celda, luego aplico la funcion reverse para invertir el orden de la ubicación de cada celda, y por ultimo
  // vuelvo a convertir en un string dicho array
  return reverseString;
}

/*
  Ejercicio 2: Check for Palindrome
  Escribe una función isPalindrome que tome una cadena como entrada 
  y devuelva true si la cadena es un palíndromo, y false en caso contrario.
*/
function isPalindrome(str) {
  // Tu solución acá
  const reverseString = str.split("").reverse().join("");
  // utilizo la misma lógica del ejercicio 1 para obtener la cadena invertida
  return str === reverseString ? true : false;
  // pregunto si la cadena ingresada es igual a su invertida, si es verdadero significa que es palíndromo
}

/*
  Ejercicio 3: Find the Nearest Pair
  Dado un array de números enteros, 
  encuentra el par de elementos cuya diferencia es mínima. 
  En otras palabras, encuentra dos números en el array que 
  estén más cerca el uno del otro en términos de valor absoluto.

  Ejemplo:

  Entrada: [4, 2, 1, 7, 9, 10]
  Salida: [1, 2]
*/

function closestPair(arr) {
  // Tu solución acá
  if (arr.length < 2) return null;
  // en caso de que el array tenga 1 o ningun elemento, no hay pares posibles

  arr.sort((a, b) => a - b);
  // Ordenamos el array para poder tener las diferencias consecutivas entre si

  let diferenciaMinima = Infinity;
  let parMinimo = [];
  // Declaramos una variable para guardar la diferencia mínima en valor absoluto y otra para almacenar el par

  for (let i = 1; i < arr.length; i++) {
    // recorremos una vez menos que la cantidad de elementos que tiene el array
    let diferencia = Math.abs(arr[i] - arr[i - 1]);
    // calculamos la diferencia en valor absoluto entre el elemento de la posición actual y el de la posición anterior
    if (diferencia < diferenciaMinima) {
      diferenciaMinima = diferencia;
      parMinimo = [arr[i - 1], arr[i]];
      // Si la diferencia encontrada es menor a la que había, la guardamos en la variable, al igual que el par mímimo encontrado
    }
  }

  return parMinimo;
}

/*
  Ejercicio 4: Calculadora - Programación Orientada a Objetos
  La calculadora debe ser capaz de realizar operaciones aritméticas básicas, 
  como suma, resta, multiplicación y división. 
  Además, debe mantener un registro del último resultado calculado 
  para que los usuarios puedan acceder a él si es necesario.

  La calculadora debe ser una clase llamada Calculator, que tenga los siguientes métodos:
  - add(a, b): Este método toma dos números como argumentos y devuelve la suma de los mismos. 
    Además, actualiza el último resultado calculado.

  - subtract(a, b): Este método toma dos números como argumentos y devuelve la resta del primero menos el segundo. 
    Además, actualiza el último resultado calculado.

  - multiply(a, b): Este método toma dos números como argumentos y devuelve el producto de los mismos. 
    Además, actualiza el último resultado calculado.

  - divide(a, b): Este método toma dos números como argumentos y devuelve el cociente del primero dividido por el segundo.
    Si el segundo número es cero, se debe lanzar un error indicando que la división por cero no está permitida. 
    Además, actualiza el último resultado calculado.

  - getLastResult(): Este método devuelve el último resultado calculado por la calculadora, simulando un historial.

  Además de estos métodos, debes agregar una función más compleja a la clase Calculator, 
  que calcule la potencia de un número. 
  Esta función debe ser asignada al prototipo de la clase y se llamará exponentiate(base, exponent). 
  Esta función toma dos argumentos: la base y el exponente, y devuelve la base elevada a la potencia del exponente. 
  La función debe manejar correctamente los casos donde el exponente es cero o negativo, lanzando un error en este último caso.
  Además, actualiza el último resultado calculado.

*/

class Calculator {
  // Tu solución acá
  constructor() {
    this.ultimoResultado = 0;
    // declaramos en el constructor, el atributo para almacenar el último resultado
  }

  add(a, b) {
    this.ultimoResultado = a + b;
    return this.ultimoResultado;
    // método para sumar 2 números
  }

  subtract(a, b) {
    this.ultimoResultado = a - b;
    return this.ultimoResultado;
    // método para restar 2 números
  }

  multiply(a, b) {
    this.ultimoResultado = a * b;
    return this.ultimoResultado;
    // método para multiplicar 2 números
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error("Division by zero is not allowed");
    }
    // Condicíon para el caso de divisiíon por cero
    this.ultimoResultado = a / b;
    return this.ultimoResultado;
    // método para dividir 2 números
  }
  exponentiate(a, b) {
    if (b < 0) {
      throw new Error("Exponentiation with negative exponent is not allowed");
    }
    // Condicíon para el caso de exponentes negativos
    this.ultimoResultado = Math.pow(a, b);
    return this.ultimoResultado;
    // método para calcular la potencia de un número
  }

  getLastResult() {
    return this.ultimoResultado;
    // método para acceder al último resultado que se realizó
  }
}

module.exports = {
  closestPair,
  isPalindrome,
  reverseString,
  Calculator,
};
