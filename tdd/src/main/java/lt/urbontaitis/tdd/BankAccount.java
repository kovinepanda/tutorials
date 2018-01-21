package lt.urbontaitis.tdd;

/**
 * Created by Mindaugas Urbontaitis on 21/01/2018.
 * tdd
 */
public class BankAccount {

    private int balance;

    public void deposit(int amount) {
        this.balance += amount;
    }

    public int getBalance() {
        return balance;
    }

    public void withdraw(int amount) {
        balance -= amount;
    }
}
