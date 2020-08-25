package model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "gsm_device")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "GsmDevice.findAll", query = "SELECT g FROM GsmDevice g WHERE g.deleted = '0' ")
        , @NamedQuery(name = "GsmDevice.findById", query = "SELECT g FROM GsmDevice g WHERE g.id = :id")
        , @NamedQuery(name = "GsmDevice.findByBrand", query = "SELECT g FROM GsmDevice g WHERE g.brand = :brand")
        , @NamedQuery(name = "GsmDevice.findByType", query = "SELECT g FROM GsmDevice g WHERE g.type = :type")
        , @NamedQuery(name = "GsmDevice.findByDeleted", query = "SELECT g FROM GsmDevice g WHERE g.deleted = :deleted")})
public class GsmDevice implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "ID")
    private Integer id;

    @Size(max = 45)
    @Column(name = "BRAND")
    private String brand;
    @Size(max = 45)
    @Column(name = "TYPE")
    private String type;

    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "DELETED")
    @JsonIgnore
    private String deleted;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gsmDeviceId", fetch = FetchType.LAZY)
    private List<GsmItem> gsmItemList = new ArrayList<>();

    public GsmDevice() {
    }

    public GsmDevice(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }

    @XmlTransient
    public List<GsmItem> getGsmItemList() {
        return gsmItemList;
    }

    public void setGsmItemList(List<GsmItem> gsmItemList) {
        this.gsmItemList = gsmItemList;
    }
}
