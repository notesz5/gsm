package rest.responses;

public class LoginResponse {

    private String userName;
    private String token;

    public LoginResponse(String userName, String token) {
        this.userName = userName;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

}

