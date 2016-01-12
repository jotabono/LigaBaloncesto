package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Socio;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Socio entity.
 */
public interface SocioRepository extends JpaRepository<Socio,Long> {

}
