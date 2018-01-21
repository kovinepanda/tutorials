package lt.urbontaitis.tdd;

/**
 * Created by Mindaugas Urbontaitis on 22/01/2018.
 * tdd
 */
public class Calculator {

    public void divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException();
        }
    }
}
