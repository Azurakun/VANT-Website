// main.js

import { updateContent, openModal, closeModal, initModalNav } from './ui.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI and animations
    initAnimations();
    initModalNav();

    // Language Switcher Logic
    const langBtn = document.getElementById('lang-btn');
    const langMenu = document.getElementById('lang-menu');
    const langLoader = document.getElementById('lang-loader');

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('hidden');
        langMenu.classList.toggle('opacity-0');
    });

    document.addEventListener('click', () => {
        if (!langMenu.classList.contains('hidden')) {
            langMenu.classList.add('hidden', 'opacity-0');
        }
    });

    langMenu.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const lang = e.target.getAttribute('data-lang-option');
            switchLanguageWithLoader(lang);
        }
    });

    function switchLanguageWithLoader(lang) {
        const currentLanguage = localStorage.getItem('language') || 'en';
        if (currentLanguage === lang) {
            langMenu.classList.add('hidden', 'opacity-0');
            return;
        }
        langLoader.classList.remove('opacity-0', 'pointer-events-none');
        langMenu.classList.add('hidden', 'opacity-0');

        setTimeout(() => {
            updateContent(lang);
            langLoader.classList.add('opacity-0', 'pointer-events-none');
        }, 500);
    }

    // Modal Event Listeners
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.dataset.projectId));
    });

    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
    document.getElementById('project-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('project-modal')) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !document.getElementById('project-modal').classList.contains('invisible')) {
            closeModal();
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Back to Top
    document.getElementById('back-to-top-btn').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Initial language setup
    const savedLang = localStorage.getItem('language') || 'en';
    updateContent(savedLang);
});