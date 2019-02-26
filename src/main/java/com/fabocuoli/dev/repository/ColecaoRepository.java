package com.fabocuoli.dev.repository;

import com.fabocuoli.dev.domain.Colecao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Colecao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ColecaoRepository extends JpaRepository<Colecao, Long> {

}
