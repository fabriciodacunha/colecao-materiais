package com.fabocuoli.dev.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.fabocuoli.dev.domain.enumeration.TipoMaterial;

/**
 * A Material.
 */
@Entity
@Table(name = "material")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Material implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoMaterial tipo;

    @Column(name = "url")
    private String url;

    @Column(name = "autor")
    private String autor;

    @Column(name = "palavras_chave")
    private String palavrasChave;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "usuario")
    private String usuario;

    @OneToOne
    @JoinColumn(unique = true)
    private Colecao colecao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Material nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoMaterial getTipo() {
        return tipo;
    }

    public Material tipo(TipoMaterial tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoMaterial tipo) {
        this.tipo = tipo;
    }

    public String getUrl() {
        return url;
    }

    public Material url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAutor() {
        return autor;
    }

    public Material autor(String autor) {
        this.autor = autor;
        return this;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getPalavrasChave() {
        return palavrasChave;
    }

    public Material palavrasChave(String palavrasChave) {
        this.palavrasChave = palavrasChave;
        return this;
    }

    public void setPalavrasChave(String palavrasChave) {
        this.palavrasChave = palavrasChave;
    }

    public String getDescricao() {
        return descricao;
    }

    public Material descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getData() {
        return data;
    }

    public Material data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getUsuario() {
        return usuario;
    }

    public Material usuario(String usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Colecao getColecao() {
        return colecao;
    }

    public Material colecao(Colecao colecao) {
        this.colecao = colecao;
        return this;
    }

    public void setColecao(Colecao colecao) {
        this.colecao = colecao;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Material material = (Material) o;
        if (material.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), material.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Material{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", url='" + getUrl() + "'" +
            ", autor='" + getAutor() + "'" +
            ", palavrasChave='" + getPalavrasChave() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", data='" + getData() + "'" +
            ", usuario='" + getUsuario() + "'" +
            "}";
    }
}
