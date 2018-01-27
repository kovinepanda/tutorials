// Greatest Common Divisor using Euclid's algorithm
def gcd(a: Int, b: Int): Int =
  if (b == 0) a else gcd(b, a % b)

gcd(14, 21)

// Non tail recursion factorial
def factorial2(n: Int): Int =
  if (n == 0) 1 else n * factorial2(n - 1)

factorial2(4)

// Tail recursion
def factorial(n: Int): Int = {
  def loop(acc: Int, n: Int): Int =
    if (n == 0) acc
    else loop(acc * n, n - 1)

  loop(1, n)
}

factorial(4)