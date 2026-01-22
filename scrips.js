// ✅ Esperamos que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
  // === Efectos de scroll y animaciones ===
  initScrollAnimations();
  
  // === Efectos de partículas en el hero ===
  initParticleEffect();
  // === Manejo de formulario de contacto ===
  const form = document.getElementById("form-contacto");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtenemos los valores
      const nombre = form.querySelector('input[type="text"]').value.trim();
      const correo = form.querySelector('input[type="email"]').value.trim();
      const mensaje = form.querySelector('textarea').value.trim();

      // Validaciones básicas
      if (!nombre || !correo || !mensaje) {
        alert("⚠️ Por favor completa todos los campos.");
        return;
      }

      // Validación rápida del correo
      const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexCorreo.test(correo)) {
        alert("⚠️ Ingresa un correo válido.");
        return;
      }

      // Simulación de envío
      alert(`✅ Gracias ${nombre}, tu mensaje ha sido enviado correctamente. Te contactaremos pronto.`);

      // Limpiar formulario
      form.reset();
    });
  }

  // === Acción de añadir combos ===
  document.querySelectorAll(".btn-comprar").forEach(boton => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      const combo = e.target.closest('.card').querySelector('h3').textContent;
      const comboType = e.target.dataset.combo;
      
      // Guardar información del combo en localStorage
      const comboInfo = {
        nombre: combo,
        tipo: comboType,
        precio: e.target.closest('.card').querySelector('.precio').textContent,
        plataformas: getPlataformasIncluidas(combo)
      };
      
      localStorage.setItem('comboSeleccionado', JSON.stringify(comboInfo));
      
      // Redirigir a la página de selección de plataformas
      window.location.href = 'carrito.html';
    });
  });

  // === Carrusel de fondo del HERO - CÓDIGO CORREGIDO ===
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dots button");
  const prevBtn = document.querySelector(".hero-nav.prev");
  const nextBtn = document.querySelector(".hero-nav.next");
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    // Función para mostrar un slide específico
    function showSlide(n) {
      // Remover la clase active de todos los slides y dots
      slides.forEach(slide => slide.classList.remove("active"));
      dots.forEach(dot => dot.classList.remove("active"));
      
      // Ajustar el índice si es necesario
      if (n >= slides.length) currentSlide = 0;
      else if (n < 0) currentSlide = slides.length - 1;
      else currentSlide = n;
      
      // Añadir la clase active al slide y dot actual
      if (slides[currentSlide]) {
        slides[currentSlide].classList.add("active");
      }
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
      }
      
      // Debug: mostrar en consola qué slide se está mostrando
      console.log(`Mostrando slide ${currentSlide + 1} de ${slides.length}`);
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    // Iniciar el carrusel automático
    function startSlideShow() {
      slideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }

    // Detener el carrusel automático
    function stopSlideShow() {
      clearInterval(slideInterval);
    }

    // Event listeners para los botones de navegación
    if (nextBtn) {
      nextBtn.addEventListener("click", function() {
        stopSlideShow();
        nextSlide();
        startSlideShow();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function() {
        stopSlideShow();
        prevSlide();
        startSlideShow();
      });
    }

    // Event listeners para los dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function(e) {
        e.preventDefault();
        stopSlideShow();
        showSlide(index);
        startSlideShow();
      });
    });

    // Pausar el carrusel cuando el ratón está sobre él
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      heroSection.addEventListener("mouseenter", stopSlideShow);
      heroSection.addEventListener("mouseleave", startSlideShow);
    }

    // Iniciar el carrusel
    startSlideShow();
  }
});

// === Funciones adicionales para efectos visuales ===

// Efectos de scroll y animaciones
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observar todas las tarjetas y secciones
  document.querySelectorAll('.card, section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Efecto de partículas en el hero
function initParticleEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const particleContainer = document.createElement('div');
  particleContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  `;
  hero.appendChild(particleContainer);

  // Crear partículas flotantes
  for (let i = 0; i < 50; i++) {
    createParticle(particleContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  const size = Math.random() * 4 + 1;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;

  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
    border-radius: 50%;
    left: ${x}%;
    top: ${y}%;
    animation: float ${duration}s ${delay}s infinite linear;
  `;

  container.appendChild(particle);
}

// Agregar animación CSS para las partículas
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// === Funciones para la página de carrito ===

// Función para obtener plataformas incluidas según el combo
function getPlataformasIncluidas(combo) {
  switch(combo) {
    case 'Platino':
      return 3;
    case 'Diamante':
      return 4;
    case 'Deluxe':
      return 5;
    case 'Premium':
      return 999; // Todas las plataformas
    default:
      return 3;
  }
}

// Función para cargar información del combo
function cargarComboSeleccionado() {
  const comboInfo = JSON.parse(localStorage.getItem('comboSeleccionado') || '{}');
  
  if (comboInfo.nombre) {
    document.getElementById('combo-nombre').textContent = comboInfo.nombre;
    document.getElementById('precio-base').textContent = comboInfo.precio;
    document.getElementById('plataformas-incluidas').textContent = comboInfo.plataformas;
    
    // Establecer el combo seleccionado en el selector
    const comboSelect = document.getElementById('combo-select');
    if (comboSelect && comboInfo.tipo) {
      comboSelect.value = comboInfo.tipo;
    }
  }
}

// Función para cambiar combo
function cambiarCombo(nuevoCombo) {
  const combos = {
    'platino': { nombre: 'Platino', precio: '$30.000', plataformas: 3 },
    'diamante': { nombre: 'Diamante', precio: '$42.000', plataformas: 4 },
    'deluxe': { nombre: 'Deluxe', precio: '$50.000', plataformas: 5 },
    'premium': { nombre: 'Premium', precio: '$60.000', plataformas: 999 }
  };
  
  const combo = combos[nuevoCombo];
  if (combo) {
    document.getElementById('combo-nombre').textContent = combo.nombre;
    document.getElementById('precio-base').textContent = combo.precio;
    document.getElementById('plataformas-incluidas').textContent = combo.plataformas;
    
    // Actualizar localStorage
    const comboInfo = {
      nombre: combo.nombre,
      tipo: nuevoCombo,
      precio: combo.precio,
      plataformas: combo.plataformas
    };
    localStorage.setItem('comboSeleccionado', JSON.stringify(comboInfo));
    
    return combo;
  }
  return null;
}

// Precios base de las plataformas
const preciosPlataformas = {
  'Netflix': 15000,
  'Prime Video': 12000,
  'Max': 12000,
  'Disney+': 12000,
  'Disney+ Premium': 15000,
  'Crunchyroll': 12000,
  'ViX': 12000,
  'Paramount+': 12000
};

// Función para calcular precio con límite de combo
function calcularPrecioConLimite(plataformasSeleccionadas, comboActual) {
  const limitesCombo = {
    'platino': 30000,   // $30,000 para 3 plataformas
    'diamante': 42000,  // $42,000 para 4 plataformas
    'deluxe': 50000,    // $50,000 para 5 plataformas
    'premium': 60000    // $60,000 para todas las plataformas
  };
  
  let totalPlataformasCombo = 0;
  let tieneNetflix = false;
  const limiteCombo = limitesCombo[comboActual] || 30000;
  
  // Separar Netflix de las plataformas del combo (Netflix es invisible al sistema de combos)
  const plataformasCombo = plataformasSeleccionadas.filter(plataforma => {
    if (plataforma.nombre === 'Netflix') {
      tieneNetflix = true;
      return false; // Netflix no cuenta para el combo
    }
    return true; // Las demás plataformas sí cuentan para el combo
  });
  
  // Calcular total solo de las plataformas del combo (sin Netflix)
  plataformasCombo.forEach(plataforma => {
    const precioBase = preciosPlataformas[plataforma.nombre] || plataforma.precio;
    totalPlataformasCombo += precioBase;
  });
  
  // Aplicar límite solo a las plataformas del combo (Netflix es independiente)
  let precioPlataformasCombo = totalPlataformasCombo;
  let ajusteAplicado = false;
  let factorAjuste = 1;
  
  if (totalPlataformasCombo > limiteCombo) {
    factorAjuste = limiteCombo / totalPlataformasCombo;
    precioPlataformasCombo = limiteCombo;
    ajusteAplicado = true;
  }
  
  // Calcular precio final: plataformas del combo (ajustadas) + Netflix (fijo e independiente)
  const precioNetflix = tieneNetflix ? 15000 : 0;
  const precioFinal = precioPlataformasCombo + precioNetflix;
  const precioOriginal = totalPlataformasCombo + precioNetflix;
  
  return {
    total: Math.round(precioFinal),
    precioOriginal: precioOriginal,
    limiteCombo: limiteCombo,
    ajusteAplicado: ajusteAplicado,
    factorAjuste: factorAjuste,
    ahorro: precioOriginal - precioFinal,
    tieneNetflix: tieneNetflix,
    precioNetflix: precioNetflix,
    precioPlataformasCombo: precioPlataformasCombo,
    plataformasCombo: plataformasCombo // Solo las plataformas que cuentan para el combo
  };
}

// Función para manejar la selección de plataformas
function initSeleccionPlataformas() {
  const plataformas = document.querySelectorAll('.plataforma-card');
  const carritoLista = document.getElementById('carrito-lista');
  const totalPrecio = document.getElementById('total-precio');
  const btnFinalizar = document.getElementById('btn-finalizar');
  const comboSelect = document.getElementById('combo-select');
  
  let plataformasSeleccionadas = [];
  let comboActual = 'platino'; // Combo por defecto
  
  // Cargar combo seleccionado
  cargarComboSeleccionado();
  
  // Obtener combo actual del localStorage
  const comboInfo = JSON.parse(localStorage.getItem('comboSeleccionado') || '{}');
  if (comboInfo.tipo) {
    comboActual = comboInfo.tipo;
  }
  
  // Manejar cambio de combo
  if (comboSelect) {
    comboSelect.addEventListener('change', (e) => {
      const nuevoCombo = e.target.value;
      const combo = cambiarCombo(nuevoCombo);
      
      if (combo) {
        comboActual = nuevoCombo;
        
        // Verificar si las plataformas del combo (sin Netflix) exceden el nuevo límite
        const limitePlataformas = combo.plataformas;
        const plataformasCombo = plataformasSeleccionadas.filter(p => p.nombre !== 'Netflix');
        if (plataformasCombo.length > limitePlataformas) {
          // Mostrar mensaje de confirmación
          const confirmar = confirm(
            `Tu combo actual permite ${limitePlataformas} plataforma(s) del combo, pero tienes ${plataformasCombo.length} seleccionada(s) (Netflix no cuenta para el límite del combo).\n\n¿Deseas mantener las plataformas seleccionadas y cambiar automáticamente a un combo compatible?`
          );
          
          if (confirmar) {
            // Cambiar automáticamente al combo apropiado (basado en plataformas del combo, no Netflix)
            if (plataformasCombo.length >= 8) {
              cambiarCombo('premium');
              comboActual = 'premium';
            } else if (plataformasCombo.length >= 5) {
              cambiarCombo('deluxe');
              comboActual = 'deluxe';
            } else if (plataformasCombo.length >= 4) {
              cambiarCombo('diamante');
              comboActual = 'diamante';
            } else if (plataformasCombo.length >= 3) {
              cambiarCombo('platino');
              comboActual = 'platino';
            }
          } else {
            // Revertir la selección
            comboSelect.value = comboActual;
            return;
          }
        }
        
        actualizarCarrito();
      }
    });
  }
  
  plataformas.forEach(plataforma => {
    const boton = plataforma.querySelector('.btn-plataforma');
    const nombre = plataforma.dataset.nombre;
    const precio = preciosPlataformas[nombre] || parseInt(plataforma.dataset.precio);
    
    boton.addEventListener('click', () => {
      const estaSeleccionada = plataformasSeleccionadas.find(p => p.nombre === nombre);
      
      if (estaSeleccionada) {
        // Remover de la selección
        plataformasSeleccionadas = plataformasSeleccionadas.filter(p => p.nombre !== nombre);
        plataforma.classList.remove('seleccionada');
        boton.classList.remove('seleccionado');
        boton.querySelector('.btn-texto').textContent = 'Añadir';
      } else {
        // Obtener límite del combo actual
        const comboInfo = JSON.parse(localStorage.getItem('comboSeleccionado') || '{}');
        const limitePlataformas = comboInfo.plataformas || 1;
        
        // Verificar si se puede agregar más plataformas (Netflix no cuenta para el límite)
        const plataformasCombo = plataformasSeleccionadas.filter(p => p.nombre !== 'Netflix');
        if (plataformasCombo.length >= limitePlataformas && limitePlataformas !== 999) {
          // Mostrar opciones de actualización de combo
          const mensaje = `Tu combo actual (${comboInfo.nombre || 'Platino'}) permite solo ${limitePlataformas} plataforma(s) del combo (Netflix no cuenta para el límite).\n\n¿Qué deseas hacer?\n\n1. Actualizar a combo Diamante (4 plataformas)\n2. Actualizar a combo Deluxe (5 plataformas)\n3. Actualizar a combo Premium (todas las plataformas)\n4. Cancelar`;
          
          const opcion = confirm(mensaje + '\n\n¿Actualizar a combo Diamante?');
          
          if (opcion) {
            // Actualizar a combo Diamante
            cambiarCombo('diamante');
            comboActual = 'diamante';
            comboSelect.value = 'diamante';
            
            // Agregar la plataforma
            plataformasSeleccionadas.push({ nombre, precio });
            plataforma.classList.add('seleccionada');
            boton.classList.add('seleccionado');
            boton.querySelector('.btn-texto').textContent = 'Quitar';
          } else {
            // Preguntar por combo Deluxe
            const opcionDeluxe = confirm('¿Actualizar a combo Deluxe (5 plataformas)?');
            
            if (opcionDeluxe) {
              // Actualizar a combo Deluxe
              cambiarCombo('deluxe');
              comboActual = 'deluxe';
              comboSelect.value = 'deluxe';
              
              // Agregar la plataforma
              plataformasSeleccionadas.push({ nombre, precio });
              plataforma.classList.add('seleccionada');
              boton.classList.add('seleccionado');
              boton.querySelector('.btn-texto').textContent = 'Quitar';
            } else {
              // Preguntar por combo Premium
              const opcionPremium = confirm('¿Actualizar a combo Premium (todas las plataformas)?');
              
              if (opcionPremium) {
                // Actualizar a combo Premium
                cambiarCombo('premium');
                comboActual = 'premium';
                comboSelect.value = 'premium';
                
                // Agregar la plataforma
                plataformasSeleccionadas.push({ nombre, precio });
                plataforma.classList.add('seleccionada');
                boton.classList.add('seleccionado');
                boton.querySelector('.btn-texto').textContent = 'Quitar';
              }
              // Si no se selecciona ninguna opción, no se agrega la plataforma
            }
          }
        } else {
          // Agregar a la selección normalmente
        plataformasSeleccionadas.push({ nombre, precio });
        plataforma.classList.add('seleccionada');
        boton.classList.add('seleccionado');
        boton.querySelector('.btn-texto').textContent = 'Quitar';
        }
      }
      
      actualizarCarrito();
    });
  });
  
  function actualizarCarrito() {
    // Obtener combo actual
    const comboInfo = JSON.parse(localStorage.getItem('comboSeleccionado') || '{}');
    const comboActual = comboInfo.tipo || 'basico';
    
    // Calcular precios con límite de combo
    const calculoPrecios = calcularPrecioConLimite(plataformasSeleccionadas, comboActual);
    
    // Actualizar lista del carrito
    if (plataformasSeleccionadas.length === 0) {
      carritoLista.innerHTML = '<p class="carrito-vacio">No hay plataformas seleccionadas</p>';
    } else {
      let html = '';
      
      // Mostrar primero las plataformas del combo
      calculoPrecios.plataformasCombo.forEach(plataforma => {
        const precioBase = preciosPlataformas[plataforma.nombre] || plataforma.precio;
        let precioFinal = precioBase;
        let esAjustado = false;
        
        if (calculoPrecios.ajusteAplicado) {
          precioFinal = Math.round(precioBase * calculoPrecios.factorAjuste);
          esAjustado = true;
        }
        
        html += `
          <div class="carrito-item">
            <span>${plataforma.nombre}</span>
            <span>
              ${esAjustado ? `<del>$${precioBase.toLocaleString()}</del> ` : ''}
              $${precioFinal.toLocaleString()}
              ${esAjustado ? '<span style="color: #00C853; font-size: 0.8em;">(ajustado)</span>' : ''}
            </span>
          </div>
        `;
      });
      
      // Mostrar Netflix por separado si está seleccionado
      if (calculoPrecios.tieneNetflix) {
        html += `
          <div class="carrito-item" style="border-top: 1px solid rgba(255, 102, 0, 0.3); padding-top: 10px; margin-top: 10px;">
            <span style="color: #FF6600; font-weight: bold;">🍿 Netflix (independiente del combo)</span>
            <span style="color: #FF6600; font-weight: bold;">$${calculoPrecios.precioNetflix.toLocaleString()} <span style="font-size: 0.8em;">(fijo)</span></span>
          </div>
        `;
      }
      
      // Mostrar información de ajuste si aplica (solo para plataformas del combo)
      if (calculoPrecios.ajusteAplicado) {
        const precioOriginalCombo = calculoPrecios.precioOriginal - calculoPrecios.precioNetflix;
        const ahorroCombo = precioOriginalCombo - calculoPrecios.precioPlataformasCombo;
        
        html += `
          <div class="carrito-item" style="border-top: 1px solid rgba(0, 200, 83, 0.3); padding-top: 10px; margin-top: 10px;">
            <span style="color: #00C853; font-weight: bold;">🎉 Ajuste aplicado por límite de combo</span>
            <span style="color: #00C853; font-weight: bold;">Ahorro en combo: $${ahorroCombo.toLocaleString()}</span>
          </div>
          <div class="carrito-item" style="background: rgba(0, 200, 83, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <span style="color: #00C853; font-weight: bold;">💰 Combo original: $${precioOriginalCombo.toLocaleString()}</span>
            <span style="color: #00C853; font-weight: bold;">→ Límite combo: $${calculoPrecios.limiteCombo.toLocaleString()}</span>
          </div>
        `;
      }
      
      carritoLista.innerHTML = html;
    }
    
    // Actualizar total
    totalPrecio.textContent = `$${calculoPrecios.total.toLocaleString()}`;
    
    // Habilitar/deshabilitar botón finalizar
    btnFinalizar.disabled = plataformasSeleccionadas.length === 0;
  }
  
  // Manejar botón finalizar
  btnFinalizar.addEventListener('click', () => {
    if (plataformasSeleccionadas.length > 0) {
      const comboInfo = JSON.parse(localStorage.getItem('comboSeleccionado') || '{}');
      const comboActual = comboInfo.tipo || 'basico';
      const calculoPrecios = calcularPrecioConLimite(plataformasSeleccionadas, comboActual);
      
      // Guardar selección en localStorage
      localStorage.setItem('plataformasSeleccionadas', JSON.stringify(plataformasSeleccionadas));
      localStorage.setItem('totalCarrito', calculoPrecios.total.toString());
      
      // Mostrar resumen y proceder al pago
      let resumen = '';
      
      // Mostrar plataformas del combo
      if (calculoPrecios.plataformasCombo.length > 0) {
        resumen += '📺 Plataformas del combo:\n';
        calculoPrecios.plataformasCombo.forEach(p => {
          const precioBase = preciosPlataformas[p.nombre] || p.precio;
          let precioFinal = precioBase;
          let esAjustado = false;
          
          if (calculoPrecios.ajusteAplicado) {
            precioFinal = Math.round(precioBase * calculoPrecios.factorAjuste);
            esAjustado = true;
          }
          
          resumen += `• ${p.nombre} ($${precioFinal.toLocaleString()}${esAjustado ? ' ajustado' : ''})\n`;
        });
      }
      
      // Mostrar Netflix por separado
      if (calculoPrecios.tieneNetflix) {
        resumen += '\n🍿 Netflix (independiente):\n';
        resumen += `• Netflix ($${calculoPrecios.precioNetflix.toLocaleString()} fijo)\n`;
      }
      
      if (calculoPrecios.ajusteAplicado) {
        const precioOriginalCombo = calculoPrecios.precioOriginal - calculoPrecios.precioNetflix;
        const ahorroCombo = precioOriginalCombo - calculoPrecios.precioPlataformasCombo;
        resumen += `\n🎉 Ajuste aplicado por límite de combo (${comboInfo.nombre})`;
        resumen += `\n💰 Ahorro en combo: $${ahorroCombo.toLocaleString()}`;
      }
      
      alert(`🛒 Resumen de tu compra:\n\n${resumen}\n\nTotal: $${calculoPrecios.total.toLocaleString()}\n\nSerás redirigido al pago.`);
      
      // Aquí podrías redirigir a una página de pago real
      // window.location.href = 'pago.html';
    }
  });
}

// Inicializar funcionalidad de carrito si estamos en esa página
if (window.location.pathname.includes('carrito.html')) {
  initSeleccionPlataformas();
}
