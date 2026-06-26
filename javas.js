function projete() {
            const html = `
                <ul>
                    <li class="projet-buttons">
                    
                        <button type="button" onclick="projet('Mon Projet')" id="aprojet" class="btn-Proj">Projet</button>
                        <button type="button" onclick="projet('Expérience')" class="btn-Exp">Expérience</button>
                        <button type="button" onclick="projet('Compétence')" class="btn-comp">Compétence</button>
                    </li>
                </ul>
            `;
            document.getElementById("afiche").innerHTML = html;
        }

let videoFocusIndex = null;

const projetsRealises = [
    {
        titre: 'Vidéo 1',
        video: 'videos/projet1.mp4',
        description: 'Décrivez ici comment vous avez développé cette partie du projet.'
    },
    {
        titre: 'Vidéo 2',
        video: 'videos/projet2.mp4',
        description: 'Décrivez ici comment vous avez développé cette partie du projet.'
    },
    {
        titre: 'Vidéo 3',
        video: 'videos/projet3.mp4',
        description: 'Décrivez ici comment vous avez développé cette partie du projet.'
    }
];

function creerCarteVideo(carte, index, mode) {
    const id = mode === 'focus' ? 'video-focus-player' : `video-${index}`;
    const preload = mode === 'grid' ? 'none' : 'metadata';
    const poster = mode === 'focus' ? ' poster="pro2.jpeg"' : '';
    return `
        <article class="video-carte${mode === 'focus' ? ' video-carte--full' : ''}" ${mode === 'grid' ? `onclick="agrandirVideo(${index})"` : ''}>
            <div class="video-wrapper">
                <video id="${id}" controls preload="${preload}"${poster}>
                    <source src="${carte.video}" type="video/mp4">
                    Votre navigateur ne supporte pas la lecture vidéo.
                </video>
            </div>
            <div class="video-description">
                <h4>${carte.titre}</h4>
                <p>${carte.description}</p>
            </div>
        </article>
    `;
}

function voirProjetsRealises() {
    videoFocusIndex = null;
    const cartesHtml = projetsRealises.map((carte, index) => creerCarteVideo(carte, index, 'grid')).join('');

    const contenu = `
        <div class="projet-detail-page">
            <h1 class="titrep">Projets réalisés</h1>
            <div class="video-cartes-row" id="videoGrid">
                ${cartesHtml}
            </div>
            <div class="video-focus" id="videoFocus"></div>
            <div class="fermer-container">
                <button type="button" class="btn-retour" onclick="projet('Mon Projet')">Retour aux projets</button>
                <button type="button" class="btn-fermer" onclick="projete()">Fermer</button>
            </div>
        </div>
    `;

    document.getElementById("afiche").innerHTML = contenu;
}

function agrandirVideo(index) {
    videoFocusIndex = index;
    const carte = projetsRealises[index];
    const ancienneVideo = document.getElementById(`video-${index}`);
    const tempsActuel = ancienneVideo ? ancienneVideo.currentTime : 0;
    const etaitEnLecture = ancienneVideo && !ancienneVideo.paused;

    if (ancienneVideo) ancienneVideo.pause();

    const grid = document.getElementById('videoGrid');
    const focus = document.getElementById('videoFocus');

    focus.innerHTML = `
        <button type="button" class="btn-fermer-video" onclick="fermerVideoFocus()" aria-label="Fermer la vidéo">
            <i class="fa-solid fa-xmark"></i> Fermer
        </button>
        ${creerCarteVideo(carte, index, 'focus')}
    `;

    grid.classList.add('video-grid-hidden');
    focus.classList.add('video-focus-active');

    const nouvelleVideo = document.getElementById('video-focus-player');
    if (nouvelleVideo) {
        nouvelleVideo.currentTime = tempsActuel;
        if (etaitEnLecture) nouvelleVideo.play();
    }
}

function fermerVideoFocus() {
    const focusVideo = document.getElementById('video-focus-player');
    const tempsActuel = focusVideo ? focusVideo.currentTime : 0;
    const etaitEnLecture = focusVideo && !focusVideo.paused;

    if (focusVideo) focusVideo.pause();

    const grid = document.getElementById('videoGrid');
    const focus = document.getElementById('videoFocus');
    if (!grid || !focus) return;

    focus.innerHTML = '';
    focus.classList.remove('video-focus-active');
    grid.classList.remove('video-grid-hidden');

    if (videoFocusIndex !== null) {
        const video = document.getElementById(`video-${videoFocusIndex}`);
        if (video) {
            video.currentTime = tempsActuel;
            if (etaitEnLecture) video.play();
        }
    }
    videoFocusIndex = null;
}

       function projet(type) {
    let contenu = ``;
   if (type === 'Mon Projet') {
  contenu = `
    <h1 class="titrep">Projets & Réalisations</h1>
    <div id="carouselProjets" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselProjets" data-bs-slide-to="0" class="active" aria-current="true"></button>
        <button type="button" data-bs-target="#carouselProjets" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselProjets" data-bs-slide-to="2"></button>
        <button type="button" data-bs-target="#carouselProjets" data-bs-slide-to="3"></button>
        <button type="button" data-bs-target="#carouselProjets" data-bs-slide-to="4"></button>
      </div>

      <div class="carousel-inner">

        <div class="carousel-item active">
          <div class="d-flex justify-content-center">
            <article class="projet-slide">
              <h3>Application Taxi Mali</h3>
              <p>Plateforme pour chauffeurs de taxi, inscription payante et géolocalisation.</p>
              <p class="tech"><i class="fa-brands fa-react"></i> React • <i class="fa-brands fa-bootstrap"></i> Bootstrap • <i class="fa-brands fa-js"></i> JavaScript</p>
            </article>
          </div>
        </div>

        <div class="carousel-item">
          <div class="d-flex justify-content-center">
            <article class="projet-slide">
              <h3>Plateforme Emploi Mali</h3>
              <p>Publication d'offres de stages et mise en relation candidats / entreprises.</p>
              <p class="tech"><i class="fa-brands fa-php"></i> PHP • <i class="fa-solid fa-database"></i> MySQL • <i class="fa-brands fa-js"></i> JavaScript</p>
            </article>
          </div>
        </div>

        <div class="carousel-item">
          <div class="d-flex justify-content-center">
            <article class="projet-slide">
              <h3>E-commerce Multi-vendeurs</h3>
              <p>Plateforme permettant à plusieurs vendeurs de proposer leurs produits.</p>
              <p class="tech"><i class="fa-brands fa-wordpress"></i> WordPress • <i class="fa-brands fa-woocommerce"></i> WooCommerce • <i class="fa-solid fa-database"></i> MySQL</p>
            </article>
          </div>
        </div>

        <div class="carousel-item">
          <div class="d-flex justify-content-center">
            <article class="projet-slide">
              <h3>Réservation de billets</h3>
              <p>Application de réservation de billets pour concerts maliens.</p>
              <p class="tech"><i class="fa-brands fa-python"></i> Python • <i class="fa-brands fa-django"></i> Django • SQLite</p>
            </article>
          </div>
        </div>

        <div class="carousel-item">
          <div class="d-flex justify-content-center">
            <article class="projet-slide">
              <h3>Projet réalisé</h3>
              <p>Découvrez mes projets en vidéo, incluant ICEBERG, mon projet d'intelligence territoriale développé dans le cadre du programme Kesk'IA. Une expérience unique alliant data science et enjeux de protection des données.</p>
              <button type="button" class="btn-voir" onclick="event.stopPropagation(); voirProjetsRealises()"><i class="fa-solid fa-play"></i> Voir</button>
            </article>
          </div>
        </div>

      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselProjets" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Précédent</span>
      </button>

      <button class="carousel-control-next" type="button" data-bs-target="#carouselProjets" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Suivant</span>
      </button>
    </div>
     <!-- Bouton de fermeture -->
    <div class="fermer-container">
      <button type="button" class="btn-fermer" onclick="projete()">Fermer</button>
    </div>
  `;


    } else if (type === 'Expérience') {
  contenu = `
  
  <section id="experiences">
    <h2 class="section-title">Expériences Professionnelles</h2>

    <div id="carouselExperiences" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExperiences" data-bs-slide-to="0" class="active" aria-current="true" aria-label="ICEBERG"></button>
        <button type="button" data-bs-target="#carouselExperiences" data-bs-slide-to="1" aria-label="Stage 1"></button>
        <button type="button" data-bs-target="#carouselExperiences" data-bs-slide-to="2" aria-label="Stage 2"></button>
      </div>

      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-content">
                <div class="timeline-date">2026</div>
                <h3>Data Scientist – Projet ICEBERG (Programme Kesk'IA)</h3>
                <p>Banque des Territoires / Thales / La Poste</p>
                <ul>
                  <li>Conception d'un POC d'intelligence territoriale (IA / données publiques) livré en 3 mois</li>
                  <li>Analyse de données et mise en conformité RGPD</li>
                  <li>Sélectionné parmi 1 200 candidats</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Première expérience -->
        <div class="carousel-item">
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-content">
                <div class="timeline-date">JUILLET - SEPTEMBRE 2025</div>
                <h3>Développeur (stage) - Ouéso</h3>
                <p>Noisy-le-Grand</p>
                <ul>
                  <li>Mise à jour d'un site e-commerce</li>
                  <li>Optimisation SEO</li>
                  <li>Réalisation de diverses tâches informatiques</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Deuxième expérience -->
        <div class="carousel-item">
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-content">
                <div class="timeline-date">MARS - MAI 2024</div>
                <h3>Développeur (stage) - SALEEM</h3>
                <p>Mali</p>
                <ul>
                  <li>Développement complet d'un site e-commerce</li>
                  <li>Intégration : Front-end et Back-end</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Boutons navigation -->
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExperiences" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Précédent</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExperiences" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Suivant</span>
      </button>
    </div>
  </section>
   <!-- Bouton de fermeture -->
    <div class="fermer-container">
      <button type="button" class="btn-fermer" onclick="projete()">Fermer</button>
    </div>
  `;

    } else if (type === 'Compétence') {
        contenu = `
    <h1 class="titrep">Compétences</h1>
    <div id="carouselCompetences" class="carousel slide carousel-competences">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselCompetences" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Front-end"></button>
        <button type="button" data-bs-target="#carouselCompetences" data-bs-slide-to="1" aria-label="Back-end"></button>
        <button type="button" data-bs-target="#carouselCompetences" data-bs-slide-to="2" aria-label="Cybersécurité"></button>
        <button type="button" data-bs-target="#carouselCompetences" data-bs-slide-to="3" aria-label="Outils"></button>
        <button type="button" data-bs-target="#carouselCompetences" data-bs-slide-to="4" aria-label="Langues"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="competence-slide-inner">
            <div class="cadre1">
              <h2>Front-end</h2>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Bootstrap</li>
                <li>Responsive Design</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="competence-slide-inner">
            <div class="cadre2">
              <h2>Back-end</h2>
              <ul>
                <li>PHP</li>
                <li>Python</li>
                <li>API REST</li>
                <li>MySQL</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="competence-slide-inner">
            <div class="cadre3">
              <h2>Cybersécurité (bases)</h2>
              <ul>
                <li>RGPD</li>
                <li>Sécurisation des données</li>
                <li>Administration Linux</li>
                <li>Notions TCP/IP</li>
                <li>Architecture des SI</li>
                <li>Veille cyber</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="competence-slide-inner">
            <div class="cadre3">
              <h2>Outils et Méthodes</h2>
              <ul>
                <li>Git et GitHub</li>
                <li>Agile Scrum</li>
                <li>Trello</li>
                <li>Figma</li>
                <li>UI/UX Design</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="competence-slide-inner">
            <div class="cadre4">
              <h2>Langues</h2>
              <ul>
                <li>Français : Courant</li>
                <li>Anglais : Intermédiaire (B1)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselCompetences" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Précédent</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselCompetences" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Suivant</span>
      </button>
    </div>
    <div class="fermer-container">
      <button type="button" class="btn-fermer" onclick="projete()">Fermer</button>
    </div>
        `;
       
    }
    document.getElementById("afiche").innerHTML = contenu;
    initDynamicCarousels();

}

function initDynamicCarousels() {
    if (typeof bootstrap === 'undefined') return;
    document.querySelectorAll('#afiche .carousel').forEach(el => {
        const instance = bootstrap.Carousel.getInstance(el);
        if (instance) instance.dispose();
        const carousel = new bootstrap.Carousel(el, {
            interval: 5000,
            touch: true,
            wrap: true,
            ride: false
        });
        carousel.cycle();
    });
}

projete();

// Gestion du menu hamburger pour mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav a');
    const body = document.body;
    
    // Fonction pour fermer le menu
    function closeMenu() {
        if (menuToggle && navMenu && navOverlay) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            body.style.overflow = '';
        }
    }
    
    // Fonction pour ouvrir le menu
    function openMenu() {
        if (menuToggle && navMenu && navOverlay) {
            menuToggle.classList.add('active');
            navMenu.classList.add('active');
            navOverlay.classList.add('active');
            body.style.overflow = 'hidden'; // Empêcher le scroll du body
        }
    }
    
    // Toggle menu au clic sur le bouton hamburger
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (window.innerWidth <= 900) {
                if (navMenu.classList.contains('active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            }
        });
    }
    
    // Fermer le menu quand on clique sur l'overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
            contactForm.reset();
        });
    }

    // Smooth scroll et fermeture du menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();

                if (window.innerWidth <= 900) {
                    closeMenu();
                }

                const section = this.getAttribute('data-section');
                if (section) {
                    projet(section);
                }

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.contenare').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    setTimeout(function() {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, window.innerWidth <= 900 ? 300 : 0);
                }
            }
        });
    });
    
    // Fermer le menu si on redimensionne la fenêtre vers un écran plus grand
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
    
    // Empêcher la propagation des clics dans le menu
    if (navMenu) {
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

