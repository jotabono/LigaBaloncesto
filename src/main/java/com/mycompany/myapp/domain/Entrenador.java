package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Entrenador.
 */
@Entity
@Table(name = "entrenador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Entrenador implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nombre_entrenador")
    private String nombreEntrenador;

    @Column(name = "equipo_entrenador")
    private String equipoEntrenador;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreEntrenador() {
        return nombreEntrenador;
    }

    public void setNombreEntrenador(String nombreEntrenador) {
        this.nombreEntrenador = nombreEntrenador;
    }

    public String getEquipoEntrenador() {
        return equipoEntrenador;
    }

    public void setEquipoEntrenador(String equipoEntrenador) {
        this.equipoEntrenador = equipoEntrenador;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Entrenador entrenador = (Entrenador) o;

        if ( ! Objects.equals(id, entrenador.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Entrenador{" +
            "id=" + id +
            ", nombreEntrenador='" + nombreEntrenador + "'" +
            ", equipoEntrenador='" + equipoEntrenador + "'" +
            '}';
    }
}
