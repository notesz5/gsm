package bl.impl;

import bl.IGsmPartnerBL;
import model.GsmPartner;
import repository.IGsmPartnerRepository;
import util.EJBAccess;

import javax.ejb.Stateless;
import javax.naming.NamingException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Stateless
public class GsmPartnerBLImpl implements IGsmPartnerBL {


    public GsmPartnerBLImpl() {
    }

    private Logger logger = Logger.getLogger(GsmPartnerBLImpl.class.getName());

    @Override
    public List<GsmPartner> findAll() {
        List<GsmPartner> partners = new ArrayList<>();

        try {
            IGsmPartnerRepository gsmPartnerRepository = EJBAccess.getGsmPartnerRepository();
            partners = gsmPartnerRepository.findAll();
        } catch (NamingException e) {
            logger.severe("EXCEPTION during GsmPartnereBl.findAll() method invoked");
        } catch (Exception e) {
            logger.severe("EXCEPTION during GsmPartnerBl.findAll() method invoked");
        }
        return partners;
    }

    @Override
    public GsmPartner find(int id) {
        return null;
    }

    @Override
    public GsmPartner create(GsmPartner entity) {
        GsmPartner partner = new GsmPartner();

        try {
            IGsmPartnerRepository gsmPartnerRepository = EJBAccess.getGsmPartnerRepository();
            partner.setName(entity.getName());
            partner.setEmail(entity.getEmail());
            partner.setPhone(entity.getPhone());
            partner.setPostalCode(entity.getPostalCode());
            partner.setCity(entity.getCity());
            partner.setStreet(entity.getStreet());
            partner.setStreetNumber(entity.getStreetNumber());

            gsmPartnerRepository.create(partner);
        } catch (NamingException e) {
            logger.severe("DB ERROR during GsmPartnerBl.create(Entity entity) method invoked " + e);
        } catch (Exception e) {
            logger.severe("ERROR during GsmPartnerBl.create(Entity entity) method invoked " + e);
        }

        return partner;
    }

    @Override
    public GsmPartner update(GsmPartner entity) {
        if (entity.getId() != null) {
            try {
                IGsmPartnerRepository gsmPartnerRepository = EJBAccess.getGsmPartnerRepository();

                return gsmPartnerRepository.update(entity);

            } catch (NamingException e) {
                logger.severe("DB ERROR during GsmPartnerBl.update(Entity entity) method invoked " + e);
            } catch (Exception e) {
                logger.severe("ERROR during GsmPartnerBl.update(Entity entity) method invoked " + e);
            }

        }


        return null;
    }

    @Override
    public GsmPartner delete(int id) {

        if (id > 0) {
            try {
                IGsmPartnerRepository gsmPartnerRepository = EJBAccess.getGsmPartnerRepository();

                GsmPartner deleted = gsmPartnerRepository.find(id);

                return gsmPartnerRepository.delete(deleted);
            } catch (NamingException e) {
                logger.severe("DB ERROR during GsmPartnerBl.delete(int id) method invoked " + e);
            } catch (Exception e) {
                logger.severe("ERROR during GsmPartnerBl.update(int id) method invoked " + e);
            }
        }

        return null;
    }
}
