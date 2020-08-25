package bl;

import model.GsmStorage;

public interface IGsmStorageBL extends IGenericBL<GsmStorage> {

    public GsmStorage sell(GsmStorage entity);
}
