package rest;


import model.GsmPartner;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("partners")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_JSON})
public interface IGsmPartnersRest {

    @GET
    List<GsmPartner> getAllGsmPartner();

    @POST
    @Path("/add")
    Response createGsmPartners(GsmPartner[] entities);

    @POST
    @Path("/update")
    Response updateGsmPartner(GsmPartner entity);

    @POST
    @Path("/delete")
    Response deleteGsmPartners(int[] ids);

}
