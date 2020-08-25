package repository;

import model.User;

public interface IUserRepository extends IBaseRepository<User> {

    User findByUserName(String userName);

    void registerUser(String username, String password, String role);
}