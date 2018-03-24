package example

/**
  *
  * Created by Mindaugas Urbontaitis on 05/03/2018.
  * scala
  */
class Rational(x: Int, y: Int) {
  require(y > 0, "denominator must be nonzero")

  // second constructor
  def this(x: Int) = this(x, 1)

  private def gcd(a: Int, b: Int): Int = if (b == 0) a else gcd(b, a % b)

  val numer: Int = x
  val denom: Int = y

  def < (that: Rational) = this.numer * that.denom < that.numer * this.denom

  def max(that: Rational) = if (this < that) that else this

  def + (that: Rational) =
    new Rational(numer * that.denom + that.numer * denom, denom * that.denom)

  def unary_- : Rational = new Rational(-numer, denom)

  def - (that: Rational) = that + -that

  override def toString: String = {
    val g = gcd(numer, denom)
    numer / g + "/" + denom / g
  }
}