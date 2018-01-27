// High Order functions
def sum(f: Int => Int, a: Int, b: Int) = {
  def loop(a: Int, acc: Int): Int =
    if (a > b) acc
    else loop(a + 1, f(a) + acc)

  loop(a, 0)
}

sum(x => x * x * x, 3, 5)
sum(x => x, 3, 5)

// Currying
def sumc(f: Int => Int): (Int, Int) => Int = {
  def sumF(a: Int, b: Int): Int =
    if (a > b) 0
    else f(a) + sumF(a + 1, b)

  sumF
}

def sumInts = sumc(x => x)
def sumCubes = sumc(x => x * x * x)

sumCubes(3, 5)
sumInts(3, 5)
// it is the same as above
sumc(x => x * x * x)(3, 5)
sumc(x => x)(3, 5)


object productExercise {

  def mapReduce(f: Int => Int, combine: (Int, Int) => Int, zero: Int)(a: Int, b: Int): Int =
    if (a > b) zero
    else combine(f(a), mapReduce(f, combine, zero)(a + 1, b))

  def product(f: Int => Int)(a: Int, b: Int): Int =
    mapReduce(f, (x, y) => x * y, 1)(a, b)

  def fact(n: Int) = product(x => x)(1, n)


}

productExercise.product(x => x * x)(3, 4)
productExercise.fact(5)

def abs(x: Double) = if (x < 0) -x else x

// Finding a fixed point
object ex2 {
  val tolerance = 0.0001

  def isCloseEnough(x: Double, y: Double) =
    abs((x - y) / x) / x < tolerance

  def fixedPoint(f: Double => Double)(firstGuess: Double) = {
    def iterate(guess: Double): Double = {
      val next = f(guess)
      if (isCloseEnough(guess, next)) next
      else iterate(next)
    }

    iterate(firstGuess)
  }

  def averageDump(f: Double => Double)(x: Double) = (x + f(x)) /2

  def sqrt(x: Double) = fixedPoint(averageDump(y => x / y))(1)
}

ex2.fixedPoint(x => 1 + x / 2)(1)
ex2.sqrt(2)



