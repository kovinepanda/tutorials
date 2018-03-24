/**
  *
  * Created by Mindaugas Urbontaitis on 06/03/2018.
  * scala
  */
class Pouring(capacity: Vector[Int]) {

//   States
  type State = Vector[Int]
  // uzpildo capacity esancias stiklines 0
  val initialState = capacity map( x => 0)

//   Moves

  trait Move {
    def change(state: State): State
  }
  case class Empty(glass: Int) extends Move {
    override def change(state: State): State = state updated(glass, 0) // stikline tampa tuscia
  }
  case class Fill(glass: Int) extends Move {
    override def change(state: State): State = state updated(glass, capacity(glass))  // stikline pagal index'a uzpildo pilnai, pagal tiek, kiek joje yra vietos
  }
  case class Pour(from: Int, to: Int) extends Move {
    override def change(state: State): State = {
      val amount = state(from).min(capacity(to) - state(to))
      state updated(from, state(from) - amount) updated(to, state(to) + amount)
      // atimti is ankstenes state amount ir priskirti dabartiniam from. tas pats ir su "to" stikline
    }
  }

  // range nuo 0 iki 3 (mano atveju)
  val glasses = 0 until capacity.length

//  println(glasses)

  val moves =
    (for (g <- glasses) yield Empty(g)) ++
    (for (g <- glasses) yield Fill(g)) ++
    (for (from <- glasses; to <- glasses if from != to) yield  Pour(from, to)) // jeigu from ir to nera ta pati stikline, tada perpilk

//  println(moves)

//  Paths

  class Path(history: List[Move], val endState: State) { // moved state to arguments, to optimize
//    def endState: State = (history foldRight initialState) (_ change _)
    def extend(move: Move) = new Path(move :: history, move change endState)

    override def toString = (history.reverse mkString " " ) + "--> " + endState
//    recursive trackState was changed with foldRight
//    private def trackState(xs: List[Move]): State = xs match {
//      case Nil => initialState
//      case move :: xs1 => move change trackState(xs1)
//    }
  }

  val initialPath = new Path(Nil, initialState);

  def from(paths: Set[Path], explored: Set[State]): Stream[Set[Path]] =
    if (paths.isEmpty) Stream.empty
    else {
      val more = for {
        path <- paths
        next <- moves map path.extend
        if !(explored contains next.endState)
      } yield next
      paths #:: from(more, explored ++ (more map (_.endState)))
    }

  val pathSets = from(Set(initialPath), Set(initialState))

    // jeigu viename is pathSets, endState turi target, jis yra sprendimas
  def solutions(target: Int): Stream[Path] =
    for {
      pathSet <- pathSets
      path <- pathSet
      if path.endState contains target
    } yield path

}
