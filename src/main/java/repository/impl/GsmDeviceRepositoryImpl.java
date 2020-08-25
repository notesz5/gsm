package repository.impl;

import model.GsmDevice;
import repository.IGsmDeviceRepositoryLocal;

import javax.ejb.Stateless;

@Stateless
public class GsmDeviceRepositoryImpl extends AbstractRepository<GsmDevice> implements IGsmDeviceRepositoryLocal {

    public GsmDeviceRepositoryImpl() {
        super(GsmDevice.class);
    }

    @Override
    public GsmDevice create(GsmDevice entity) {
        if (entity.getId() == null) {
            if (entity.getDeleted() == null) {
                entity.setDeleted("0");
            }
            em.persist(entity);
            em.flush();
            return entity;
        }
        return null;
    }

    @Override
    public GsmDevice update(GsmDevice entity) {
        if (entity.getId() != null) {
            GsmDevice detached = em.find(GsmDevice.class, entity.getId());
            if (entity.getBrand() != null && !entity.getBrand().isEmpty() && !entity.getBrand().equals(detached.getBrand())) {
                detached.setBrand(entity.getBrand());
            }
            if (entity.getType() != null && !entity.getType().isEmpty() && !entity.getType().equals(detached.getType())) {
                detached.setType(entity.getType());
            }
            return em.merge(detached);
        }
        return null;
    }

    @Override
    public GsmDevice delete(GsmDevice entity) {
        GsmDevice detached = em.find(GsmDevice.class, entity.getId());
        if (detached.getDeleted().equals("0")) {
            detached.setDeleted("1");
            em.merge(detached);
            return detached;
        }
        return detached;
    }


}
