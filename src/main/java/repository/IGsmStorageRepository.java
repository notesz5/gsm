package repository;

import model.GsmStorage;

public interface IGsmStorageRepository extends IBaseRepository<GsmStorage> {
    public GsmStorage sell(GsmStorage entity);
}
