package lt.urbontaitis.tdd;


import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;

import static junit.framework.Assert.*;

/**
 * Created by Mindaugas Urbontaitis on 21/01/2018.
 * tdd
 */
@Tag("fast")
public class BankAccountTest {

    private BankAccount acc;

    @Before
    public void setUp() {
        acc = new BankAccount(100);
    }

    @Test
    @DisplayName("deposit")
    public void deposit() {
        acc.deposit(50);
        assertEquals(acc.getBalance(), 150);
    }

    @Test
    @DisplayName("withdraw")
    public void withdraw() {
        acc.withdraw(50);
        assertEquals(acc.getBalance(), 50);
    }

    @Test
    @DisplayName("withdraw with penalty")
    public void withdrawWithPenalty() {
        acc.withdraw(110);
        assertEquals(acc.getBalance(), -15);
    }

    @Test
    @DisplayName("test withdraw multiple times")
    public void testWithdraw() {
        assertFalse(acc.withdraw(1000));
        assertEquals(acc.getBalance(), 100);

        assertTrue(acc.withdraw(1));
        assertEquals(acc.getBalance(), 99);
    }
}
