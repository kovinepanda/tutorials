package lt.urbontaitis.tdd;

/**
 * Created by Mindaugas Urbontaitis on 21/01/2018.
 * tdd
 */
public class BankAccount {

    private int balance;

    public void setDeposit(int deposit) {
        this.balance += deposit;
    }

    public int getBalance() {
        return balance;
    }
}
