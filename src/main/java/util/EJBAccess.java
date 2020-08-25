package util;

import repository.*;

import javax.naming.NamingException;

public class EJBAccess {
    public static IGsmDeviceRepository getGsmDeviceRepository() throws NamingException {
        return (IGsmDeviceRepository) lookup(IGsmDeviceRepositoryLocal.class.getName());
    }

    public static IGsmItemRepository getGsmItemRepository() throws NamingException {
        return (IGsmItemRepository) lookup(IGsmItemRepositoryLocal.class.getName());
    }

    public static IGsmPartnerRepository getGsmPartnerRepository() throws NamingException {
        return (IGsmPartnerRepository) lookup(IGsmPartnerRepositoryLocal.class.getName());
    }

    public static IGsmStorageRepository getGsmStorageRepository() throws NamingException {
        return (IGsmStorageRepository) lookup(IGsmStorageRepositoryLocal.class.getName());
    }

    public static IUserRepository getUserRepository() throws NamingException {
        return (IUserRepository) lookup(IUserRepositoryLocal.class.getName());
    }

    private static Object lookup(String localClass) {
        return ConfigServlet.getLocalInterfaces().get(localClass);
    }
}
