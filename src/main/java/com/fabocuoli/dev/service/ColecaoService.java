package com.fabocuoli.dev.service;

import com.fabocuoli.dev.domain.Colecao;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Colecao.
 */
public interface ColecaoService {

    /**
     * Save a colecao.
     *
     * @param colecao the entity to save
     * @return the persisted entity
     */
    Colecao save(Colecao colecao);

    /**
     * Get all the colecaos.
     *
     * @return the list of entities
     */
    List<Colecao> findAll();


    /**
     * Get the "id" colecao.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Colecao> findOne(Long id);

    /**
     * Delete the "id" colecao.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
