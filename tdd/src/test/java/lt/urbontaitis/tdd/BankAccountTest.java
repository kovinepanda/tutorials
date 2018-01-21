package lt.urbontaitis.tdd;


import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertTrue;

/**
 * Created by Mindaugas Urbontaitis on 21/01/2018.
 * tdd
 */
@Tag("fast")
public class BankAccountTest {

    @Test
    @DisplayName("deposit")
    public void deposit() {
        BankAccount acc = new BankAccount();
        acc.deposit(50);
        assertEquals(acc.getBalance(), 50);
    }

    @Test
    @DisplayName("withdraw")
    public void withdraw() {
        BankAccount acc = new BankAccount(75);
        acc.withdraw(50);
        assertEquals(acc.getBalance(), 25);
    }

    @Test
    @DisplayName("withdraw with penalty")
    public void withdrawWithPenalty () {
        BankAccount acc = new BankAccount(10);
        acc.withdraw(20);
        assertEquals(acc.getBalance(), -15);
    }

    @Test
    @DisplayName("test withdraw multiple times")
    public void testWithdraw() {
        BankAccount acc = new BankAccount(100);
        assertFalse(acc.withdraw(1000));
        assertEquals(acc.getBalance(), 100);

        assertTrue(acc.withdraw(1));
        assertEquals(acc.getBalance(), 99);
    }
}
