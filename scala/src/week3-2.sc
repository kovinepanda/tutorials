class Rational(x: Int, y: Int) {
  require(y > 0, "denominator must be nonzero")

  // second constructor
  def this(x: Int) = this(x, 1)

  private def gcd(a: Int, b: Int): Int = if (b == 0) a else gcd(b, a % b)

  val numer = x
  val denom = y

  def less(that: Rational) = this.numer * that.denom < that.numer * this.denom

  def max(that: Rational) = if (this.less(that)) that else this

  def add(that: Rational) =
    new Rational(numer * that.denom + that.numer * denom, denom * that.denom)

  def neg: Rational = new Rational(-numer, denom)

  def sub(that: Rational) = add(that.neg)

  override def toString: String = {
    val g = gcd(numer, denom)
    numer / g + "/" + denom / g
  }
}

class Rational2(x: Int, y: Int) {
  require(y > 0, "denominator must be nonzero")

  // second constructor
  def this(x: Int) = this(x, 1)

  private def gcd(a: Int, b: Int): Int = if (b == 0) a else gcd(b, a % b)

  val numer = x
  val denom = y

  def < (that: Rational) = this.numer * that.denom < that.numer * this.denom

  def max(that: Rational) = if (this < that) that else this

  def + (that: Rational) =
    new Rational(numer * that.denom + that.numer * denom, denom * that.denom)

  def neg : Rational = new Rational(-numer, denom) // unary_- neveike kazkodel

  def - (that: Rational) = that + that.neg

  override def toString: String = {
    val g = gcd(numer, denom)
    numer / g + "/" + denom / g
  }
}

val x = new Rational(1, 3)
val y = new Rational(5, 7)
val z = new Rational(3, 2)


x.sub(y).sub(z)
y.add(y)
x.less(y)
x.max(y)

val x2 = new Rational2(1, 3)
val y2 = new Rational2(5, 7)
val z2 = new Rational2(3, 2)

x2 - y2 - z2
y2 + y2
x2 > y2
x2 max y2

//val strange = new Rational(1, 0)
//strange.add(strange)
