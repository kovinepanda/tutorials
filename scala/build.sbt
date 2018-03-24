scalaVersion := "2.12.3"

name := "scala-tutorial"
organization := "net.murbo"
version := "1.0"

// Note, it's not required for you to define these three settings. These are
// mostly only necessary if you intend to publish your library's binaries on a
// place like Sonatype or Bintray.


// Want to use a published library in your project?
// You can define other libraries as dependencies in your build like this:
libraryDependencies ++= {
  Seq(
    "org.typelevel" %% "cats" % "0.9.0"
  )
}