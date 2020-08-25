package rest.impl;

import bl.IGsmPartnerBL;
import model.GsmPartner;
import rest.IGsmPartnersRest;
import rest.responses.ResponseHandler;

import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@RequestScoped
public class GsmPartnerRestImpl implements IGsmPartnersRest {

    @EJB
    private IGsmPartnerBL gsmPartnerBL;

    @Override
    public List<GsmPartner> getAllGsmPartner() {
        return gsmPartnerBL.findAll();
    }

    @Override
    public Response createGsmPartners(GsmPartner[] entities) {
        ArrayList<GsmPartner> partners = new ArrayList<>();

        for (GsmPartner entity : entities) {
            partners.add(gsmPartnerBL.create(entity));
        }

        return ResponseHandler.partnerAddResponseOk(partners);
    }

    @Override
    public Response updateGsmPartner(GsmPartner entity) {
        GsmPartner updated = gsmPartnerBL.update(entity);

        return ResponseHandler.partnerUpdateResponseOk(updated);
    }

    @Override
    public Response deleteGsmPartners(int[] partnerIds) {
        ArrayList<GsmPartner> partners = new ArrayList<>();

        for (int i = 0; i < partnerIds.length ; i++) {
            partners.add(gsmPartnerBL.delete(partnerIds[i]));
        }

        return ResponseHandler.partnerDeleteResponseOk(partners);
    }
}
