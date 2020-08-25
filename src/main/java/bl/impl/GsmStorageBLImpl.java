package bl.impl;

import bl.IGsmStorageBL;
import model.GsmDevice;
import model.GsmItem;
import model.GsmPartner;
import model.GsmStorage;
import repository.IGsmDeviceRepository;
import repository.IGsmItemRepository;
import repository.IGsmPartnerRepository;
import repository.IGsmStorageRepository;
import util.EJBAccess;

import javax.ejb.Stateless;
import javax.naming.NamingException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Stateless
public class GsmStorageBLImpl implements IGsmStorageBL {

    private Logger logger = Logger.getLogger(GsmStorageBLImpl.class.getName());

    public GsmStorageBLImpl() {
    }

    @Override
    public List<GsmStorage> findAll() {
        List<GsmStorage> storageList = new ArrayList<>();
        try {
            IGsmStorageRepository gsmStorageRepository = EJBAccess.getGsmStorageRepository();
            storageList = gsmStorageRepository.findAll();
        } catch (NamingException ex) {
            logger.severe("DB ERROR during GsmStorageBl.findAll() method invoked" + ex);
        } catch (Exception ex) {
            logger.severe("ERROR during GsmStorageBl.findAll() method invoked" + ex);
        }
        return storageList;
    }

    @Override
    public GsmStorage find(int id) {
        GsmStorage storageItem = null;
        try {
            IGsmStorageRepository gsmStorageRepository = EJBAccess.getGsmStorageRepository();
            storageItem = gsmStorageRepository.find(id);
        } catch (NamingException ex) {
            logger.severe("DB ERROR during GsmStorageBl.find(int id) method invoked" + ex);
        } catch (Exception ex) {
            logger.severe("ERROR during GsmStorageBl.find(int id) method invoked" + ex);
        }
        return storageItem;
    }

    @Override
    public GsmStorage create(GsmStorage entity) {
        GsmStorage gsmStorageItem = null;
        try {
            if (entity.getId() == null && entity.getGsmItemId().getId() == null) {
                IGsmItemRepository gsmItemRepository = EJBAccess.getGsmItemRepository();
                if (entity.getGsmItemId().getGsmDeviceId().getId() == null) {
                    IGsmDeviceRepository gsmDeviceRepository = EJBAccess.getGsmDeviceRepository();
                    GsmDevice device = gsmDeviceRepository.create(entity.getGsmItemId().getGsmDeviceId());

                    entity.getGsmItemId().setGsmDeviceId(device);
                }

                GsmItem item = gsmItemRepository.create(entity.getGsmItemId());

                entity.setGsmItemId(item);
                if (entity.getGsmPartnerId().getId() == null) {
                    IGsmPartnerRepository gsmPartnerRepository = EJBAccess.getGsmPartnerRepository();
                    GsmPartner partner = gsmPartnerRepository.create(entity.getGsmPartnerId());
                    entity.setGsmPartnerId(partner);
                }
                entity.setSold(false);
                IGsmStorageRepository gsmStorageRepository = EJBAccess.getGsmStorageRepository();
                gsmStorageItem = gsmStorageRepository.create(entity);
            }
        } catch (NamingException ex) {
            logger.severe("DB ERROR during GsmStorageBl.create(Entity entity) method invoked" + ex);
        } catch (Exception ex) {
            logger.severe("ERROR during GsmStorageBl.create(Entity entity) method invoked" + ex);
        }
        return gsmStorageItem;
    }

    @Override
    public GsmStorage sell(GsmStorage entity) {
        GsmStorage item = null;
        try {
            if (entity.getId() != null) {
                IGsmStorageRepository gsmStorageRepository = EJBAccess.getGsmStorageRepository();
                item = gsmStorageRepository.find(entity.getId());
                item.setSold(true);

                IGsmPartnerRepository gsmPartnerRepository = EJBAccess.getGsmPartnerRepository();

                if (entity.getGsmPartner2Id().getId() != null) {
                    GsmPartner partner2 = gsmPartnerRepository.find(entity.getGsmPartner2Id().getId());
                    item.setGsmPartner2Id(partner2);
                } else {
                    GsmPartner partner2 = gsmPartnerRepository.create(entity.getGsmPartner2Id());
                    if (partner2 != null) {
                        item.setGsmPartner2Id(partner2);
                    }
                }
                if (entity.getSalePrice() != null) {
                    item.setSalePrice(entity.getSalePrice());
                }
                gsmStorageRepository.sell(entity);

            }
        } catch (NamingException ex) {
            logger.severe("DB ERROR during GsmStorageBl.create(Entity entity) method invoked" + ex);
        } catch (Exception ex) {
            logger.severe("ERROR during GsmStorageBl.create(Entity entity) method invoked" + ex);
        }

        return item;
    }

    @Override
    public GsmStorage update(GsmStorage entity) {
        GsmStorage storageItem = null;


        try {
            IGsmStorageRepository gsmStorageRepository = EJBAccess.getGsmStorageRepository();
            IGsmDeviceRepository gsmDeviceRepository = EJBAccess.getGsmDeviceRepository();
            IGsmPartnerRepository gsmPartnerRepository = EJBAccess.getGsmPartnerRepository();

            storageItem = gsmStorageRepository.find(entity.getId());

            if(storageItem.getBuyPrice() != entity.getBuyPrice()){
                storageItem.setBuyPrice(entity.getBuyPrice());
            }

            if(storageItem.getSold() == true && storageItem.getSalePrice() != entity.getSalePrice()){
                storageItem.setSalePrice(entity.getSalePrice());
            }

            if(storageItem.getGsmItemId().getUsed() != entity.getGsmItemId().getUsed()){
                storageItem.getGsmItemId().setUsed(entity.getGsmItemId().getUsed());
            }

            if(storageItem.getGsmItemId().getImei() != entity.getGsmItemId().getImei()){
                storageItem.getGsmItemId().setImei(entity.getGsmItemId().getImei());
            }


            if (entity.getGsmItemId().getGsmDeviceId().getId() == null) {
                GsmDevice device = new GsmDevice();
                device.setBrand(entity.getGsmItemId().getGsmDeviceId().getBrand());
                device.setType(entity.getGsmItemId().getGsmDeviceId().getType());
                device = gsmDeviceRepository.create(device);
                storageItem.getGsmItemId().setGsmDeviceId(device);
            } else {
                storageItem.getGsmItemId().setGsmDeviceId(gsmDeviceRepository.find(entity.getGsmItemId().getGsmDeviceId().getId()));
            }

            if(storageItem.getGsmPartnerId().getId() != entity.getGsmPartnerId().getId()){
                storageItem.setGsmPartnerId(gsmPartnerRepository.find(entity.getGsmPartnerId().getId()));
            }

            if(storageItem.getSold() == true && storageItem.getGsmPartner2Id().getId() != entity.getGsmPartner2Id().getId()){
                storageItem.setGsmPartner2Id(gsmPartnerRepository.find(entity.getGsmPartner2Id().getId()));
            }



            gsmStorageRepository.update(storageItem);

        } catch (NamingException ex) {
            logger.severe("DB ERROR during GsmStorageBl.update(Entity entity) method invoked" + ex);
        } catch (Exception ex) {
            logger.severe("ERROR during GsmStorageBl.update(Entity entity) method invoked" + ex);
        }


        return storageItem;

    }

    @Override
    public GsmStorage delete(int id) {
        GsmStorage item = null;

        try {
            IGsmStorageRepository gsmStorageRepository = EJBAccess.getGsmStorageRepository();
            item = gsmStorageRepository.find(id);
            item.setDeleted("1");
            gsmStorageRepository.delete(item);


        } catch (NamingException ex) {
            logger.severe("DB ERROR during GsmDeviceBl.delete(int id) method invoked" + ex);
        } catch (Exception ex) {
            logger.severe("ERROR during GsmDeviceBl.delete(int id) method invoked" + ex);
        }

        return item;
    }

}
