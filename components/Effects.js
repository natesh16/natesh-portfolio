"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/**
 * Renders nothing. Adds every behaviour of the original portfolio on top of the
 * server-rendered markup: loader, smooth scroll, scroll-triggered animations,
 * magnetic buttons, card tilt, custom cursor, progress bar, active nav link and
 * the three.js particle background. Everything is cleaned up on unmount, so it
 * is safe under React Strict Mode.
 */
export default function Effects() {
  useEffect(() => {
    // Respect the OS accessibility preference by default. For visual testing,
    // append ?motion=full to the URL to explicitly enable the full cinematic effects.
    const motionSetting = new URLSearchParams(location.search).get("motion");
    const RM = motionSetting === "off";
    const FINE = matchMedia("(hover:hover) and (pointer:fine)").matches;
    const COARSE = matchMedia("(pointer:coarse)").matches;

    const ac = new AbortController();
    const { signal } = ac;
    const secs = $$("main section");
    const bar = $("#bar");
    const links = $$("#nv a[data-go]");
    const dots = $$("#dots a");
    const ld = $("#ld");
    const role = $("#role");
    const fullRole = role ? role.dataset.text : "";

    let lenis = null;
    let tick = null;
    let ctx = null;
    let timer = 0;
    let raf = 0;
    let disposed = false;
    let renderer = null;
    const disposables = [];
    const motionStatus = {
      gsapModuleLoaded: true,
      scrollTriggerRegistered: false,
      reducedMotion: RM,
      lenisEnabled: false,
      threeModuleLoaded: false,
      canvasFound: Boolean($("#gl")),
      webglAvailable: null,
      introStarted: false,
    };
    window.__portfolioMotionStatus = motionStatus;
    document.documentElement.classList.toggle("reduce-motion", RM);

    const hideLoader = () => {
      if (ld) ld.style.display = "none";
    };

    if (FINE) document.body.classList.add("fine");

    // ---- smooth in-page navigation ----
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest("a[data-go]");
      if (!a) return;
      const target = $(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: 0 });
      else target.scrollIntoView({ behavior: RM ? "auto" : "smooth" });
    };
    document.addEventListener("click", onClick, { signal });

    // ---- scroll progress and active section ----
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      let cur = secs[0];
      secs.forEach((s) => {
        if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = s;
      });
      links.forEach((a) =>
        a.classList.toggle("on", a.getAttribute("href") === "#" + cur.id),
      );
      dots.forEach((a, i) => a.classList.toggle("on", secs[i] === cur));
    };
    addEventListener("scroll", update, { passive: true, signal });
    update();

    const baseCleanup = () => {
      ac.abort();
      document.body.classList.remove("fine");
      document.documentElement.classList.remove("reduce-motion");
    };

    if (RM) {
      hideLoader();
      return baseCleanup;
    }

    gsap.registerPlugin(ScrollTrigger);
    motionStatus.scrollTriggerRegistered = true;

    // ---- one smooth-scroll engine driven by the GSAP ticker ----
    if (!COARSE) {
      lenis = new Lenis({ lerp: 0.1 });
      motionStatus.lenisEnabled = true;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const st = (trigger, o = {}) => ({
      scrollTrigger: {
        trigger,
        start: "top 70%",
        toggleActions: "play none none reverse",
        ...o,
      },
    });

    // ---- scroll and entrance animations (run once the loader lifts) ----
    const build = () => {
      const ty = { i: 0 };
      gsap.from("#home .loc,#home .intro,#home .acts,.fl,.term", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        delay: 0.9,
        ease: "power3.out",
      });
      gsap.from(".ch i", {
        yPercent: 115,
        rotateX: -80,
        stagger: 0.06,
        duration: 1.1,
        ease: "expo.out",
      });
      gsap.from(".ring,.pt", {
        scale: 0.8,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        delay: 0.3,
      });
      if (role) {
        role.textContent = "";
        gsap.to(ty, {
          i: fullRole.length,
          duration: 1.8,
          delay: 0.9,
          ease: "none",
          onUpdate: () => {
            role.textContent = fullRole.slice(0, Math.round(ty.i));
          },
        });
      }

      gsap.from("#about h2", {
        ...st("#about"),
        xPercent: -8,
        opacity: 0,
        duration: 0.9,
      });
      gsap.from("#ab .w", {
        ...st("#about"),
        y: 30,
        opacity: 0,
        stagger: 0.025,
        duration: 0.7,
      });
      gsap.from("#jr li", {
        ...st("#jr"),
        x: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
      });
      gsap.from("#jr .ln", {
        scrollTrigger: {
          trigger: "#jr",
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
        scaleY: 0,
        ease: "none",
      });

      gsap.from("#xp .ln", {
        scrollTrigger: {
          trigger: "#xp",
          start: "top 75%",
          end: "bottom 60%",
          scrub: true,
        },
        scaleY: 0,
        ease: "none",
      });
      gsap.from("#xp .card", {
        ...st("#xp"),
        x: -60,
        opacity: 0,
        duration: 0.9,
      });

      gsap.from("#pj .card", {
        ...st("#pj"),
        rotateY: -25,
        z: -200,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Technical skills: animate each category's indicator and technology chips
      // as it enters view. Guard optional counters for older portfolio layouts.
      $$("#sk .skill-card").forEach((card, index) => {
        const fill = $(".skill-rule span", card);
        const chips = $$(".tech", card);
        ScrollTrigger.create({
          trigger: card,
          start: "top 82%",
          once: true,
          onEnter: () => {
            if (fill)
              gsap.fromTo(
                fill,
                { scaleX: 0, transformOrigin: "left center" },
                {
                  scaleX: 1,
                  duration: 1.15,
                  ease: "power3.out",
                  delay: index * 0.035,
                },
              );
            if (chips.length)
              gsap.from(chips, {
                y: 14,
                opacity: 0,
                scale: 0.94,
                stagger: 0.035,
                duration: 0.45,
                ease: "power2.out",
                delay: 0.12,
              });
          },
        });
      });
      gsap.from("#sk .skill-card", {
        ...st("#sk"),
        y: 70,
        rotateX: 8,
        opacity: 0,
        stagger: 0.13,
        duration: 0.95,
        ease: "power3.out",
      });

      gsap.from("#ed .ln", {
        scrollTrigger: {
          trigger: "#ed",
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
        scaleY: 0,
        ease: "none",
      });
      gsap.from("#ed .card", {
        ...st("#ed"),
        clipPath: "inset(0 100% 0 0)",
        stagger: 0.2,
        duration: 1,
        ease: "power3.inOut",
      });
      $$("#ed .cgpa[data-n]").forEach((el) => {
        const o = { v: 0 };
        const end = +el.dataset.n;
        const suffix = el.dataset.suffix || "";
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () =>
            gsap.to(o, {
              v: end,
              duration: 1.6,
              onUpdate: () => {
                el.textContent = Math.round(o.v) + suffix;
              },
            }),
        });
      });

      gsap.from("#tr .card", {
        ...st("#tr"),
        rotationY: 90,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "back.out(1.4)",
      });
      gsap.from("#resume .in>*", {
        ...st("#resume"),
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
      });
      gsap.from("#contact .in>div:first-child>*", {
        ...st("#contact"),
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
      });
      gsap.from("#contact form", {
        ...st("#contact"),
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from("#so a", {
        ...st("#so"),
        scale: 0,
        stagger: 0.08,
        ease: "back.out(2)",
      });

      // Distinct cinematic choreography for each existing portfolio section.
      gsap.from("#experience h2", {
        ...st("#experience"),
        x: -45,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
      gsap.from("#xp .jh", {
        ...st("#xp"),
        y: 24,
        opacity: 0,
        duration: 0.65,
        delay: 0.12,
      });
      gsap.from("#xp details", {
        ...st("#xp"),
        x: 28,
        opacity: 0,
        stagger: 0.12,
        duration: 0.65,
      });
      gsap.from("#projects h2,#projects .sub", {
        ...st("#projects"),
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
      });
      gsap.from("#pj .th", {
        ...st("#pj"),
        clipPath: "inset(0 100% 0 0)",
        scale: 1.12,
        duration: 1.1,
        ease: "power3.inOut",
      });
      gsap.from("#pj .ft li", {
        ...st("#pj"),
        x: 18,
        opacity: 0,
        stagger: 0.06,
        duration: 0.45,
      });
      gsap.from("#education h2", {
        ...st("#education"),
        y: 32,
        opacity: 0,
        duration: 0.8,
      });
      gsap.from("#ed .row", {
        ...st("#ed"),
        x: 55,
        opacity: 0,
        stagger: 0.18,
        duration: 0.85,
        ease: "power3.out",
      });
      gsap.from("#training h2,#training .sub", {
        ...st("#training"),
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
      });
      gsap.from("#tr .cert", {
        ...st("#tr"),
        rotationY: 22,
        rotationX: 7,
        transformPerspective: 1000,
        opacity: 0,
        stagger: 0.16,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from("#profiles h2,#profiles .sub", {
        ...st("#profiles"),
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
      });
      gsap.from("#coding-profiles .profile-card", {
        ...st("#coding-profiles"),
        y: 55,
        rotateY: 18,
        opacity: 0,
        stagger: 0.18,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from("#contact .cl a", {
        ...st("#contact"),
        x: -22,
        opacity: 0,
        stagger: 0.09,
        duration: 0.55,
      });
      gsap.from("#contact .f", {
        ...st("#contact"),
        y: 18,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.15,
      });

      // Ambient motion stays independent from the scroll engine.
      gsap.to(".o1", {
        x: "5vw",
        y: "-3vh",
        scale: 1.08,
        duration: 13,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".o2", {
        x: "-4vw",
        y: "4vh",
        scale: 1.12,
        duration: 17,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    };

    ctx = gsap.context((self) => {
      // ---- custom cursor, magnetic buttons, card tilt (mouse devices only) ----
      if (FINE) {
        const c = $("#cur");
        const g = $("#curg");
        const xc = gsap.quickTo(c, "x", { duration: 0.1 });
        const yc = gsap.quickTo(c, "y", { duration: 0.1 });
        const xg = gsap.quickTo(g, "x", { duration: 0.6 });
        const yg = gsap.quickTo(g, "y", { duration: 0.6 });
        addEventListener(
          "pointermove",
          (e) => {
            xc(e.clientX);
            yc(e.clientY);
            xg(e.clientX);
            yg(e.clientY);
          },
          { signal },
        );
        $$("a,button,[data-tilt],input,textarea").forEach((el) => {
          el.addEventListener(
            "pointerenter",
            () => document.body.classList.add("cursor-hot"),
            { signal },
          );
          el.addEventListener(
            "pointerleave",
            () => document.body.classList.remove("cursor-hot"),
            { signal },
          );
        });

        $$("[data-mag]").forEach((b) => {
          b.addEventListener(
            "pointermove",
            (e) => {
              const r = b.getBoundingClientRect();
              gsap.to(b, {
                x: (e.clientX - r.left - r.width / 2) * 0.25,
                y: (e.clientY - r.top - r.height / 2) * 0.35,
                duration: 0.3,
              });
            },
            { signal },
          );
          b.addEventListener(
            "pointerleave",
            () =>
              gsap.to(b, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1,.4)",
              }),
            { signal },
          );
        });

        $$("[data-tilt]").forEach((el) => {
          el.addEventListener(
            "pointermove",
            (e) => {
              const r = el.getBoundingClientRect();
              const x = (e.clientX - r.left) / r.width - 0.5;
              const y = (e.clientY - r.top) / r.height - 0.5;
              gsap.to(el, {
                rotateY: x * 10,
                rotateX: -y * 10,
                transformPerspective: 900,
                duration: 0.4,
                overwrite: "auto",
              });
              el.style.setProperty("--mx", (x + 0.5) * 100 + "%");
              el.style.setProperty("--my", (y + 0.5) * 100 + "%");
            },
            { signal },
          );
          el.addEventListener(
            "pointerleave",
            () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6 }),
            { signal },
          );
        });

        gsap.to(".pt", {
          scrollTrigger: {
            trigger: "#home",
            scrub: true,
            start: "top top",
            end: "bottom top",
          },
          y: 80,
          ease: "none",
        });
        $("#art").addEventListener(
          "pointermove",
          (e) => {
            const r = e.currentTarget.getBoundingClientRect();
            gsap.to(".pt", {
              x: ((e.clientX - r.left) / r.width - 0.5) * 16,
              duration: 0.6,
            });
          },
          { signal },
        );
      }

      // Register delayed reveal animations with this context so they are
      // reverted correctly on unmount / React Strict Mode remounts.
      const buildInContext = self.add(build);

      // ---- loading screen, then reveal ----
      let started = false;
      const go = () => {
        if (started) return;
        started = true;
        motionStatus.introStarted = true;
        const lc = $("#lc");
        const o = { v: 0 };
        // Run the timeline immediately. Context.add() returns a wrapped
        // function; it does not execute the callback unless that wrapper is called.
        gsap
          .timeline()
          .to(o, {
            v: 100,
            duration: 1.1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (lc) lc.textContent = Math.round(o.v);
            },
          })
          .to("#lb", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
          .to(
            "#ld",
            {
              yPercent: -100,
              duration: 0.8,
              ease: "expo.inOut",
              onStart: buildInContext,
              onComplete: hideLoader,
            },
            "+=.1",
          );
      };
      if (document.readyState === "complete") go();
      else addEventListener("load", go, { signal });
      timer = setTimeout(() => {
        go();
        setTimeout(hideLoader, 4500);
      }, 3500);
    });

    // ---- three.js particle background (loaded lazily) ----
    import("three")
      .then((THREE) => {
        if (disposed) return;
        motionStatus.threeModuleLoaded = true;
        const canvas = $("#gl");
        if (!canvas) {
          motionStatus.webglAvailable = false;
          document.body.classList.add("nogl");
          return;
        }
        try {
          renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
          });
          motionStatus.webglAvailable = true;
        } catch (err) {
          motionStatus.webglAvailable = false;
          motionStatus.webglError = String(
            err && err.message ? err.message : err,
          );
          document.body.classList.add("nogl");
          return;
        }
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        const scene = new THREE.Scene();
        const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
        cam.position.z = 9;

        const N = innerWidth < 700 ? 350 : 900;
        const pos = new Float32Array(N * 3);
        for (let i = 0; i < N * 3; i++)
          pos[i] = (Math.random() - 0.5) * (i % 3 === 2 ? 10 : 24);
        const pg = new THREE.BufferGeometry();
        pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const pm = new THREE.PointsMaterial({
          color: 0x6fb5ff,
          size: 0.045,
          transparent: true,
          opacity: 0.7,
        });
        const pts = new THREE.Points(pg, pm);
        scene.add(pts);
        disposables.push(pg, pm);

        const shapes = [
          [new THREE.IcosahedronGeometry(1.3, 0), 0x3fe0ff, 3.6, 1.2, -1],
          [
            new THREE.TorusKnotGeometry(0.7, 0.22, 80, 10),
            0x8b6bff,
            -4.2,
            -1.5,
            -2,
          ],
          [new THREE.OctahedronGeometry(0.8), 0x2f7bff, 4.6, -2.6, -3],
        ].map(([geo, color, x, y, z]) => {
          const m = new THREE.Mesh(
            geo,
            new THREE.MeshBasicMaterial({
              color,
              wireframe: true,
              transparent: true,
              opacity: 0.5,
            }),
          );
          m.position.set(x, y, z);
          scene.add(m);
          disposables.push(geo, m.material);
          return m;
        });

        const resize = () => {
          renderer.setSize(innerWidth, innerHeight, false);
          cam.aspect = innerWidth / innerHeight;
          cam.updateProjectionMatrix();
        };
        resize();
        addEventListener("resize", resize, { signal });

        const mp = { x: 0, y: 0 };
        addEventListener(
          "pointermove",
          (e) => {
            mp.x = e.clientX / innerWidth - 0.5;
            mp.y = e.clientY / innerHeight - 0.5;
          },
          { passive: true, signal },
        );

        const loop = (t) => {
          if (document.hidden || disposed) return;
          raf = requestAnimationFrame(loop);
          t *= 0.001;
          pts.rotation.y = t * 0.02 + mp.x * 0.3;
          pts.rotation.x = mp.y * 0.2;
          shapes.forEach((m, i) => {
            m.rotation.x = t * 0.2 * (i + 1);
            m.rotation.y = t * 0.3;
          });
          cam.position.y = -scrollY * 0.0016;
          cam.position.x += (mp.x * 1.2 - cam.position.x) * 0.04;
          renderer.render(scene, cam);
        };
        const onVisibility = () => {
          cancelAnimationFrame(raf);
          if (!document.hidden && !disposed) raf = requestAnimationFrame(loop);
        };
        document.addEventListener("visibilitychange", onVisibility, { signal });
        raf = requestAnimationFrame(loop);
      })
      .catch((err) => {
        motionStatus.threeModuleError = String(
          err && err.message ? err.message : err,
        );
        document.body.classList.add("nogl");
      });

    return () => {
      disposed = true;
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      baseCleanup();
      if (tick) gsap.ticker.remove(tick);
      if (lenis) lenis.destroy();
      gsap.ticker.lagSmoothing(500, 33);
      if (ctx) ctx.revert();
      disposables.forEach((d) => d.dispose && d.dispose());
      if (renderer) renderer.dispose();
      if (role && fullRole) role.textContent = fullRole;
      if (ld) ld.style.display = "";
    };
  }, []);

  return null;
}
