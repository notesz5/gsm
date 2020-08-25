package repository;

import java.io.Serializable;
import java.util.List;

public interface IBaseRepository<T extends Serializable> {

    List<T> findAll();

    T find(int id);

    T create(T entity);

    T update(T entity);

    T delete(T entity);


}