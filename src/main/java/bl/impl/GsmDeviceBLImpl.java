package bl.impl;

import bl.IGsmDeviceBL;
import model.GsmDevice;
import repository.IGsmDeviceRepository;
import util.EJBAccess;

import javax.ejb.Stateless;
import javax.naming.NamingException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Stateless
public class GsmDeviceBLImpl implements IGsmDeviceBL {

    private Logger logger = Logger.getLogger(GsmStorageBLImpl.class.getName());

    public GsmDeviceBLImpl() {
    }

    @Override
    public List<GsmDevice> findAll() {
        List<GsmDevice> devices = new ArrayList<>();
        try {
            IGsmDeviceRepository gsmDeviceRepository = EJBAccess.getGsmDeviceRepository();
            devices = gsmDeviceRepository.findAll();
        } catch (NamingException e) {
            logger.severe("DB ERROR during GsmDeviceBl.findAll() method invoked");
        } catch (Exception e) {
            logger.severe("DB ERROR during GsmDeviceBl.findAll() method invoked");
        }

        return devices;
    }

    @Override
    public GsmDevice find(int id) {
        return null;
    }

    @Override
    public GsmDevice create(GsmDevice entity) {
        return null;
    }

    @Override
    public GsmDevice update(GsmDevice entity) {
        return null;
    }

    @Override
    public GsmDevice delete(int id) {
        return null;
    }

}

