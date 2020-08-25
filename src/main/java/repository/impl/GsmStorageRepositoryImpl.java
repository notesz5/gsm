package repository.impl;

import model.GsmDevice;
import model.GsmItem;
import model.GsmPartner;
import model.GsmStorage;
import repository.IGsmStorageRepositoryLocal;

import javax.ejb.Stateless;

@Stateless
public class GsmStorageRepositoryImpl extends AbstractRepository<GsmStorage> implements IGsmStorageRepositoryLocal {
    public GsmStorageRepositoryImpl() {
        super(GsmStorage.class);
    }

    @Override
    public GsmStorage create(GsmStorage entity) {
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
    public GsmStorage update(GsmStorage entity) {

        if (entity.getId() != null) {
            GsmStorage storageItem = em.find(GsmStorage.class, entity.getId());

            if (storageItem.getBuyPrice() != entity.getBuyPrice()) {
                storageItem.setBuyPrice(entity.getBuyPrice());
            }

            if (storageItem.getSalePrice() != entity.getSalePrice() && entity.getSold() == true) {
                storageItem.setSalePrice(entity.getSalePrice());
            }

            if (storageItem.getGsmItemId().getId() != entity.getGsmItemId().getId()) {
                GsmItem item = em.find(GsmItem.class, entity.getGsmItemId().getId());
                item.setUsed(entity.getGsmItemId().getUsed());

                storageItem.setGsmItemId(item);
            }

            if (entity.getGsmItemId().getGsmDeviceId().getId() != storageItem.getGsmItemId().getGsmDeviceId().getId()) {
                storageItem.getGsmItemId().setGsmDeviceId(em.find(GsmDevice.class, entity.getGsmItemId().getGsmDeviceId().getId()));
            }

            if (storageItem.getGsmPartnerId().getId() != entity.getGsmPartnerId().getId()) {
                GsmPartner partner1 = em.find(GsmPartner.class, entity.getGsmPartnerId().getId());

                storageItem.setGsmPartnerId(partner1);

            }

            if (entity.getSold() == true && storageItem.getGsmPartner2Id().getId() != entity.getGsmPartner2Id().getId()) {
                GsmPartner partner2 = em.find(GsmPartner.class, entity.getGsmPartner2Id().getId());

                storageItem.setGsmPartnerId(partner2);

            }

            return em.merge(storageItem);

        }
        return null;
    }

    @Override
    public GsmStorage sell(GsmStorage entity) {
        if (entity.getId() != null) {
            GsmStorage storageItem = em.find(GsmStorage.class, entity.getId());
            if (storageItem.getSalePrice() == null) {
                storageItem.setSalePrice(entity.getSalePrice());
            }
            if (entity.getGsmPartner2Id() != null &&
                    !entity.getGsmPartner2Id().equals(storageItem.getGsmPartner2Id())) {
                storageItem.setGsmPartner2Id(entity.getGsmPartner2Id());
            }
            if (entity.getSold() != null) {
                storageItem.setSold(entity.getSold());
            }
            return em.merge(storageItem);
        }
        return null;
    }

    @Override
    public GsmStorage delete(GsmStorage entity) {
        GsmStorage storageItem = em.find(GsmStorage.class, entity.getId());
        storageItem.setDeleted("1");
        return em.merge(storageItem);
    }


}
