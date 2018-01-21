package lt.urbontaitis.tdd;

import org.junit.jupiter.api.Test;

import static junit.framework.Assert.assertEquals;

/**
 * Created by Mindaugas Urbontaitis on 21/01/2018.
 * tdd
 */
public class BankAccountTest {

    @Test
    public void test() {
        BankAccount acc = new BankAccount();
        acc.deposit(50);
        assertEquals(acc.getBalance(), 50);

        acc.withdraw(30);
        assertEquals(acc.getBalance(), 20);
    }

}
