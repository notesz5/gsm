package rest;

import model.GsmStorage;

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("storage")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_JSON})
public interface IGsmStorageRest {

    @GET
    List<GsmStorage> getAllGsmStorage();

    @GET
    @Path("id")
    GsmStorage getGsmStorage(@PathParam("id") int id);

    @POST
    @Path("/buy")
    Response createGsmStorages(GsmStorage[] entities);

    @POST
    @Path("/sell")
    Response sellGsmStorage(GsmStorage[] entities);

    @POST
    @Path("/update")
    Response updateGsmStorage(GsmStorage entity);

    @POST
    @Path("/delete")
    Response deleteGsmStorages(int[] ids);



}
