import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800">
      <div className="bg-[#700100] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Inscrivez-vous à notre newsletter</h3>
              <p className="text-sm text-white/90">Recevez nos dernières actualités et offres spéciales</p>
            </div>
            <div className="flex-1 max-w-md w-full">
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-white text-[#700100] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
          <div>
            <h3 className="font-semibold text-sm mb-4">CONTACTEZ-NOUS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://wa.me/+21629509840" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline flex items-center gap-2"
                >
                  <span>+216 29 509 840</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@fioriforyou.com" 
                  className="hover:underline flex items-center gap-2"
                >
                  <span>Envoyez-nous un email</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/+21629509840" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline flex items-center gap-2"
                >
                  <span>Chat en direct</span>
                </a>
              </li>
            </ul>
            <p className="mt-6 mb-3 text-sm">Suivez-nous</p>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/fioriforyou/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80"
              >
                <i className="fab fa-instagram text-[1.44rem] text-[#700100]"></i>
              </a>
              <a 
                href="https://www.facebook.com/FioriForYouMen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80"
              >
                <i className="fab fa-facebook text-[1.44rem] text-[#700100]"></i>
              </a>
              <a 
                href="https://www.youtube.com/@fioriforyou" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80"
              >
                <i className="fab fa-youtube text-[1.44rem] text-[#700100]"></i>
              </a>
              <a 
                href="https://www.tiktok.com/@fioriforyou" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80"
              >
                <i className="fab fa-tiktok text-[1.44rem] text-[#700100]"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">AIDE & INFORMATION</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/aide/livraison" className="hover:underline">Livraison</a>
              </li>
              <li>
                <a href="/aide/retours" className="hover:underline">Retours</a>
              </li>
              <li>
                <a href="/aide/guide-des-tailles" className="hover:underline">Guide des tailles</a>
              </li>
              <li>
                <a href="/aide/faq" className="hover:underline">FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">À PROPOS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/a-propos/qui-sommes-nous" className="hover:underline">Qui sommes-nous</a>
              </li>
              <li>
                <a href="/a-propos/nos-magasins" className="hover:underline">Nos magasins</a>
              </li>
              <li>
                <a href="/a-propos/recrutement" className="hover:underline">Recrutement</a>
              </li>
              <li>
                <a href="/a-propos/mentions-legales" className="hover:underline">Mentions légales</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">PAIEMENT SÉCURISÉ</h3>
            <div className="flex flex-wrap gap-2">
              <img src="/payment/visa.png" alt="Visa" className="h-8" />
              <img src="/payment/mastercard.png" alt="Mastercard" className="h-8" />
              <img src="/payment/d17.png" alt="D17" className="h-8" />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2024 Fiori. Tous droits réservés.</p>
            <p className="mt-2">
              <a href="/politique-de-confidentialite" className="hover:underline">Politique de confidentialité</a>
              {' '}&middot;{' '}
              <a href="/conditions-generales" className="hover:underline">Conditions générales</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;