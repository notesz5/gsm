package model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;


@Entity
@Table(name = "gsm_storage")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "GsmStorage.findAll", query = "SELECT g FROM GsmStorage g WHERE g.deleted = '0'")
        , @NamedQuery(name = "GsmStorage.findById", query = "SELECT g FROM GsmStorage g WHERE g.id = :id")
        , @NamedQuery(name = "GsmStorage.findBySold", query = "SELECT g FROM GsmStorage g WHERE g.sold = :sold")
        , @NamedQuery(name = "GsmStorage.findByBuyPrice", query = "SELECT g FROM GsmStorage g WHERE g.buyPrice = :buyPrice")
        , @NamedQuery(name = "GsmStorage.findBySalePrice", query = "SELECT g FROM GsmStorage g WHERE g.salePrice = :salePrice")
        , @NamedQuery(name = "GsmStorage.findByDeleted", query = "SELECT g FROM GsmStorage g WHERE g.deleted = :deleted")})
public class GsmStorage implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "BUY_PRICE")
    private Double buyPrice;

    @Column(name = "SALE_PRICE")
    private Double salePrice;

    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "DELETED")
    @JsonIgnore
    private String deleted;

    @OneToOne(optional = false)
    @JoinColumn(name = "GSM_ITEM_ID", referencedColumnName = "ID")
    private GsmItem gsmItemId;

    @JoinColumn(name = "GSM_PARTNER_ID", referencedColumnName = "ID")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private GsmPartner gsmPartnerId;

    @JoinColumn(name = "GSM_PARTNER2_ID", referencedColumnName = "ID")
    @ManyToOne
    private GsmPartner gsmPartner2Id;

    @Column(name = "SOLD")
    private Boolean sold;

    public GsmStorage() {
    }

    public GsmStorage(Integer id) {
        this.id = id;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Double getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(Double buyPrice) {
        this.buyPrice = buyPrice;
    }

    public Double getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(Double salePrice) {
        this.salePrice = salePrice;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }

    public GsmItem getGsmItemId() {
        return gsmItemId;
    }

    public void setGsmItemId(GsmItem gsmItemId) {
        this.gsmItemId = gsmItemId;
    }

    public GsmPartner getGsmPartnerId() {
        return gsmPartnerId;
    }

    public void setGsmPartnerId(GsmPartner gsmPartnerId) {
        this.gsmPartnerId = gsmPartnerId;
    }

    public Boolean getSold() {
        return sold;
    }

    public void setSold(Boolean sold) {
        this.sold = sold;
    }

    public GsmPartner getGsmPartner2Id() {
        return gsmPartner2Id;
    }

    public void setGsmPartner2Id(GsmPartner gsmPartner2Id) {
        this.gsmPartner2Id = gsmPartner2Id;
    }
}
