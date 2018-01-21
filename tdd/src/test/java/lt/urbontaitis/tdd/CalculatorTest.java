package lt.urbontaitis.tdd;

import org.junit.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Created by Mindaugas Urbontaitis on 22/01/2018.
 * tdd
 */
public class CalculatorTest {

    @Test()
    public void divisionException() {
        Calculator c = new Calculator();
        int a = 5, b = 0;
        assertThrows(IllegalArgumentException.class, () -> { c.divide(a,b); });
    }
}
