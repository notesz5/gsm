package rest.impl;

import bl.UserService;
import jwtUtil.JwtManager;
import model.User;
import rest.IUserRest;
import rest.responses.ResponseHandler;

import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.logging.Logger;

@RequestScoped
public class UserRestImpl implements IUserRest {

    private static final Logger logger = Logger.getLogger(UserRestImpl.class.getName());

    @Inject
    JwtManager jwtManager;

    @EJB
    UserService userService;

    @Context
    private SecurityContext securityContext;


    @Override
    public Response postJWT(String username, String password) {
        logger.info("Authenticating " + username);
        try {
            User user = userService.authenticate(username, password);
            if (user != null) {
                if (user.getUserName() != null) {
                    logger.info("Generating JWT for: " + user.getUserName());
                }
                String token = jwtManager.createJwt(user.getUserName(), user.getRole());

                return ResponseHandler.sendLoginResponseOK(user.getUserName(), token);
            }
        } catch (Exception e) {
            logger.info("Bad username or password.");
        }
        return ResponseHandler.sendLoginResponseBad();
    }

    @Override
    public Response registerUser(String username, String password, String role) {
        logger.info("Registering user with username: " + username);

        userService.register(username, password, role);
        return Response.ok().build();


    }
}
