/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger)
  const sections = gsap.utils.toArray('.section')

  const scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.main',
      pin: true,
      scrub: 1,
      delay: 0.1,
      snap: 1 / (sections.length - 1),
      onRefresh: (self) => {
        dragRatio =
          (self.end - self.start) /
          ((sections.length - 1) * sections[0].offsetWidth)
      },
      // base vertical scrolling on how wide the container is so it feels more natural.
      end: '+=3500',
      onUpdate: (self) => {
        // Calcula la sección actual basándote en el progreso de desplazamiento
        const currentSection = Math.round(self.progress * (sections.length - 1))
        $('.nav').removeClass('active')
        $(`.nav:eq(${currentSection})`).addClass('active')
      },
      onComplete: () => console.log('Completo')
    }
  })

  section1()
  section2()
  section3()
  section4()

  function section1 () {
    const profesion = 'FULL-STACK-DEVELOPER '
    const profesionArr = profesion.split('')
    $('.logo').each(function () {
      const iconName = $(this).attr('name')
      $(this).attr('id', iconName)
    })

    // Hacemos que el nombre descienda
    gsap.to('#name', {
      duration: 1.3,
      x: 0,
      y: 100,
      onStart: function () {
        agregarPalabra()
      }
    })

    let indexAgregarPalabra = 0
    function agregarPalabra () {
      if (indexAgregarPalabra < profesionArr.length) {
        $('#section1 > h2').append(profesionArr[indexAgregarPalabra])
        indexAgregarPalabra++
        setTimeout(agregarPalabra, 80)
      } else {
        $('#section1 > h2').addClass('sinBefore')
      }
    }
  }
  function section2 () {
    $('.skill').css({ transform: 'translate(0px, 600px)' })
    gsap.to(['.skill'], {
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#section1',
        containerAnimation: scrollTween,
        start: 'top 1%',
        scrub: true
      }
    })
    gsap.to('.aboutMe', {
      y: 600,
      ease: 'none',
      scrollTrigger: {
        trigger: '#section2',
        containerAnimation: scrollTween,
        start: 'top 1%',
        scrub: true
      }
    })

    $('#descargarBtn').on('click', function () {
      const rutaPDF = '/images/CVJaimeBoukhrij.pdf'
      const enlaceTemporal = $('<a></a>').attr('href', rutaPDF).attr('download', 'nombre_archivo.pdf')
      $('.download').append(enlaceTemporal)
      enlaceTemporal[0].click()
      enlaceTemporal.remove()
    })
  }
  function section3 () {
    let count = 0
    const targets = $('.elem')
    gsap.set(targets, { xPercent: 100 })
    gsap.set(targets[0], { xPercent: 0 })
    $('.elem').each(function () {
      const that = $(this)
      that.index() !== 1 && that.css({ display: 'none' })
    })

    function slideOneNext () {
      gsap.fromTo(targets[count], { xPercent: 0, zIndex: 0 }, { delay: 0, duration: 1.5, xPercent: -120, display: 'none' })
      count = count < targets.length - 1 ? ++count : 0
      gsap.fromTo(targets[count], { xPercent: 100, zIndex: 10 }, { duration: 1.5, xPercent: 0, display: 'block' })
    }

    function slideOnePrev () {
      gsap.fromTo(targets[count], { xPercent: 0, zIndex: 0 }, { delay: 0, duration: 1.2, xPercent: 120, display: 'none' })
      count = count === 0 ? targets.length - 1 : --count
      gsap.fromTo(targets[count], { xPercent: -100, zIndex: 10 }, { duration: 1.2, xPercent: 0, display: 'block' }) // esta es la que viene
    }

    $('#next-btn').click(() => slideOneNext())
    $('#prev-btn').click(() => slideOnePrev())

    gsap.to(['.arrow'], {
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#section2',
        start: 'top 5%', // Cambiado a top 5%
        scrub: true
      },
      onComplete: function () { $('.arrow').css({ opacity: '1' }) }
    })
  }

  function section4 () {
    $('#miFormulario').submit(function (event) {
      event.preventDefault()
      const formData = $(this).serialize()
      $.ajax({
        url: 'https://formspree.io/f/mqkreqgn', // Reemplaza con tu dirección de correo electrónico
        method: 'POST',
        data: formData,
        dataType: 'json',
        success: function (response) {
          $('#miFormulario')[0].reset()
        },
        error: function (error) {
          console.error('Error al enviar el formulario:', error)
        }
      })
    })
    gsap.to(['.footer'], {
      x: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#section3',
        containerAnimation: scrollTween,
        start: 'top 1%',
        scrub: true
      }
    })
  }
})
