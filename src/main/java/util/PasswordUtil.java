package util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import java.nio.charset.StandardCharsets;


public class PasswordUtil {

    public static String digestPasswordToBase64(String password){
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(password.getBytes("UTF-8"));
            byte[] passwordDigest = md.digest();
            return new String(Base64.getEncoder().encode(passwordDigest));
        } catch (Exception ex) {
            throw new RuntimeException("Exception encoding password");
        }

    }

    public static String digestPassword(String password) throws NoSuchAlgorithmException{
        StringBuilder sb = new StringBuilder();
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashInBytes = md.digest(password.getBytes(StandardCharsets.UTF_8));
            for (byte b : hashInBytes) {
                sb.append(String.format("%02x", b));
            }

        } catch(NoSuchAlgorithmException ex){
            System.out.println(ex.getMessage());
        } finally {
            return sb.toString();
        }

    }


}
