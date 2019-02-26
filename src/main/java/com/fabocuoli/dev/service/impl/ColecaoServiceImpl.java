package com.fabocuoli.dev.service.impl;

import com.fabocuoli.dev.service.ColecaoService;
import com.fabocuoli.dev.domain.Colecao;
import com.fabocuoli.dev.repository.ColecaoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Colecao.
 */
@Service
@Transactional
public class ColecaoServiceImpl implements ColecaoService {

    private final Logger log = LoggerFactory.getLogger(ColecaoServiceImpl.class);

    private final ColecaoRepository colecaoRepository;

    public ColecaoServiceImpl(ColecaoRepository colecaoRepository) {
        this.colecaoRepository = colecaoRepository;
    }

    /**
     * Save a colecao.
     *
     * @param colecao the entity to save
     * @return the persisted entity
     */
    @Override
    public Colecao save(Colecao colecao) {
        log.debug("Request to save Colecao : {}", colecao);
        return colecaoRepository.save(colecao);
    }

    /**
     * Get all the colecaos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Colecao> findAll() {
        log.debug("Request to get all Colecaos");
        return colecaoRepository.findAll();
    }


    /**
     * Get one colecao by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Colecao> findOne(Long id) {
        log.debug("Request to get Colecao : {}", id);
        return colecaoRepository.findById(id);
    }

    /**
     * Delete the colecao by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Colecao : {}", id);        colecaoRepository.deleteById(id);
    }
}
