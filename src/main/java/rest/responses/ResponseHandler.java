package rest.responses;

import model.GsmPartner;
import model.GsmStorage;

import javax.ws.rs.core.Response;
import java.util.ArrayList;

public class ResponseHandler {

    public static Response sendLoginResponseOK(String username, String token){
           return Response.ok(new LoginResponse(username, token)).build();
    }

    public static Response sendLoginResponseBad(){
        String message = "Authentication Failed.";
        return Response.ok(new SampleResponse(message)).build();
    }

    public static Response storageBuyResponseOk(ArrayList<GsmStorage> storageItems) {
        return Response.ok().entity(storageItems).build();
    }

    public static Response storageSellResponseOk(ArrayList<GsmStorage> storageItems) {
        return Response.ok().entity(storageItems).build();
    }

    public static Response storageDeleteResponseOk(ArrayList<GsmStorage> storageItems) {
        return Response.ok().entity(storageItems).build();
    }

    public static Response partnerAddResponseOk(ArrayList<GsmPartner> partners) {
        return Response.ok().entity(partners).build();
    }

    public static Response partnerUpdateResponseOk(GsmPartner  partner) {
        return Response.ok().entity(partner).build();
    }
    public static Response partnerDeleteResponseOk(ArrayList<GsmPartner>  partners) {
        return Response.ok().entity(partners).build();
    }
}


