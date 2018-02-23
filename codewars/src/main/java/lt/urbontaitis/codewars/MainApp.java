package lt.urbontaitis.codewars;

import org.junit.Assert;

import java.util.HashMap;
import java.util.Map;

/**
 * A Camel Application
 */
public class MainApp {

    /**
     * A main() so we can easily run these routing rules in our IDE
     */
    public static void main(String... args) throws Exception {


        Assert.assertEquals(0, duplicateCount("abcde"));
        Assert.assertEquals(2, duplicateCount("aabbcde"));
        Assert.assertEquals(2, duplicateCount("aabBcde"));
        Assert.assertEquals(1, duplicateCount("indivisibility"));
        Assert.assertEquals(2, duplicateCount("Indivisibilities"));
        Assert.assertEquals(2, duplicateCount("aA11"));
        Assert.assertEquals(2, duplicateCount("ABBA"));
    }

    /**
     * TODO refactor to not use Map and HashMaps
     * @param text
     * @return
     */
    public static int duplicateCount(String text) {
        int countResult = 0;
        char[] chars = text.toCharArray();
        Map<String, Integer> characterCount = new HashMap<>();
        for (char c: chars) {
            String character = String.valueOf(c).toLowerCase();
            if(characterCount.containsKey(character)) {
                int counter = characterCount.get(character) + 1;
                if (counter == 1) {
                    countResult++;
                }
                characterCount.put(character, counter) ;
            } else {
                characterCount.put(character, 0) ;
            }
        }

        return countResult;
    }

}

