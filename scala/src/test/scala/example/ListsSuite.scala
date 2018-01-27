package example

/**
  *
  * Created by Mindaugas Urbontaitis on 23/01/2018.
  * scala
  */
@RunWith(classOf[JUnitRunner])
class ListsSuite extends FunSuite {

  import example.Lists._

  test("sum of a few numbers") {
    assert(sum(List(1,2,0)) === 3)
  }

  test("max of a few numbers") {
    assert(max(List(3,7,2)) === 7)
  }
}
