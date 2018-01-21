package lt.urbontaitis.tdd;

/**
 * Created by Mindaugas Urbontaitis on 21/01/2018.
 * tdd
 */
public class BankAccount {

    private int balance;

    public BankAccount(int balance) {
        this.balance = balance;
    }

    public BankAccount() {

    }

    public void deposit(int amount) {
        this.balance += amount;
    }

    public int getBalance() {
        return balance;
    }

    public boolean withdraw(int amount) {
        if (amount > (3 * balance)) {
            return false;
        }

        balance -= amount;
        if (balance < 0) {
            balance -= 5;
        }

        return true;
     }
}
