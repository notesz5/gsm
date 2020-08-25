package bl;

import model.User;
import repository.IUserRepository;
import util.EJBAccess;
import util.PasswordUtil;

import javax.ejb.Stateless;
import javax.naming.NamingException;
import java.util.logging.Logger;

@Stateless
public class UserService {

    private Logger logger = Logger.getLogger(UserService.class.getName());

    public User authenticate(String username, String password) throws Exception {
        User user = null;


        IUserRepository userRepository = EJBAccess.getUserRepository();
        user = userRepository.findByUserName(username);
        String hashedPassword = PasswordUtil.digestPassword(password);
        if (user != null && user.getPassword().equals(hashedPassword)) {
            return user;
        } else {
            throw new Exception("Failed logging in with username '" + username + "': unknown username or password");
        }


    }

    public void register(String username, String password, String role) {

        try {
            IUserRepository userRepository = EJBAccess.getUserRepository();
            userRepository.registerUser(username, password, role);
        } catch (NamingException ex) {
            logger.severe("Exception in User Registration happened. Message: " + ex);
        }
    }
}
