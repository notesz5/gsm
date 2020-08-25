package rest.impl;

import bl.IGsmStorageBL;
import model.GsmStorage;
import rest.IGsmStorageRest;
import rest.responses.ResponseHandler;

import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;


@RequestScoped
public class GsmStorageRestImpl implements IGsmStorageRest {

    @EJB
    private IGsmStorageBL gsmStorageBL;

    @Override
    public List<GsmStorage> getAllGsmStorage() {
        return gsmStorageBL.findAll();
    }

    @Override
    public GsmStorage getGsmStorage(int id) {
        return gsmStorageBL.find(id);
    }

    @Override
    public Response createGsmStorages(GsmStorage[] entities) {
        ArrayList<GsmStorage> storageItems = new ArrayList<>();

        for (GsmStorage entity : entities) {
            storageItems.add(gsmStorageBL.create(entity));
        }


        return ResponseHandler.storageBuyResponseOk(storageItems);
    }

    @Override
    public Response sellGsmStorage(GsmStorage[] entities) {
        ArrayList<GsmStorage> storageItems = new ArrayList<>();


        for (GsmStorage entity : entities) {
            storageItems.add(gsmStorageBL.sell(entity));
        }

        return ResponseHandler.storageSellResponseOk(storageItems);
    }

    @Override
    public Response updateGsmStorage(GsmStorage entity) {
        gsmStorageBL.update(entity);

        return Response.ok().build();
    }

    @Override
    public Response deleteGsmStorages(int[] ids) {
        ArrayList<GsmStorage> storageItems = new ArrayList<>();

        for (int id : ids) {
            storageItems.add(gsmStorageBL.delete(id));
        }

        return ResponseHandler.storageDeleteResponseOk(storageItems);
    }
}
