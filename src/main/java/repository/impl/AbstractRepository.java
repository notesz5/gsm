package repository.impl;

import repository.IBaseRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.io.Serializable;
import java.util.List;

public class AbstractRepository<T extends Serializable> implements IBaseRepository<T> {

    @PersistenceContext(unitName = "GsmPU")
    protected EntityManager em;

    private Class<T> entityClass;


    public AbstractRepository(Class<T> clazz) {
        this.entityClass = clazz;
    }

    public EntityManager getEm() {
        return em;
    }

    @Override
    public List<T> findAll() {
        TypedQuery<T> query = em.createNamedQuery(entityClass.getSimpleName() + ".findAll", entityClass);
        return query.getResultList();
    }

    @Override
    public T find(int id) {
        return em.find(entityClass, id);
    }

    @Override
    public T create(T entity) {
        em.persist(entity);
        em.flush();
        return entity;
    }

    @Override
    public T update(T entity) {
        return em.merge(entity);
    }

    @Override
    public T delete(T entity) {
        return em.merge(entity);
    }
}





