package repository.impl;

import model.User;
import repository.IUserRepositoryLocal;
import util.PasswordUtil;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.security.NoSuchAlgorithmException;

@Stateless
public class UserRepositoryImpl extends AbstractRepository<User> implements IUserRepositoryLocal {

    public UserRepositoryImpl() {
        super(User.class);
    }

    @Override
    public User findByUserName(String userName) {

        try{
            TypedQuery<User> query = em.createQuery("SELECT u FROM User u WHERE u.userName = :userName", User.class);
            query.setParameter("userName", userName);
            return query.getSingleResult();
        } catch (NoResultException e){

            return null;
        }


    }

    @Override
    public void registerUser(String username, String password, String role) {
        Query query = em.createNativeQuery("INSERT INTO User (USERNAME, PASSWORD, ROLE) VALUES (?,?,?)", User.class);

        String SHA256Password = "";
        try{
            SHA256Password = PasswordUtil.digestPassword(password);
        }catch(NoSuchAlgorithmException e){
            e.printStackTrace();
        }

        query.setParameter(1, username);
        query.setParameter(2, SHA256Password);
        query.setParameter(3, role);

        query.executeUpdate();
    }


}
