package model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "gsm_partner")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "GsmPartner.findAll", query = "SELECT g FROM GsmPartner g WHERE g.deleted = '0' ")
        , @NamedQuery(name = "GsmPartner.findById", query = "SELECT g FROM GsmPartner g WHERE g.id = :id")
        , @NamedQuery(name = "GsmPartner.findByName", query = "SELECT g FROM GsmPartner g WHERE g.name = :name")
        , @NamedQuery(name = "GsmPartner.findByEmail", query = "SELECT g FROM GsmPartner g WHERE g.email = :email")
        , @NamedQuery(name = "GsmPartner.findByPhone", query = "SELECT g FROM GsmPartner g WHERE g.phone = :phone")
        , @NamedQuery(name = "GsmPartner.findByPostalCode", query = "SELECT g FROM GsmPartner g WHERE g.postalCode = :postalCode")
        , @NamedQuery(name = "GsmPartner.findByCity", query = "SELECT g FROM GsmPartner g WHERE g.city = :city")
        , @NamedQuery(name = "GsmPartner.findByStreet", query = "SELECT g FROM GsmPartner g WHERE g.street = :street")
        , @NamedQuery(name = "GsmPartner.findByStreetNumber", query = "SELECT g FROM GsmPartner g WHERE g.streetNumber = :streetNumber")
        , @NamedQuery(name = "GsmPartner.findByDeleted", query = "SELECT g FROM GsmPartner g WHERE g.deleted = :deleted")})
public class GsmPartner implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Size(max = 45)
    @Column(name = "NAME")
    private String name;

    @Size(max = 45)
    @Column(name = "EMAIL")
    private String email;

    @Size(max = 45)
    @Column(name = "PHONE")
    private String phone;

    @Size(max = 45)
    @Column(name = "POSTAL_CODE")
    private String postalCode;

    @Size(max = 45)
    @Column(name = "CITY")
    private String city;

    @Size(max = 45)
    @Column(name = "STREET")
    private String street;

    @Size(max = 45)
    @Column(name = "STREET_NUMBER")
    private String streetNumber;

    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "DELETED")
    @JsonIgnore
    private String deleted;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gsmPartnerId")
    private List<GsmStorage> gsmStorageList = new ArrayList<>();


    public GsmPartner() {
    }

    public GsmPartner(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }

    @XmlTransient
    public List<GsmStorage> getGsmStorageList() {
        return gsmStorageList;
    }

    public void setGsmStorageList(List<GsmStorage> gsmStorageList) {
        this.gsmStorageList = gsmStorageList;
    }
}
