package repository.impl;

import model.GsmPartner;
import repository.IGsmPartnerRepositoryLocal;

import javax.ejb.Stateless;

@Stateless
public class GsmPartnerRepositoryImpl extends AbstractRepository<GsmPartner> implements IGsmPartnerRepositoryLocal {

    public GsmPartnerRepositoryImpl() {
        super(GsmPartner.class);
    }

    @Override
    public GsmPartner create(GsmPartner entity) {
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
    public GsmPartner update(GsmPartner entity) {
        if (entity.getId() != null) {
            GsmPartner detached = em.find(GsmPartner.class, entity.getId());
            if (entity.getName() != null &&
                    !entity.getName().isEmpty() &&
                    !entity.getName().equals(detached.getName())) {
                detached.setName(entity.getName());
            }
            if (entity.getEmail() != null &&
                    !entity.getEmail().isEmpty() &&
                    !entity.getEmail().equals(detached.getEmail())) {
                detached.setEmail(entity.getEmail());
            }
            if (entity.getPhone() != null &&
                    !entity.getPhone().isEmpty() &&
                    !entity.getPhone().equals(detached.getPhone())) {
                detached.setPhone(entity.getPhone());
            }
            if (entity.getPostalCode() != null &&
                    !entity.getPostalCode().isEmpty() &&
                    !entity.getPostalCode().equals(detached.getPostalCode())) {
                detached.setPostalCode(entity.getPostalCode());
            }
            if (entity.getCity() != null &&
                    !entity.getCity().isEmpty() &&
                    !entity.getCity().equals(detached.getCity())) {
                detached.setCity(entity.getCity());
            }
            if (entity.getStreet() != null &&
                    !entity.getStreet().isEmpty() &&
                    !entity.getStreet().equals(detached.getStreet())) {
                detached.setStreet(entity.getStreet());
            }
            if (entity.getStreetNumber() != null &&
                    !entity.getStreetNumber().isEmpty() &&
                    !entity.getStreetNumber().equals(detached.getStreetNumber())) {
                detached.setStreetNumber(entity.getStreetNumber());
            }
            return em.merge(detached);
        }
        return null;
    }

    @Override
    public GsmPartner delete(GsmPartner entity) {
        GsmPartner detached = em.find(GsmPartner.class, entity.getId());
        if (detached.getDeleted().equals("0")) {
            detached.setDeleted("1");
            em.merge(detached);
            return detached;
        }
        return detached;
    }

}
