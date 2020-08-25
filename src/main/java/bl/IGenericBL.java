package bl;

import java.io.Serializable;
import java.util.List;

public interface IGenericBL<T extends Serializable> {

    public List<T> findAll();

    public T find(int id);

    public T create(T entity);

    public T update(T entity);

    public T delete(int id);

}
