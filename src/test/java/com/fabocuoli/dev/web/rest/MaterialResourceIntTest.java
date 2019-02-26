package com.fabocuoli.dev.web.rest;

import com.fabocuoli.dev.ColecaoDeMateriaisApp;

import com.fabocuoli.dev.domain.Material;
import com.fabocuoli.dev.repository.MaterialRepository;
import com.fabocuoli.dev.service.MaterialService;
import com.fabocuoli.dev.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.fabocuoli.dev.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fabocuoli.dev.domain.enumeration.TipoMaterial;
/**
 * Test class for the MaterialResource REST controller.
 *
 * @see MaterialResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ColecaoDeMateriaisApp.class)
public class MaterialResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final TipoMaterial DEFAULT_TIPO = TipoMaterial.AUDIO;
    private static final TipoMaterial UPDATED_TIPO = TipoMaterial.FILME;

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_AUTOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTOR = "BBBBBBBBBB";

    private static final String DEFAULT_PALAVRAS_CHAVE = "AAAAAAAAAA";
    private static final String UPDATED_PALAVRAS_CHAVE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_USUARIO = "AAAAAAAAAA";
    private static final String UPDATED_USUARIO = "BBBBBBBBBB";

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private MaterialService materialService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMaterialMockMvc;

    private Material material;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaterialResource materialResource = new MaterialResource(materialService);
        this.restMaterialMockMvc = MockMvcBuilders.standaloneSetup(materialResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Material createEntity(EntityManager em) {
        Material material = new Material()
            .nome(DEFAULT_NOME)
            .tipo(DEFAULT_TIPO)
            .url(DEFAULT_URL)
            .autor(DEFAULT_AUTOR)
            .palavrasChave(DEFAULT_PALAVRAS_CHAVE)
            .descricao(DEFAULT_DESCRICAO)
            .data(DEFAULT_DATA)
            .usuario(DEFAULT_USUARIO);
        return material;
    }

    @Before
    public void initTest() {
        material = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaterial() throws Exception {
        int databaseSizeBeforeCreate = materialRepository.findAll().size();

        // Create the Material
        restMaterialMockMvc.perform(post("/api/materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(material)))
            .andExpect(status().isCreated());

        // Validate the Material in the database
        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeCreate + 1);
        Material testMaterial = materialList.get(materialList.size() - 1);
        assertThat(testMaterial.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testMaterial.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testMaterial.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testMaterial.getAutor()).isEqualTo(DEFAULT_AUTOR);
        assertThat(testMaterial.getPalavrasChave()).isEqualTo(DEFAULT_PALAVRAS_CHAVE);
        assertThat(testMaterial.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testMaterial.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testMaterial.getUsuario()).isEqualTo(DEFAULT_USUARIO);
    }

    @Test
    @Transactional
    public void createMaterialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = materialRepository.findAll().size();

        // Create the Material with an existing ID
        material.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaterialMockMvc.perform(post("/api/materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(material)))
            .andExpect(status().isBadRequest());

        // Validate the Material in the database
        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMaterials() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get all the materialList
        restMaterialMockMvc.perform(get("/api/materials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(material.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].autor").value(hasItem(DEFAULT_AUTOR.toString())))
            .andExpect(jsonPath("$.[*].palavrasChave").value(hasItem(DEFAULT_PALAVRAS_CHAVE.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO.toString())));
    }
    
    @Test
    @Transactional
    public void getMaterial() throws Exception {
        // Initialize the database
        materialRepository.saveAndFlush(material);

        // Get the material
        restMaterialMockMvc.perform(get("/api/materials/{id}", material.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(material.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.autor").value(DEFAULT_AUTOR.toString()))
            .andExpect(jsonPath("$.palavrasChave").value(DEFAULT_PALAVRAS_CHAVE.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.usuario").value(DEFAULT_USUARIO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMaterial() throws Exception {
        // Get the material
        restMaterialMockMvc.perform(get("/api/materials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaterial() throws Exception {
        // Initialize the database
        materialService.save(material);

        int databaseSizeBeforeUpdate = materialRepository.findAll().size();

        // Update the material
        Material updatedMaterial = materialRepository.findById(material.getId()).get();
        // Disconnect from session so that the updates on updatedMaterial are not directly saved in db
        em.detach(updatedMaterial);
        updatedMaterial
            .nome(UPDATED_NOME)
            .tipo(UPDATED_TIPO)
            .url(UPDATED_URL)
            .autor(UPDATED_AUTOR)
            .palavrasChave(UPDATED_PALAVRAS_CHAVE)
            .descricao(UPDATED_DESCRICAO)
            .data(UPDATED_DATA)
            .usuario(UPDATED_USUARIO);

        restMaterialMockMvc.perform(put("/api/materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMaterial)))
            .andExpect(status().isOk());

        // Validate the Material in the database
        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeUpdate);
        Material testMaterial = materialList.get(materialList.size() - 1);
        assertThat(testMaterial.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testMaterial.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testMaterial.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testMaterial.getAutor()).isEqualTo(UPDATED_AUTOR);
        assertThat(testMaterial.getPalavrasChave()).isEqualTo(UPDATED_PALAVRAS_CHAVE);
        assertThat(testMaterial.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testMaterial.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testMaterial.getUsuario()).isEqualTo(UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void updateNonExistingMaterial() throws Exception {
        int databaseSizeBeforeUpdate = materialRepository.findAll().size();

        // Create the Material

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaterialMockMvc.perform(put("/api/materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(material)))
            .andExpect(status().isBadRequest());

        // Validate the Material in the database
        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMaterial() throws Exception {
        // Initialize the database
        materialService.save(material);

        int databaseSizeBeforeDelete = materialRepository.findAll().size();

        // Delete the material
        restMaterialMockMvc.perform(delete("/api/materials/{id}", material.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Material> materialList = materialRepository.findAll();
        assertThat(materialList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Material.class);
        Material material1 = new Material();
        material1.setId(1L);
        Material material2 = new Material();
        material2.setId(material1.getId());
        assertThat(material1).isEqualTo(material2);
        material2.setId(2L);
        assertThat(material1).isNotEqualTo(material2);
        material1.setId(null);
        assertThat(material1).isNotEqualTo(material2);
    }
}
