import example.Rational

/**
  *
  * Created by Mindaugas Urbontaitis on 22/01/2018.
  * scala
  */
object Hello extends App {
  println("Hello world! :)")

//  val r1 = new Rational(1,2)
//  println(r1)

  // takes first n indexes when skip n index and continues from n + 1
  // ::: - followed by
//  def removeAt(n: Int, xs: List[Int]): List[Int] = (xs take n) ::: (xs drop n + 1)
//
//  val myArray = List(1,2,3,4)
//  println(myArray)
//  val updatedMyArray = removeAt(1, myArray)
//  println(updatedMyArray)



  val problem = new Pouring(Vector(4, 7, 9))
//  println(problem.moves)
//  println(problem.pathSets.take(3).toList)
//  println(problem.solutions(6))

}
