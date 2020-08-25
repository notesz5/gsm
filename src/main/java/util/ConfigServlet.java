package util;

import repository.*;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import java.util.HashMap;
import java.util.Locale;

public class ConfigServlet extends HttpServlet {

    private static HashMap<String, Object> localInterfaces = new HashMap<String, Object>();

    @EJB
    private IGsmDeviceRepositoryLocal gsmDeviceRepositoryLocal;

    @EJB
    private IGsmItemRepositoryLocal gsmItemRepositoryLocal;

    @EJB
    private IGsmPartnerRepositoryLocal gsmPartnerRepositoryLocal;

    @EJB
    private IGsmStorageRepositoryLocal gsmStorageRepositoryLocal;

    @EJB
    private IUserRepositoryLocal userRepositoryLocal;

    @Override
    public void init() throws ServletException {
        localInterfaces.put(IGsmDeviceRepositoryLocal.class.getName(), gsmDeviceRepositoryLocal);
        localInterfaces.put(IGsmItemRepositoryLocal.class.getName(), gsmItemRepositoryLocal);
        localInterfaces.put(IGsmPartnerRepositoryLocal.class.getName(), gsmPartnerRepositoryLocal);
        localInterfaces.put(IGsmStorageRepositoryLocal.class.getName(), gsmStorageRepositoryLocal);
        localInterfaces.put(IUserRepositoryLocal.class.getName(), userRepositoryLocal);

        Locale.setDefault(new Locale("hu", "HU"));
    }

    static HashMap<String, Object> getLocalInterfaces() {
        return localInterfaces;
    }
    
}