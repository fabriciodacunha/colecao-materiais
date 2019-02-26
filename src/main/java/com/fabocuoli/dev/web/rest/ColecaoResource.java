package com.fabocuoli.dev.web.rest;
import com.fabocuoli.dev.domain.Colecao;
import com.fabocuoli.dev.service.ColecaoService;
import com.fabocuoli.dev.web.rest.errors.BadRequestAlertException;
import com.fabocuoli.dev.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Colecao.
 */
@RestController
@RequestMapping("/api")
public class ColecaoResource {

    private final Logger log = LoggerFactory.getLogger(ColecaoResource.class);

    private static final String ENTITY_NAME = "colecao";

    private final ColecaoService colecaoService;

    public ColecaoResource(ColecaoService colecaoService) {
        this.colecaoService = colecaoService;
    }

    /**
     * POST  /colecaos : Create a new colecao.
     *
     * @param colecao the colecao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new colecao, or with status 400 (Bad Request) if the colecao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/colecaos")
    public ResponseEntity<Colecao> createColecao(@RequestBody Colecao colecao) throws URISyntaxException {
        log.debug("REST request to save Colecao : {}", colecao);
        if (colecao.getId() != null) {
            throw new BadRequestAlertException("A new colecao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Colecao result = colecaoService.save(colecao);
        return ResponseEntity.created(new URI("/api/colecaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /colecaos : Updates an existing colecao.
     *
     * @param colecao the colecao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated colecao,
     * or with status 400 (Bad Request) if the colecao is not valid,
     * or with status 500 (Internal Server Error) if the colecao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/colecaos")
    public ResponseEntity<Colecao> updateColecao(@RequestBody Colecao colecao) throws URISyntaxException {
        log.debug("REST request to update Colecao : {}", colecao);
        if (colecao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Colecao result = colecaoService.save(colecao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, colecao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /colecaos : get all the colecaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of colecaos in body
     */
    @GetMapping("/colecaos")
    public List<Colecao> getAllColecaos() {
        log.debug("REST request to get all Colecaos");
        return colecaoService.findAll();
    }

    /**
     * GET  /colecaos/:id : get the "id" colecao.
     *
     * @param id the id of the colecao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the colecao, or with status 404 (Not Found)
     */
    @GetMapping("/colecaos/{id}")
    public ResponseEntity<Colecao> getColecao(@PathVariable Long id) {
        log.debug("REST request to get Colecao : {}", id);
        Optional<Colecao> colecao = colecaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(colecao);
    }

    /**
     * DELETE  /colecaos/:id : delete the "id" colecao.
     *
     * @param id the id of the colecao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/colecaos/{id}")
    public ResponseEntity<Void> deleteColecao(@PathVariable Long id) {
        log.debug("REST request to delete Colecao : {}", id);
        colecaoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
