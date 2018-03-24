import cats.implicits._
import cats.kernel.{Monoid, Semigroup}

Semigroup[Int].combine(1, 2)

Semigroup[List[Int]].combine(List(1, 2, 3), List(4, 5, 6))

Semigroup[Option[Int]].combine(Option(1), Option(2))

Semigroup[Option[Int]].combine(Option(1), None)

Semigroup[Int ⇒ Int]
  .combine({ (x: Int) ⇒
    x + 1
  }, { (x: Int) ⇒
    x * 10
  })
  .apply(6)


val aMap = Map("foo" → Map("bar" → 5))
val anotherMap = Map("foo" → Map("bar" → 6))
val combinedMap = Semigroup[Map[String, Map[String, Int]]].combine(aMap, anotherMap)

combinedMap.get("foo")

val one: Option[Int] = Option(1)
val two: Option[Int] = Option(2)
val n: Option[Int] = None

println(one |+| two)
println(n |+| two)
println(n |+| n)
println(two |+| n)


Monoid[String].empty
Monoid[String].combineAll(List("a", "b", "c"))
Monoid[String].combineAll(List())

Monoid[Map[String, Int]].combineAll(List(Map("a" → 1, "b" → 2), Map("a" → 3)))
Monoid[Map[String, Int]].combineAll(List())

val l = List(1, 2, 3, 4, 5)
l.foldMap(identity)
l.foldMap(i ⇒ i.toString)
l.foldMap(i ⇒ (i, i.toString))
