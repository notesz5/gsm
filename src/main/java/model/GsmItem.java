package model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "gsm_item")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "GsmItem.findAll", query = "SELECT g FROM GsmItem g WHERE g.deleted = '0' ")
        , @NamedQuery(name = "GsmItem.findById", query = "SELECT g FROM GsmItem g WHERE g.id = :id")
        , @NamedQuery(name = "GsmItem.findByImei", query = "SELECT g FROM GsmItem g WHERE g.imei = :imei")
        , @NamedQuery(name = "GsmItem.findByUsed", query = "SELECT g FROM GsmItem g WHERE g.used = :used")
        , @NamedQuery(name = "GsmItem.findByDeleted", query = "SELECT g FROM GsmItem g WHERE g.deleted = :deleted")})
public class GsmItem implements Serializable {

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gsmItemId")
    private List<GsmStorage> gsmStorageList;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Size(max = 15)
    @Column(name = "IMEI")
    private String imei;

    @Column(name = "USED")
    private boolean used;


    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "DELETED")
    @JsonIgnore
    private String deleted;

    @JoinColumn(name = "GSM_DEVICE_ID", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private GsmDevice gsmDeviceId;
    @JsonIgnore
    @OneToOne(mappedBy = "gsmItemId")
    private GsmStorage gsmStorage;


    public GsmItem() {
    }

    public GsmItem(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImei() {
        return imei;
    }

    public void setImei(String imei) {
        this.imei = imei;
    }

    public boolean getUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }

    public GsmDevice getGsmDeviceId() {
        return gsmDeviceId;
    }

    public void setGsmDeviceId(GsmDevice gsmDeviceId) {
        this.gsmDeviceId = gsmDeviceId;
    }

    public GsmStorage getGsmStorage() {
        return gsmStorage;
    }

    public void setGsmStorage(GsmStorage gsmStorage) {
        this.gsmStorage = gsmStorage;
    }
}