package repository.impl;

import model.GsmItem;
import repository.IGsmItemRepositoryLocal;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

@Stateless
public class GsmItemRepositoryImpl extends AbstractRepository<GsmItem> implements IGsmItemRepositoryLocal {

    public GsmItemRepositoryImpl() {
        super(GsmItem.class);
    }

    @Override
    public GsmItem create(GsmItem entity) {
        if (entity.getId() == null) {
            if (entity.getDeleted() == null) {
                entity.setDeleted("0");
            }
//            if(findByImei(entity.getImei()) != null){
//                return null;
//            }
            em.persist(entity);
            em.flush();
            return entity;
        }
        return null;
    }

    @Override
    public GsmItem update(GsmItem entity) {
        if (entity.getId() != null) {
            GsmItem detached = em.find(GsmItem.class, entity.getId());

            detached.setImei(entity.getImei());
//            if(entity.getImei() != null &&
//                    !entity.getImei().isEmpty() &&
//                    !entity.getImei().equals(detached.getImei())){
//
//            }
            detached.setUsed(entity.getUsed());
//            if(entity.getUsed() != null &&
//                    !entity.getUsed().equals(detached.getUsed())){
//            }

            return em.merge(detached);
        }
        return null;
    }

    @Override
    public GsmItem delete(GsmItem entity) {
        GsmItem detached = em.find(GsmItem.class, entity.getId());
        if (detached.getDeleted().equals("0")) {
            detached.setDeleted("1");
            em.merge(detached);
            return detached;
        }
        return detached;
    }

}
