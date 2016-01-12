package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Application;
import com.mycompany.myapp.domain.Entrenador;
import com.mycompany.myapp.repository.EntrenadorRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the EntrenadorResource REST controller.
 *
 * @see EntrenadorResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class EntrenadorResourceTest {

    private static final String DEFAULT_NOMBRE_ENTRENADOR = "AAAAA";
    private static final String UPDATED_NOMBRE_ENTRENADOR = "BBBBB";
    private static final String DEFAULT_EQUIPO_ENTRENADOR = "AAAAA";
    private static final String UPDATED_EQUIPO_ENTRENADOR = "BBBBB";

    @Inject
    private EntrenadorRepository entrenadorRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restEntrenadorMockMvc;

    private Entrenador entrenador;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        EntrenadorResource entrenadorResource = new EntrenadorResource();
        ReflectionTestUtils.setField(entrenadorResource, "entrenadorRepository", entrenadorRepository);
        this.restEntrenadorMockMvc = MockMvcBuilders.standaloneSetup(entrenadorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        entrenador = new Entrenador();
        entrenador.setNombreEntrenador(DEFAULT_NOMBRE_ENTRENADOR);
        entrenador.setEquipoEntrenador(DEFAULT_EQUIPO_ENTRENADOR);
    }

    @Test
    @Transactional
    public void createEntrenador() throws Exception {
        int databaseSizeBeforeCreate = entrenadorRepository.findAll().size();

        // Create the Entrenador

        restEntrenadorMockMvc.perform(post("/api/entrenadors")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(entrenador)))
                .andExpect(status().isCreated());

        // Validate the Entrenador in the database
        List<Entrenador> entrenadors = entrenadorRepository.findAll();
        assertThat(entrenadors).hasSize(databaseSizeBeforeCreate + 1);
        Entrenador testEntrenador = entrenadors.get(entrenadors.size() - 1);
        assertThat(testEntrenador.getNombreEntrenador()).isEqualTo(DEFAULT_NOMBRE_ENTRENADOR);
        assertThat(testEntrenador.getEquipoEntrenador()).isEqualTo(DEFAULT_EQUIPO_ENTRENADOR);
    }

    @Test
    @Transactional
    public void getAllEntrenadors() throws Exception {
        // Initialize the database
        entrenadorRepository.saveAndFlush(entrenador);

        // Get all the entrenadors
        restEntrenadorMockMvc.perform(get("/api/entrenadors"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(entrenador.getId().intValue())))
                .andExpect(jsonPath("$.[*].nombreEntrenador").value(hasItem(DEFAULT_NOMBRE_ENTRENADOR.toString())))
                .andExpect(jsonPath("$.[*].equipoEntrenador").value(hasItem(DEFAULT_EQUIPO_ENTRENADOR.toString())));
    }

    @Test
    @Transactional
    public void getEntrenador() throws Exception {
        // Initialize the database
        entrenadorRepository.saveAndFlush(entrenador);

        // Get the entrenador
        restEntrenadorMockMvc.perform(get("/api/entrenadors/{id}", entrenador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(entrenador.getId().intValue()))
            .andExpect(jsonPath("$.nombreEntrenador").value(DEFAULT_NOMBRE_ENTRENADOR.toString()))
            .andExpect(jsonPath("$.equipoEntrenador").value(DEFAULT_EQUIPO_ENTRENADOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntrenador() throws Exception {
        // Get the entrenador
        restEntrenadorMockMvc.perform(get("/api/entrenadors/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntrenador() throws Exception {
        // Initialize the database
        entrenadorRepository.saveAndFlush(entrenador);

		int databaseSizeBeforeUpdate = entrenadorRepository.findAll().size();

        // Update the entrenador
        entrenador.setNombreEntrenador(UPDATED_NOMBRE_ENTRENADOR);
        entrenador.setEquipoEntrenador(UPDATED_EQUIPO_ENTRENADOR);

        restEntrenadorMockMvc.perform(put("/api/entrenadors")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(entrenador)))
                .andExpect(status().isOk());

        // Validate the Entrenador in the database
        List<Entrenador> entrenadors = entrenadorRepository.findAll();
        assertThat(entrenadors).hasSize(databaseSizeBeforeUpdate);
        Entrenador testEntrenador = entrenadors.get(entrenadors.size() - 1);
        assertThat(testEntrenador.getNombreEntrenador()).isEqualTo(UPDATED_NOMBRE_ENTRENADOR);
        assertThat(testEntrenador.getEquipoEntrenador()).isEqualTo(UPDATED_EQUIPO_ENTRENADOR);
    }

    @Test
    @Transactional
    public void deleteEntrenador() throws Exception {
        // Initialize the database
        entrenadorRepository.saveAndFlush(entrenador);

		int databaseSizeBeforeDelete = entrenadorRepository.findAll().size();

        // Get the entrenador
        restEntrenadorMockMvc.perform(delete("/api/entrenadors/{id}", entrenador.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Entrenador> entrenadors = entrenadorRepository.findAll();
        assertThat(entrenadors).hasSize(databaseSizeBeforeDelete - 1);
    }
}
