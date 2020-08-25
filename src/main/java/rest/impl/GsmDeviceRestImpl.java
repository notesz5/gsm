package rest.impl;

import bl.IGsmDeviceBL;
import model.GsmDevice;
import rest.IGsmDeviceRest;

import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import java.util.List;

@RequestScoped
public class GsmDeviceRestImpl implements IGsmDeviceRest {

    @EJB
    private IGsmDeviceBL gsmDeviceBL;


    @Override
    public List<GsmDevice> getAllGsmDevice() {
        return gsmDeviceBL.findAll();
    }
}
